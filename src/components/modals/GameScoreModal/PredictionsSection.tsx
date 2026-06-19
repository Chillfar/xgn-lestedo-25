import { useState } from "react";
import { Typography, Box, Tooltip } from "@mui/material";
import { User, userColors } from "../../../constants/initialData";
import { GamePredictions } from "../../../hooks/useFirestorePredictions";

interface PredictionsSectionProps {
  users: User[];
  gameName: string;
  predictions: GamePredictions | null;
  isAuthenticated: boolean;
  /** The player ID that matches the currently logged-in Firebase user. Null if the user's email is not mapped to a player. */
  authenticatedPlayerId: number | null;
  onSubmitPrediction: (predictorId: number, predictedWinnerId: number) => void;
}

export default function PredictionsSection({
  users,
  gameName,
  predictions,
  isAuthenticated,
  authenticatedPlayerId,
  onSubmitPrediction,
}: PredictionsSectionProps) {
  // Local flag: set immediately on vote so bars stay shown even before Firestore snapshot returns
  const [localVotedId, setLocalVotedId] = useState<number | null>(null);

  const firestoreVote =
    authenticatedPlayerId != null && predictions
      ? predictions.votes[String(authenticatedPlayerId)] ?? null
      : null;

  const hasPredicted = firestoreVote !== null || localVotedId !== null;
  const myVote = firestoreVote ?? localVotedId;
  const isResolved = predictions?.resolved ?? false;

  // Calculate win probabilities per game (based on user.scores[gameName])
  const gameScores = users.map(u => ({ user: u, score: u.scores[gameName] || 0 }));
  const totalGameScore = gameScores.reduce((a, b) => a + b.score, 0);

  const probabilities = gameScores.map(({ user, score }) => ({
    user,
    probability: totalGameScore > 0
      ? Math.round((score / totalGameScore) * 100)
      : Math.round(100 / users.length),
  }));

  // Vote counts per player (from Firestore)
  const voteCounts = users.reduce((acc, user) => {
    acc[user.id] = Object.values(predictions?.votes || {}).filter(v => v === user.id).length;
    return acc;
  }, {} as Record<number, number>);

  const handleVote = (targetUserId: number) => {
    if (!authenticatedPlayerId) return;
    setLocalVotedId(targetUserId);
    onSubmitPrediction(authenticatedPlayerId, targetUserId);
  };

  const meUser = users.find(u => u.id === authenticatedPlayerId);

  // Divider
  const Divider = (
    <div style={{
      width: "100%",
      height: "1px",
      background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
      marginBottom: "16px",
    }} />
  );

  const cannotVote = !isAuthenticated || authenticatedPlayerId === null;

  const getWarningMessage = () => {
    if (!isAuthenticated) return "🎯 Predicciones — inicia sesión para participar";
    if (authenticatedPlayerId === null) return "🎯 Tu cuenta no está vinculada a ningún jugador";
    return null;
  };

  const warningMessage = getWarningMessage();

  return (
    <Box sx={{ mt: 3 }}>
      {Divider}

      {warningMessage && (
        <Typography variant="body2" sx={{
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
          fontSize: "0.75rem",
          letterSpacing: "0.06em",
          mb: 2,
        }}>
          {warningMessage}
        </Typography>
      )}

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Typography variant="body2" sx={{
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.08em",
          fontSize: "0.7rem",
          textTransform: "uppercase",
        }}>
          🎯 ¿Quién ganará {gameName}?
        </Typography>
        {meUser && (
          <Tooltip title="Apostando como este jugador">
            <Typography variant="body2" sx={{
              color: userColors[meUser.name as keyof typeof userColors] || "#fff",
              fontSize: "0.7rem",
              fontWeight: 700,
              opacity: 0.8,
            }}>
              {meUser.name}
            </Typography>
          </Tooltip>
        )}
      </Box>

      {/* ── Prediction picker (not yet voted) ── */}
      {!cannotVote && !hasPredicted && !isResolved ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
          {/* Reward hint */}
          <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,
            mb: 0.5,
            padding: "6px 12px",
            borderRadius: "6px",
            background: "rgba(79, 195, 247, 0.08)",
            border: "1px solid rgba(79, 195, 247, 0.2)",
          }}>
            <Typography variant="body2" sx={{ fontSize: "0.72rem", color: "#4fc3f7" }}>
              🎯 Aciertas → <strong>+5 pts</strong> en el ranking
            </Typography>
          </Box>
          {users.map(user => {
            const color = userColors[user.name as keyof typeof userColors] || "#fff";
            const isSelf = user.id === authenticatedPlayerId;
            return (
              <button
                key={user.id}
                onClick={() => handleVote(user.id)}
                style={{
                  background: isSelf ? color + "11" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${color}${isSelf ? "66" : "44"}`,
                  borderRadius: "8px",
                  padding: "10px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#fff",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = color + "22";
                  el.style.borderColor = color + "99";
                  el.style.transform = "translateX(4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = isSelf ? color + "11" : "rgba(255,255,255,0.04)";
                  el.style.borderColor = `${color}${isSelf ? "66" : "44"}`;
                  el.style.transform = "translateX(0)";
                }}
              >
                <div style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: color,
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{user.name}</span>
                {isSelf && (
                  <span style={{ fontSize: "0.65rem", color: color, marginLeft: "auto", opacity: 0.7 }}>tú</span>
                )}
              </button>
            );
          })}
        </Box>
      ) : (
        /* ── Probability bars (voted or resolved) ── */
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {probabilities.map(({ user, probability }) => {
            const color = userColors[user.name as keyof typeof userColors] || "#fff";
            const isMyVote = myVote === user.id;
            const isWinner = isResolved && predictions?.winnerIds?.includes(user.id);
            const predictedCorrectly = isResolved && isMyVote && isWinner;
            const predictedWrong = isResolved && isMyVote && !isWinner;
            const voteCount = voteCounts[user.id] || 0;

            return (
              <Box key={user.id}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <div style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: color,
                    }} />
                    <Typography variant="body2" sx={{
                      color: isMyVote ? "#fff" : "rgba(255,255,255,0.7)",
                      fontWeight: isMyVote ? 700 : 400,
                      fontSize: "0.82rem",
                    }}>
                      {user.name}
                      {isMyVote && !isResolved && (
                        <span style={{ fontSize: "0.7rem", color: color, marginLeft: "6px" }}>← tu apuesta</span>
                      )}
                      {predictedCorrectly && <span style={{ marginLeft: "6px" }}>✅ +5 🎯</span>}
                      {predictedWrong && <span style={{ marginLeft: "6px", color: "rgba(255,100,100,0.8)" }}>❌</span>}
                      {isWinner && !isMyVote && <span style={{ marginLeft: "6px" }}>🏆</span>}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {voteCount > 0 && (
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>
                        {voteCount} voto{voteCount !== 1 ? "s" : ""}
                      </Typography>
                    )}
                    <Typography variant="body2" sx={{
                      color: color,
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      minWidth: "36px",
                      textAlign: "right",
                    }}>
                      {probability}%
                    </Typography>
                  </Box>
                </Box>

                {/* Progress bar */}
                <Box sx={{
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}>
                  <Box sx={{
                    height: "100%",
                    width: `${probability}%`,
                    borderRadius: "3px",
                    background: isMyVote
                      ? `linear-gradient(to right, ${color}cc, ${color})`
                      : `${color}88`,
                    transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: isMyVote ? `0 0 8px ${color}88` : "none",
                  }} />
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
