import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export interface GamePredictions {
  votes: Record<string, number>;
  resolved: boolean;
  winnerIds: number[];
}

export function getSessionPlayerId(): number | null {
  const stored = sessionStorage.getItem("xgn_player_id");
  if (stored) return parseInt(stored, 10);
  return null;
}

export function setSessionPlayerId(playerId: number) {
  sessionStorage.setItem("xgn_player_id", String(playerId));
}

export function clearSessionPlayerId() {
  sessionStorage.removeItem("xgn_player_id");
}

export default function useFirestorePredictions(gameName: string | null) {
  const [predictions, setPredictions] = useState<GamePredictions | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!gameName) {
      setPredictions(null);
      setLoading(false);
      return;
    }

    const predRef = doc(db, "games", gameName);
    const unsubscribe = onSnapshot(predRef, (snap) => {
      if (!snap.exists()) {
        setPredictions({ votes: {}, resolved: false, winnerIds: [] });
      } else {
        const data = snap.data();
        setPredictions({
          votes: data.votes || {},
          resolved: data.resolved || false,
          winnerIds: data.winnerIds || [],
        });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [gameName]);

  const submitPrediction = async (predictorPlayerId: number, predictedWinnerId: number) => {
    if (!gameName) return;
    const predRef = doc(db, "games", gameName);
    const snap = await getDoc(predRef);
    if (!snap.exists()) return;

    const data = snap.data();
    if (data.resolved) return;

    await updateDoc(predRef, {
      votes: { ...(data.votes || {}), [String(predictorPlayerId)]: predictedWinnerId },
    });
  };

  const resolvePredictions = async (winnerIds: number[]): Promise<Record<number, number>> => {
    if (!gameName) return {};
    const predRef = doc(db, "games", gameName);
    const snap = await getDoc(predRef);

    if (!snap.exists()) return {};
    const data = snap.data();
    if (data.resolved) return {};

    const rewards: Record<number, number> = {};
    for (const [predictorId, predictedId] of Object.entries(data.votes || {})) {
      if (winnerIds.includes(predictedId)) {
        rewards[parseInt(predictorId, 10)] = 5;
      }
    }

    await updateDoc(predRef, { resolved: true, winnerIds });

    return rewards;
  };

  return { predictions, loading, submitPrediction, resolvePredictions };
}

export async function resolvePredictions(gameName: string, winnerIds: number[]): Promise<Record<number, number>> {
  const predRef = doc(db, "games", gameName);
  const snap = await getDoc(predRef);

  if (!snap.exists()) return {};
  const data = snap.data();
  if (data.resolved) return {};

  const rewards: Record<number, number> = {};
  for (const [predictorId, predictedId] of Object.entries(data.votes || {})) {
    if (winnerIds.includes(predictedId)) {
      rewards[parseInt(predictorId, 10)] = 5;
    }
  }

  await updateDoc(predRef, { resolved: true, winnerIds });

  return rewards;
}
