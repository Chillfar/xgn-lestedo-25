import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  writeBatch,
  QueryDocumentSnapshot,
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
        setDoc(roundRef, { value: 0 });
        return;
      }
      setRound(snap.data().value ?? 0);
    });

    return unsubscribe;
  }, []);

  const assignPoints = async (userId: number, gameName: string) => {
    const userRef = doc(db, "users", String(userId));
    const snap = await getDoc(userRef);
    if (!snap.exists()) return;

    const userData = snap.data() as User;
    const newScore = (userData.scores[gameName] || 0) + 10;
    const newTotal =
      Object.values(userData.scores).reduce((acc, s) => acc + s, 0) + 10;
    const updatedHistory = [...userData.history];
    updatedHistory[round] = newTotal;

    await setDoc(
      userRef,
      {
        scores: { ...userData.scores, [gameName]: newScore },
        history: updatedHistory,
      },
      { merge: true }
    );
  };

  const nextRound = async () => {
    const newRound = round + 1;
    const batch = writeBatch(db);

    // Update round counter
    batch.set(doc(db, "state", "round"), { value: newRound });

    // Snapshot current totals into each user's history
    for (const user of users) {
      const total = Object.values(user.scores).reduce((acc, s) => acc + s, 0);
      const updatedHistory = [...user.history, total];
      batch.update(doc(db, "users", String(user.id)), {
        history: updatedHistory,
      });
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
    batch.set(doc(db, "state", "round"), { value: 0 });

    // Reset games — delete all current, re-add initial
    // (deletions can't be batched with queries, so we delete existing users' games inline)
    await batch.commit();

    // Now reset games collection separately
    const gamesBatch = writeBatch(db);
    for (const game of initialGames) {
      gamesBatch.set(doc(db, "games", game.name), game);
    }
    await gamesBatch.commit();
  };

  return { users, round, loading, assignPoints, nextRound, resetData };
}
