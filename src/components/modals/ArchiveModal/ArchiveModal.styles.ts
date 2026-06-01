import { CSSProperties } from "react";

export const modalBoxSx = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "95vw",
  maxHeight: "80vh",
  bgcolor: "#1e1e1e",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  display: "flex",
  flexDirection: "column",
};

export const closeButtonStyle: CSSProperties = { position: "absolute", top: "10px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white" };
export const viewIconStyle: CSSProperties = { fontSize: "1rem" };
export const deleteIconStyle: CSSProperties = { fontSize: "1rem" };
