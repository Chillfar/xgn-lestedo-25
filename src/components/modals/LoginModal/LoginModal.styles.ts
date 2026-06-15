import { CSSProperties } from "react";

export const modalBoxSx = (isMobile: boolean) => ({
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "60%" : 380,
  bgcolor: "#1e1e1e",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: "auto",
  maxHeight: "85vh",
  overflowY: "scroll",
  scrollbarWidth: "thin",
  scrollbarColor: "#F363FA #1e1e1e"
});

export const closeButtonStyle: CSSProperties = { position: "absolute", top: "10px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white" };
export const titleContainerSx = { display: "flex", padding: "16px", alignItems: "center", justifyContent: "center", position: "sticky", top: "-32px", zIndex: 10, backgroundColor: "rgba(255, 255, 255, 0.04)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", marginBottom: "24px", mx: "-32px", mt: "-32px" };
export const titleTextSx = { color: "white", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", textShadow: "0 2px 10px rgba(0,0,0,0.5)", textAlign: "center" as const , maxWidth: "calc(100% - 80px)", wordBreak: "break-word", fontSize: "clamp(1rem, 5vw, 2.2rem) !important" };
export const alertSx = { mb: 2, backgroundColor: "#2a1a1a", color: "#ff6b6b" };
export const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)", borderWidth: "1px" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#F363FA", borderWidth: "1px" },
  },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #1e1e1e inset !important",
    WebkitTextFillColor: "white !important",
    borderRadius: "0px",
  }
};
export const inputLabelSx = {
  color: "#ccc",
  fontWeight: "bold",
  fontSize: "0.9rem",
  mb: 0.5,
  display: "block"
};
export const buttonSx = {
  mt: 3,
  py: 1.5,
  background: "linear-gradient(135deg, #F363FA, #c040d0)",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(243, 99, 250, 0.4)",
  color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
  transition: "all 0.3s ease",
  "&:hover": { 
    background: "linear-gradient(135deg, #f785fc, #d14dd8)",
    boxShadow: "0 6px 20px rgba(243, 99, 250, 0.6)",
    transform: "translateY(-2px)"
  },
};
