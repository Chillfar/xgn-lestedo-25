import { CSSProperties } from "react";

export const modalBoxSx = { 
  position: "absolute", 
  top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
  width: { xs: '90vw', sm: 450 }, 
  bgcolor: "rgba(25, 25, 35, 0.95)", 
  color: "white", 
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)", 
  p: 4, 
  borderRadius: "24px",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)"
};
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "15px", right: "20px", cursor: "pointer", fontSize: "1.5rem", zIndex: 50, color: "rgba(255,255,255,0.6)", transition: "color 0.2s" };
export const coverBoxSx = (cover: string) => ({ backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center", height: "180px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", mb: 3, boxShadow: "0 4px 15px rgba(0,0,0,0.3)" });
export const titleTextSx = { color: "white", fontWeight: 800, textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.65)", padding: "8px 16px", borderRadius: "12px", maxWidth: "calc(100% - 40px)", wordBreak: "break-word", fontSize: "clamp(1.2rem, 5vw, 2.5rem) !important", backdropFilter: "blur(8px)", letterSpacing: "1px" };
export const buttonSx = {
  mt: 2, mb: 2,
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
