import { CSSProperties } from "react";

export const paperStyle: CSSProperties = {
  padding: "20px",
  color: "white",
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  background: "linear-gradient(145deg, rgba(30, 30, 40, 0.7), rgba(15, 15, 20, 0.8))",
  backdropFilter: "blur(16px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
};

export const headerContainerStyle: CSSProperties = { position: "relative", display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "20px", minHeight: "40px" };
export const titleStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  textAlign: "center",
  cursor: "default",
  margin: 0,
  fontWeight: "normal",
  letterSpacing: "1px",
  color: "white"
};
export const adminButtonsContainerStyle: CSSProperties = { display: "flex", gap: "12px", position: "relative", zIndex: 10 };

export const adminButtonStyle = {
  color: "white",
  borderRadius: "20px",
  background: "linear-gradient(90deg, rgba(243,99,250,0.2) 0%, rgba(79,195,247,0.2) 100%)",
  border: "1px solid rgba(255,255,255,0.1)",
  textTransform: "none",
  fontWeight: 600,
  padding: "4px 16px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    background: "linear-gradient(90deg, rgba(243,99,250,0.3) 0%, rgba(79,195,247,0.3) 100%)",
    borderColor: "rgba(255,255,255,0.3)"
  }
};

export const primaryAdminButtonStyle = {
  borderRadius: "20px",
  background: "linear-gradient(45deg, #00FFA3, #00B8D4, #00FFA3)",
  backgroundSize: "200% auto",
  backgroundPosition: "0% center",
  color: "#0f0f13",
  fontWeight: "bold",
  textTransform: "none",
  border: "none",
  padding: "8px 20px",
  boxShadow: "0 4px 15px rgba(0, 255, 163, 0.3)",
  cursor: "pointer",
  transition: "all 0.4s ease",
  "&:hover": {
    backgroundPosition: "100% center",
    boxShadow: "0 6px 20px rgba(0, 255, 163, 0.5)",
    transform: "translateY(-2px)",
  }
};

export const tableContainerStyle: CSSProperties = { overflow: "auto", flex: 1, width: "100%", scrollbarWidth: "none", minHeight: 0 };
export const headerCellStyle: CSSProperties = { color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap", borderBottom: "1px solid rgba(255,255,255,0.1)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" };

// CSS variables allow light-mode to override the sticky backgrounds without JS
export const stickyHeaderCellStyle: CSSProperties = {
  ...headerCellStyle,
  position: "sticky",
  left: 0,
  zIndex: 3,
  backgroundColor: "var(--ranking-sticky-bg, #181822)",
  boxShadow: "-2px 0 0 var(--ranking-sticky-bg, #181822)"
};

export const stickyRightHeaderCellStyle: CSSProperties = {
  ...headerCellStyle,
  position: "sticky",
  right: -2,
  zIndex: 3,
  backgroundColor: "var(--ranking-sticky-bg, #181822)",
  boxShadow: "-1px 0 0 rgba(255,255,255,0.1)"
};

export const firstPlaceStyle: CSSProperties = {
  backgroundColor: "rgba(255, 215, 0, 0.15)",
  boxShadow: "inset 0 0 15px rgba(255, 215, 0, 0.1)",
  position: "relative"
};

export const scoreCellStyle: CSSProperties = { color: "inherit", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "1rem" };
export const totalScoreCellStyle: CSSProperties = { color: "#4fc3f7", fontWeight: "bold", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: "1.1rem" };
export const mobileContainerStyle: CSSProperties = { width: "100%", marginBottom: "20px" };
export const predictionCellStyle: CSSProperties = { color: "#F363FA", fontWeight: 600, whiteSpace: "nowrap", borderBottom: "1px solid rgba(255,255,255,0.05)" };
export const predictionHeaderCellStyle: CSSProperties = { ...headerCellStyle, color: "#F363FA", cursor: "help" };

export const getCellStyle = (index: number, hasPoints: boolean): CSSProperties => ({
  color: "inherit",
  cursor: "pointer",
  fontWeight: index < 3 && hasPoints ? "bold" : "normal",
  whiteSpace: "nowrap",
  position: "sticky",
  left: 0,
  zIndex: 2,
  backgroundColor: "var(--ranking-sticky-bg, #181822)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "-2px 0 0 var(--ranking-sticky-bg, #181822)"
});

export const getStickyFirstPlaceCellStyle = (index: number, hasPoints: boolean, isLoggedIn: boolean): CSSProperties => {
  const isFirst  = index === 0 && hasPoints;
  const isSecond = index === 1 && hasPoints;
  const isThird  = index === 2 && hasPoints;
  const bgVar = isFirst ? "var(--ranking-sticky-bg-first, #2a2410)" : "var(--ranking-sticky-bg, #181822)";
  const stripeColor = isFirst ? "#FFD700" : (isSecond ? "#C0C0C0" : (isThird ? "#CD7F32" : "transparent"));

  return {
    cursor: isLoggedIn ? "pointer" : "default",
    fontWeight: (index < 3 && hasPoints) ? "bold" : "normal",
    whiteSpace: "nowrap",
    position: "sticky",
    left: 0,
    zIndex: 2,
    backgroundColor: bgVar,
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    boxShadow: `-2px 0 0 ${bgVar}${stripeColor !== "transparent" ? `, inset 4px 0 0 ${stripeColor}` : ""}`
  };
};

export const getStickyRightTotalScoreCellStyle = (index: number, hasPoints: boolean): CSSProperties => {
  const isFirst = index === 0 && hasPoints;
  const bgVar = isFirst ? "var(--ranking-sticky-bg-first, #2a2410)" : "var(--ranking-sticky-bg, #181822)";

  return {
    color: "#4fc3f7",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontSize: "1.1rem",
    position: "sticky",
    right: -2,
    zIndex: 2,
    backgroundColor: bgVar,
    boxShadow: "-1px 0 0 rgba(255,255,255,0.1)"
  };
};
