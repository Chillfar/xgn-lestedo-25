import { Modal, Box, Typography } from "@mui/material";
import { User, userColors } from "../../../constants/initialData";
import { modalBoxSx, closeButtonStyle, coverBoxSx, titleTextSx, descSx } from "./UserDetailModal.styles";

const userBackgroundPosition: Record<string, any> = {
  "Chillfar": { backgroundPositionY: "top !important" },
  "Goku":     { backgroundPositionY: "top" },
  "El Noyas": { backgroundPosition: "center" },
  "Eras":     { backgroundPosition: "center" }
};

interface UserDetailModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  /** All users — needed to compute relative stats (winrate, streak) */
  allUsers: User[];
  historyLabels: string[];
}

// ── Stat helpers ──────────────────────────────────────────────────
function getUserStats(user: User, allUsers: User[], historyLabels: string[]) {
  const history = user.history || [];
  const histLen = history.length;

  // ── Juego favorito ──
  const scoreEntries = Object.entries(user.scores);
  const favoriteGame = scoreEntries.length > 0
    ? scoreEntries.sort((a, b) => b[1] - a[1])[0][0]
    : null;

  // ── Mejor / peor ronda (por ganancia en esa ronda) ──
  const roundGains: { label: string; gain: number }[] = [];
  for (let i = 0; i < histLen; i++) {
    roundGains.push({
      label: historyLabels[i] ?? `Ronda ${i + 1}`,
      gain: (history[i] || 0) - (i > 0 ? (history[i - 1] || 0) : 0),
    });
  }
  const bestRound  = roundGains.length > 0 ? roundGains.reduce((a, b) => (b.gain > a.gain ? b : a)) : null;
  const worstRound = roundGains.length > 0 ? roundGains.reduce((a, b) => (b.gain < a.gain ? b : a)) : null;

  // ── Winrate (rounds where this user had highest gain) ──
  let winsAsLeader = 0;
  let playedRounds = 0;
  const maxHist = Math.max(...allUsers.map(u => u.history?.length || 0));
  for (let i = 0; i < maxHist; i++) {
    const gains = allUsers.map(u => ({ id: u.id, gain: (u.history?.[i] || 0) - (i > 0 ? (u.history?.[i - 1] || 0) : 0) }));
    const maxGain = Math.max(...gains.map(g => g.gain));
    if (maxGain > 0) {
      playedRounds++;
      const myGain = (user.history?.[i] || 0) - (i > 0 ? (user.history?.[i - 1] || 0) : 0);
      if (myGain === maxGain) winsAsLeader++;
    }
  }
  const winrate = playedRounds > 0 ? Math.round((winsAsLeader / playedRounds) * 100) : 0;

  // ── Racha actual (consecutive rounds as winner at the end) ──
  let currentStreak = 0;
  for (let i = maxHist - 1; i >= 0; i--) {
    const gains = allUsers.map(u => (u.history?.[i] || 0) - (i > 0 ? (u.history?.[i - 1] || 0) : 0));
    const maxGain = Math.max(...gains);
    const myGain = (user.history?.[i] || 0) - (i > 0 ? (user.history?.[i - 1] || 0) : 0);
    if (maxGain > 0 && myGain === maxGain) {
      currentStreak++;
    } else {
      break;
    }
  }

  // ── Total ──
  const total = Object.values(user.scores).reduce((a, b) => a + b, 0) + (user.predictionPoints || 0);

  return { favoriteGame, bestRound, worstRound, winrate, currentStreak, winsAsLeader, playedRounds, total };
}

// ── Stat card sub-component ──
function StatCard({ emoji, label, value, color }: { emoji: string; label: string; value: string; color?: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      padding: "10px 14px",
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    }}>
      <span style={{ fontSize: "1.1rem" }}>{emoji}</span>
      <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: color || "#fff" }}>{value}</span>
    </div>
  );
}

export default function UserDetailModal({ open, onClose, user, allUsers, historyLabels }: UserDetailModalProps) {
  if (!user) return null;

  const positionStyle = userBackgroundPosition[user.name] || { backgroundPosition: "center" };
  const color = userColors[user.name as keyof typeof userColors] || "#4fc3f7";
  const stats = getUserStats(user, allUsers, historyLabels);
  const hasStats = stats.playedRounds > 0;

  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={{ ...modalBoxSx, maxHeight: "90vh", overflowY: "auto" }} className="liquid-glass">
        <div onClick={onClose} style={closeButtonStyle}>✕</div>

        {/* Cover */}
        <Box sx={coverBoxSx(user.cover, positionStyle)}>
          <Typography variant="h5" sx={titleTextSx}>{user.name}</Typography>
        </Box>

        {/* Description */}
        <Typography variant="body1" sx={descSx}>{user.description}</Typography>
        <Typography variant="body2" sx={{ ...descSx, color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{user.rol}</Typography>

        {/* Stats section */}
        {hasStats && (
          <>
            {/* Divider */}
            <div style={{ width: "100%", height: "1px", background: `linear-gradient(to right, transparent, ${color}55, transparent)`, margin: "16px 0 14px" }} />

            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", mb: 1.5 }}>
              📊 Estadísticas
            </Typography>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <StatCard
                emoji="🏆"
                label="Winrate"
                value={`${stats.winrate}% (${stats.winsAsLeader}/${stats.playedRounds})`}
                color={color}
              />
              <StatCard
                emoji="🎮"
                label="Juego favorito"
                value={stats.favoriteGame ?? "—"}
                color={color}
              />
              <StatCard
                emoji="🔥"
                label="Racha actual"
                value={stats.currentStreak > 0 ? `${stats.currentStreak} ronda${stats.currentStreak !== 1 ? "s" : ""} ganando` : "Sin racha"}
                color={stats.currentStreak > 1 ? "#FFD700" : undefined}
              />
              <StatCard
                emoji="⭐"
                label="Mejor ronda"
                value={stats.bestRound ? `+${stats.bestRound.gain} pts (${stats.bestRound.label})` : "—"}
                color="#00FFA3"
              />
              <StatCard
                emoji="📉"
                label="Peor ronda"
                value={stats.worstRound ? `+${stats.worstRound.gain} pts (${stats.worstRound.label})` : "—"}
                color="#FF7070"
              />
              <StatCard
                emoji="🎯"
                label="Pts predicciones"
                value={user.predictionPoints > 0 ? `+${user.predictionPoints}` : "—"}
                color="#F363FA"
              />
            </div>

            {/* Total bar */}
            <div style={{
              marginTop: "14px",
              padding: "12px 16px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${color}22, ${color}11)`,
              border: `1px solid ${color}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>Total acumulado</span>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, color }}>{stats.total} pts</span>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
}
