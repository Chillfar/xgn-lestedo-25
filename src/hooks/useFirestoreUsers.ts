import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  writeBatch,
  QueryDocumentSnapshot,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";
import { User, initialUsers, initialGames } from "../constants/initialData";

/**
 * Real-time hook for the `users` collection and the `state/round` document.
 * Provides functions to assign points, advance rounds, and reset all data.
 */
export default function useFirestoreUsers() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [round, setRound] = useState(0);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [playedGames, setPlayedGames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to users collection
  useEffect(() => {
    const colRef = collection(db, "users");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      if (snapshot.empty) {
        // Seed initial data
        initialUsers.forEach((user) => {
          setDoc(doc(colRef, String(user.id)), user);
        });
        return;
      }

      const usersData = snapshot.docs
        .map((d: QueryDocumentSnapshot) => d.data() as User)
        .sort((a, b) => {
          const totalA = Object.values(a.scores).reduce((acc, s) => acc + s, 0);
          const totalB = Object.values(b.scores).reduce((acc, s) => acc + s, 0);
          return totalB - totalA;
        });

      setUsers(usersData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Listen to round state
  useEffect(() => {
    const roundRef = doc(db, "state", "round");

    const unsubscribe = onSnapshot(roundRef, (snap) => {
      if (!snap.exists()) {
        setDoc(roundRef, { value: 0, activeGame: null, playedGames: [] });
        return;
      }
      const data = snap.data();
      setRound(data.value ?? 0);
      setActiveGame(data.activeGame ?? null);
      setPlayedGames(data.playedGames ?? []);
    });

    return unsubscribe;
  }, []);

  const assignPoints = async (userId: number, gameName: string) => {
    // Round Lock-in logic
    if (playedGames.includes(gameName)) {
      throw new Error(`El juego ${gameName} ya se ha jugado y no puede recibir más puntos.`);
    }
    if (activeGame && activeGame !== gameName) {
      throw new Error(`Ya hay un juego activo en esta ronda: ${activeGame}. No puedes dar puntos a ${gameName} hasta avanzar de ronda.`);
    }

    const batch = writeBatch(db);

    // If no active game, this game becomes the active game for the round
    if (!activeGame) {
      batch.update(doc(db, "state", "round"), { activeGame: gameName });
    }

    const userRef = doc(db, "users", String(userId));
    const snap = await getDoc(userRef);
    if (!snap.exists()) return;

    const userData = snap.data() as User;
    const newScore = (userData.scores[gameName] || 0) + 10;
    const newTotal =
      Object.values(userData.scores).reduce((acc, s) => acc + s, 0) + 10;
    const updatedHistory = [...userData.history];
    updatedHistory[round] = newTotal;

    batch.set(
      userRef,
      {
        scores: { ...userData.scores, [gameName]: newScore },
        history: updatedHistory,
      },
      { merge: true }
    );

    await batch.commit();
  };

  const nextRound = async (winnersData?: { winnerIds: number[], rewards: Record<number, number> }) => {
    const newRound = round + 1;
    const batch = writeBatch(db);

    // Update round counter, add active game to played games, clear active game
    const newPlayedGames = activeGame ? [...playedGames, activeGame] : playedGames;
    batch.set(doc(db, "state", "round"), { 
      value: newRound,
      activeGame: null,
      playedGames: newPlayedGames
    });

    // Snapshot current totals into each user's history
    for (const user of users) {
      const total = Object.values(user.scores).reduce((acc, s) => acc + s, 0);
      const updatedHistory = [...user.history, total];
      batch.update(doc(db, "users", String(user.id)), {
        history: updatedHistory,
      });
    }

    // Assign prediction points if we resolved a game
    if (winnersData && Object.keys(winnersData.rewards).length > 0) {
      for (const [uid, pts] of Object.entries(winnersData.rewards)) {
        const uRef = doc(db, "users", uid);
        batch.update(uRef, { predictionPoints: increment(pts) });
      }
    }

    await batch.commit();
  };

  const resetData = async () => {
    const batch = writeBatch(db);

    // Reset users
    for (const user of initialUsers) {
      batch.set(doc(db, "users", String(user.id)), user);
    }

    // Reset round
    batch.set(doc(db, "state", "round"), { 
      value: 0,
      activeGame: null,
      playedGames: []
    });

    // Reset games — delete all current, re-add initial
    // (deletions can't be batched with queries, so we delete existing users' games inline)
    await batch.commit();

    const gamesBatch = writeBatch(db);
    for (const game of initialGames) {
      gamesBatch.set(doc(db, "games", game.name), {
        ...game,
        votes: {},
        resolved: false,
        winnerId: null,
      });
    }
    await gamesBatch.commit();
  };

  /**
   * Award prediction points to multiple users at once.
   * rewards: { [userId]: pointsToAdd }
   */
  const addPredictionPoints = async (rewards: Record<number, number>) => {
    const batch = writeBatch(db);
    for (const [userId, points] of Object.entries(rewards)) {
      const userRef = doc(db, "users", userId);
      batch.update(userRef, { predictionPoints: increment(points) });
    }
    await batch.commit();
  };

  return { users, round, activeGame, playedGames, loading, assignPoints, nextRound, resetData, addPredictionPoints };
}
