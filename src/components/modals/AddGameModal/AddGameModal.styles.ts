import { CSSProperties } from "react";

export const modalBoxStyle: CSSProperties = { 
  position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", 
  backgroundColor: "rgba(25, 25, 35, 0.95)", 
  padding: "32px", color: "white", borderRadius: "24px", width: "400px",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.5)", 
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.1)"
};
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "15px", right: "20px", cursor: "pointer", fontSize: "1.5rem", zIndex: 50, color: "rgba(255,255,255,0.6)" };

export const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)", borderWidth: "1px" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
    "&.Mui-focused fieldset": { borderColor: "#F363FA", borderWidth: "1px" },
  }
};
export const inputLabelSx = {
  color: "#ccc",
  fontWeight: "bold",
  fontSize: "0.9rem",
  mb: 0.5,
  display: "block"
};

export const previewImageStyle: CSSProperties = { maxWidth: "100%", maxHeight: "150px", borderRadius: "12px", objectFit: "cover", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" };
export const addButtonStyle = {
  mt: 3,
  width: "100%",
  borderRadius: "24px",
  background: "linear-gradient(45deg, #FF3366, #F363FA)",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  border: "none",
  padding: "10px 16px",
  boxShadow: "0 4px 15px rgba(243,99,250,0.4)",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #F363FA, #FF3366)",
    boxShadow: "0 6px 20px rgba(243,99,250,0.6)",
    transform: "translateY(-2px)",
  }
};
