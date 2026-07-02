import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  writeBatch,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { Game, User, initialUsers } from "../constants/initialData";

export interface Archive {
  id: string;
  label: string;
  archivedAt: string; // ISO UTC string
  round: number;
}

export interface ArchiveSnapshot {
  users: User[];
  games: Game[];
  round: number;
}

/**
 * Real-time hook for the `archives` collection.
 * Each archive stores a snapshot of users, games, and the round counter
 * as sub-collections / fields under `archives/{archiveId}`.
 */
export default function useFirestoreArchives() {
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to archive metadata
  useEffect(() => {
    const colRef = collection(db, "archives");

    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const data = snapshot.docs
        .map((d: QueryDocumentSnapshot) => ({ id: d.id, ...d.data() } as Archive))
        .sort((a, b) => new Date(b.archivedAt).getTime() - new Date(a.archivedAt).getTime());

      setArchives(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /**
   * Create a new archive by snapshotting the current users, games, and round.
   */
  const createArchive = async (
    users: User[],
    games: Game[],
    round: number,
    label: string
  ) => {
    const archiveId = new Date().toISOString(); // UTC
    const archiveRef = doc(db, "archives", archiveId);

    // Save metadata
    await setDoc(archiveRef, {
      id: archiveId,
      label,
      archivedAt: archiveId,
      round,
    });

    // Save users sub-collection
    const batch1 = writeBatch(db);
    for (const user of users) {
      batch1.set(doc(db, "archives", archiveId, "users", String(user.id)), user);
    }
    await batch1.commit();

    // Save games sub-collection
    const batch2 = writeBatch(db);
    for (const game of games) {
      batch2.set(doc(db, "archives", archiveId, "games", game.name), game);
    }
    await batch2.commit();
  };

  /**
   * Load an archive's full snapshot (users + games + round).
   */
  const loadArchive = async (archiveId: string): Promise<ArchiveSnapshot | null> => {
    const archiveRef = doc(db, "archives", archiveId);
    const { getDoc } = await import("firebase/firestore");
    const archiveSnap = await getDoc(archiveRef);

    if (!archiveSnap.exists()) return null;

    const archiveData = archiveSnap.data() as Archive;

    const usersSnap = await getDocs(collection(db, "archives", archiveId, "users"));
    const users = usersSnap.docs
      .map((d) => {
        const u = d.data() as User;
        const initial = initialUsers.find(init => init.id === u.id);
        if (initial) {
          u.cover = initial.cover;
          u.rol = initial.rol;
          u.description = initial.description;
          u.name = initial.name;
        }
        return u;
      })
      .sort((a, b) => {
        const totalA = Object.values(a.scores).reduce((acc, s) => acc + s, 0);
        const totalB = Object.values(b.scores).reduce((acc, s) => acc + s, 0);
        return totalB - totalA;
      });

    const gamesSnap = await getDocs(collection(db, "archives", archiveId, "games"));
    const games = gamesSnap.docs.map((d) => d.data() as Game);

    return { users, games, round: archiveData.round };
  };

  /**
   * Delete an archive and all its sub-collection documents.
   */
  const deleteArchive = async (archiveId: string) => {
    // Delete users sub-collection
    const usersSnap = await getDocs(collection(db, "archives", archiveId, "users"));
    const batch1 = writeBatch(db);
    usersSnap.docs.forEach((d) => batch1.delete(d.ref));
    await batch1.commit();

    // Delete games sub-collection
    const gamesSnap = await getDocs(collection(db, "archives", archiveId, "games"));
    const batch2 = writeBatch(db);
    gamesSnap.docs.forEach((d) => batch2.delete(d.ref));
    await batch2.commit();

    // Delete archive document itself
    await deleteDoc(doc(db, "archives", archiveId));
  };

  return { archives, loading, createArchive, loadArchive, deleteArchive };
}
