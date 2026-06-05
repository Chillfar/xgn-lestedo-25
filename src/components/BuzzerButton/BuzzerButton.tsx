import { CSSProperties, useState } from "react";
import { playBuzzerSound } from "../../hooks/useBuzzer";

interface BuzzerButtonProps {
  onBuzz: () => Promise<void>;
  isMobile?: boolean;
}

// Inject keyframes once
const STYLE_ID = "buzzer-button-anim";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes buzzerRipple {
      0%   { box-shadow: 0 0 0 0 rgba(243, 99, 250, 0.5); }
      70%  { box-shadow: 0 0 0 10px rgba(243, 99, 250, 0); }
      100% { box-shadow: 0 0 0 0 rgba(243, 99, 250, 0); }
    }
    @keyframes buzzerShake {
      0%, 100% { transform: translateX(0); }
      20%  { transform: translateX(-2px) rotate(-2deg); }
      40%  { transform: translateX(2px) rotate(2deg); }
      60%  { transform: translateX(-1px) rotate(-1deg); }
      80%  { transform: translateX(1px) rotate(1deg); }
    }
  `;
  document.head.appendChild(style);
}

export default function BuzzerButton({ onBuzz, isMobile = false }: BuzzerButtonProps) {
  const [buzzing, setBuzzing] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleClick = async () => {
    if (cooldown) return;
    setBuzzing(true);
    setCooldown(true);

    // Play sound immediately — user gesture guarantees browser allows audio
    playBuzzerSound();
    try {
      await onBuzz();
    } catch {
      // ignore errors
    }

    // Visual feedback duration
    setTimeout(() => setBuzzing(false), 600);
    // Cooldown to prevent spam (3 seconds)
    setTimeout(() => setCooldown(false), 3000);
  };

  const buttonStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "4px 8px" : "4px 12px",
    border: buzzing ? "1px solid #F363FA" : "1px solid #9A26AE",
    borderRadius: "4px",
    backgroundColor: buzzing ? "rgba(243, 99, 250, 0.15)" : "rgba(30, 30, 30, 0.8)",
    color: "white",
    fontSize: isMobile ? "1.1rem" : "1.3rem",
    fontWeight: "bold",
    height: "32px",
    boxSizing: "border-box" as const,
    cursor: cooldown ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    opacity: cooldown && !buzzing ? 0.5 : 1,
    animation: buzzing ? "buzzerRipple 0.6s ease-out, buzzerShake 0.4s ease-in-out" : "none",
    userSelect: "none" as const,
  };

  return (
    <div
      onClick={handleClick}
      style={buttonStyle}
      title={cooldown ? "Espera unos segundos..." : "¡Enviar sonido a todos!"}
      id="buzzer-button"
    >
      🔔
    </div>
  );
}
