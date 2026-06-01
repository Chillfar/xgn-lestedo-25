import { CSSProperties } from "react";

export const modalBoxSx = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#1e1e1e",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: "85%",
  overflowY: "scroll",
  scrollbarWidth: "thin",
  scrollbarColor: "#F363FA #1e1e1e"
};

export const closeButtonStyle: CSSProperties = { position: "absolute", top: "10px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white" };
export const headerSx = { width: "auto", height: "auto", borderRadius: "8px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center" };
export const titleTextSx = { color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" };
export const daySx = { width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" };
export const itemSx = { width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" };
