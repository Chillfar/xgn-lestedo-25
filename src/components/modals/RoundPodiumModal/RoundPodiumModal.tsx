import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, userColors } from "../../../constants/initialData";

interface RoundPodiumModalProps {
  open: boolean;
  onConfirm: () => void;
  /** Snapshot of users BEFORE the round closes — used to compute round gains */
  users: User[];
  /** Zero-based current round index */
  round: number;
  activeGameName: string | null;
}

// ── Confetti canvas ─────────────────────────────────────────────────
function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#FF3366","#00FFA3","#3399FF","#FFD700","#F363FA","#4fc3f7","#FF6B35","#A8FF3E"];
    const particles = Array.from({ length: 180 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      r: 4 + Math.random() * 6,
      d: 1.5 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 360,
      tiltSpeed: (Math.random() - 0.5) * 4,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.88;
        ctx.translate(p.x + p.r, p.y + p.r);
        ctx.rotate((p.tilt * Math.PI) / 180);
        if (p.shape === "rect") {
          ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        p.y += p.d;
        p.tilt += p.tiltSpeed;
        p.x += Math.sin(p.tilt * 0.05) * 0.8;
        // Reset if out of screen
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

// ── Podium bar ──────────────────────────────────────────────────────
function PodiumBar({
  user,
  gain,
  position,
  delay,
}: {
  user: User;
  gain: number;
  position: number;
  delay: number;
}) {
  const color = userColors[user.name as keyof typeof userColors] || "#4fc3f7";
  const heights = [220, 160, 110, 70];
  const barHeight = heights[position] ?? 70;
  const medals = ["🥇", "🥈", "🥉", "4️⃣"];
  const fontSize = position === 0 ? "1.15rem" : "0.95rem";

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Avatar + name */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: position === 0 ? "68px" : "52px",
          height: position === 0 ? "68px" : "52px",
          borderRadius: "50%",
          backgroundImage: `url(${user.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          border: `3px solid ${color}`,
          boxShadow: `0 0 20px ${color}88`,
          margin: "0 auto 6px",
        }} />
        <div style={{ fontSize, fontWeight: 700, color, textShadow: `0 0 12px ${color}99` }}>{user.name}</div>
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", marginTop: "2px" }}>
          +{gain} pts esta ronda
        </div>
      </div>

      {/* Bar */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: barHeight }}
        transition={{ delay: delay + 0.2, duration: 0.7, ease: "easeOut" }}
        style={{
          width: position === 0 ? "90px" : "72px",
          background: `linear-gradient(180deg, ${color}dd 0%, ${color}55 100%)`,
          borderRadius: "12px 12px 4px 4px",
          border: `1px solid ${color}88`,
          boxShadow: `0 0 20px ${color}44, inset 0 1px 0 rgba(255,255,255,0.2)`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "10px",
        }}
      >
        <span style={{ fontSize: position === 0 ? "1.8rem" : "1.3rem" }}>{medals[position]}</span>
      </motion.div>
    </motion.div>
  );
}

// ── Main modal ──────────────────────────────────────────────────────
export default function RoundPodiumModal({
  open,
  onConfirm,
  users,
  round,
  activeGameName,
}: RoundPodiumModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!open) setConfirmed(false);
  }, [open]);

  // Compute round gains: history[round] - history[round - 1] (or 0 if round 0)
  const podiumUsers = [...users]
    .map(u => ({
      u,
      gain: Math.max(0, (u.history[round] ?? u.history[u.history.length - 1] ?? 0) - (round > 0 ? (u.history[round - 1] ?? 0) : 0)),
    }))
    .sort((a, b) => b.gain - a.gain);

  const winner = podiumUsers[0];
  const winnerColor = winner ? (userColors[winner.u.name as keyof typeof userColors] || "#4fc3f7") : "#4fc3f7";

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(onConfirm, 300);
  };

  if (!open) return null;

  // Reorder for display: 2nd | 1st | 3rd | 4th
  const displayOrder =
    podiumUsers.length >= 3
      ? [podiumUsers[1], podiumUsers[0], podiumUsers[2], ...(podiumUsers.length > 3 ? [podiumUsers[3]] : [])]
      : podiumUsers;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="podium-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999999,
            background: "linear-gradient(160deg, #0a0a12 0%, #12082a 50%, #050510 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <ConfettiCanvas />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "24px 32px", maxWidth: "700px", width: "100%" }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{
                fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginBottom: "6px",
              }}>
                Fin de la ronda {round} {activeGameName ? `· ${activeGameName}` : ""}
              </div>
              <div style={{
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                fontWeight: 900,
                background: `linear-gradient(135deg, ${winnerColor}, #fff 60%, ${winnerColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.1,
                marginBottom: "4px",
                textShadow: "none",
              }}>
                {winner?.u.name ?? ""}
              </div>
              <div style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.1rem)", color: "rgba(255,255,255,0.6)", marginBottom: "32px" }}>
                gana la ronda con +{winner?.gain ?? 0} puntos 🎉
              </div>
            </motion.div>

            {/* Podium bars */}
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "40px",
            }}>
              {displayOrder.map((entry, i) => {
                // Map display position back to real rank for PodiumBar
                const realRank = podiumUsers.findIndex(p => p.u.id === entry.u.id);
                return (
                  <PodiumBar
                    key={entry.u.id}
                    user={entry.u}
                    gain={entry.gain}
                    position={realRank}
                    delay={0.3 + i * 0.15}
                  />
                );
              })}
            </div>

            {/* Confirm button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              onClick={handleConfirm}
              disabled={confirmed}
              style={{
                background: confirmed
                  ? "rgba(255,255,255,0.1)"
                  : `linear-gradient(135deg, ${winnerColor}cc, ${winnerColor})`,
                border: `2px solid ${winnerColor}88`,
                borderRadius: "50px",
                padding: "14px 48px",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: confirmed ? "default" : "pointer",
                boxShadow: `0 0 30px ${winnerColor}44`,
                transition: "all 0.3s ease",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={e => {
                if (!confirmed) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              {confirmed ? "Avanzando..." : "⚡ Avanzar de Ronda"}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
