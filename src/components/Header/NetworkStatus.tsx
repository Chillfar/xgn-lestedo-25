import { CSSProperties } from "react";
import useNetworkPing from "../../hooks/useNetworkPing";

const STATUS_CONFIG = {
  online: { color: "#39ff14", glowColor: "rgba(57, 255, 20, 0.6)", label: "Red" },
  slow:   { color: "#ffb300", glowColor: "rgba(255, 179, 0, 0.6)", label: "Red" },
  offline:{ color: "#ff1744", glowColor: "rgba(255, 23, 68, 0.6)", label: "Red" },
} as const;

// Inject keyframes once
const STYLE_ID = "network-status-pulse";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes netPulse {
      0%   { box-shadow: 0 0 4px var(--pulse-color), 0 0 8px var(--pulse-color); transform: scale(1); }
      50%  { box-shadow: 0 0 8px var(--pulse-color), 0 0 18px var(--pulse-color); transform: scale(1.15); }
      100% { box-shadow: 0 0 4px var(--pulse-color), 0 0 8px var(--pulse-color); transform: scale(1); }
    }
    @keyframes netSlideIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
}

interface NetworkStatusProps {
  isMobile?: boolean;
}

export default function NetworkStatus({ isMobile = false }: NetworkStatusProps) {
  if (isMobile) return null;

  const { status, latencyMs } = useNetworkPing(5000);
  const config = STATUS_CONFIG[status];

  const containerStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: isMobile ? "5px" : "7px",
    padding: isMobile ? "4px 8px" : "4px 12px",
    borderRadius: "4px",
    backgroundColor: "rgba(30, 30, 30, 0.8)",
    border: "1px solid #9A26AE",
    fontSize: isMobile ? "0.75rem" : "0.9rem",
    color: "white",
    letterSpacing: "0.3px",
    whiteSpace: "nowrap",
    animation: "netSlideIn 0.4s ease-out",
    cursor: "default",
    userSelect: "none",
    boxSizing: "border-box",
    height: "32px",
    fontWeight: "bold",
    transition: "all 0.2s",
  };

  const dotStyle: CSSProperties = {
    width: isMobile ? "6px" : "7px",
    height: isMobile ? "6px" : "7px",
    borderRadius: "50%",
    backgroundColor: config.color,
    animation: "netPulse 2s ease-in-out infinite",
    flexShrink: 0,
    // @ts-ignore — CSS custom property
    "--pulse-color": config.glowColor,
  } as CSSProperties;

  const labelStyle: CSSProperties = {
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: 500,
  };

  const valueStyle: CSSProperties = {
    color: config.color,
    fontWeight: 700,
    textShadow: `0 0 6px ${config.glowColor}`,
  };

  return (
    <div style={containerStyle} title={`Estado de la red — ${status}`} id="network-status-widget">
      <div style={dotStyle} />
      <span style={labelStyle}>{config.label}:</span>
      <span style={valueStyle}>
        {latencyMs !== null ? `${latencyMs}ms` : "---"}
      </span>
    </div>
  );
}
