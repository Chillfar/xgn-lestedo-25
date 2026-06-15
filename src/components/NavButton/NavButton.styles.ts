import { CSSProperties } from "react";

export const getNavButtonStyle = (isIcon: boolean): CSSProperties => ({
  cursor: "pointer", 
  color: "white", 
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: isIcon ? "4px 8px" : "4px 14px",
  border: "1px solid rgba(154, 38, 174, 0.6)",
  borderRadius: "8px",
  backgroundColor: "rgba(30, 30, 30, 0.6)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  fontSize: isIcon ? "1.3rem" : "0.85rem",
  fontWeight: 600,
  height: "32px",
  boxSizing: "border-box",
  transition: "all 0.25s ease",
  letterSpacing: "0.02em",
});
