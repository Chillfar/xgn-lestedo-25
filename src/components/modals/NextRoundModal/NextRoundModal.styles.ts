import { CSSProperties } from "react";

export const modalBoxSx = { 
  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
  backgroundColor: "rgba(25, 25, 35, 0.95)", 
  padding: "32px", color: "white", borderRadius: "24px", width: "400px",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)", 
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)"
};
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "15px", right: "20px", cursor: "pointer", fontSize: "1.5rem", zIndex: 50, color: "rgba(255,255,255,0.6)" };
export const primaryActionSx = {
  mt: 3, mb: 1,
  width: "100%",
  borderRadius: "24px",
  background: "linear-gradient(45deg, #00FFA3, #00B8D4)",
  color: "#0f0f13",
  fontWeight: "bold",
  textTransform: "none",
  border: "none",
  padding: "10px 16px",
  boxShadow: "0 4px 15px rgba(0, 255, 163, 0.3)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #00B8D4, #00FFA3)",
    boxShadow: "0 6px 20px rgba(0, 255, 163, 0.5)",
    transform: "translateY(-2px)",
  }
};
