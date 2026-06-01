import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { Game, initialGames } from "../constants/initialData";

/**
 * Real-time hook for the `games` collection in Firestore.
 * Falls back to initialGames and seeds Firestore if the collection is empty.
 */
export default function useFirestoreGames() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "games");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      if (snapshot.empty) {
        // Seed initial data on first run
        initialGames.forEach((game) => {
          setDoc(doc(colRef, game.name), game);
        });
        return; // onSnapshot will fire again after seeding
      }

      const gamesData = snapshot.docs.map(
        (d: QueryDocumentSnapshot) => d.data() as Game
      );
      setGames(gamesData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addGame = async (game: Game) => {
    await setDoc(doc(db, "games", game.name), game);
  };

  const removeGame = async (game: Game) => {
    await deleteDoc(doc(db, "games", game.name));
  };

  return { games, loading, addGame, removeGame };
}
