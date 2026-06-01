import { CSSProperties } from "react";

export const getNavButtonStyle = (isIcon: boolean): CSSProperties => ({
  cursor: "pointer", 
  color: "white", 
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: isIcon ? "4px 8px" : "4px 12px",
  border: "1px solid #9A26AE",
  borderRadius: "4px",
  backgroundColor: "rgba(30, 30, 30, 0.8)",
  fontSize: isIcon ? "1.3rem" : "0.9rem",
  fontWeight: "bold",
  height: "32px",
  boxSizing: "border-box",
  transition: "all 0.2s"
});
