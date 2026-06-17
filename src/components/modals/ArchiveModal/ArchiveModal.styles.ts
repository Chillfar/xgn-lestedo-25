import { CSSProperties } from "react";

export const modalBoxSx = (isMobile: boolean) => ({
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "400px" : 500,
  maxWidth: "95vw",
  height: "auto",
  maxHeight: "85vh",
  bgcolor: "#1e1e1e",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
});

export const closeButtonStyle: CSSProperties = { position: "absolute", top: "15px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white", background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", transition: "all 0.2s" };
export const viewIconStyle: CSSProperties = { fontSize: "1.5rem" };
export const deleteIconStyle: CSSProperties = { fontSize: "1.5rem" };
