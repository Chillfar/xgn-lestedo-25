import { CSSProperties } from "react";

export const modalBoxSx = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "#1e1e1e",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const closeButtonStyle: CSSProperties = { position: "absolute", top: "10px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white" };
export const titleSx = { fontWeight: "bold", mb: 3, textAlign: "center" };
export const alertSx = { mb: 2, backgroundColor: "#2a1a1a", color: "#ff6b6b" };
export const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": { borderColor: "#555" },
    "&:hover fieldset": { borderColor: "#F363FA" },
    "&.Mui-focused fieldset": { borderColor: "#F363FA" },
  },
  "& .MuiInputLabel-root": { color: "#aaa" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#F363FA" },
};
export const buttonSx = {
  mt: 2,
  py: 1.2,
  backgroundColor: "#F363FA",
  "&:hover": { backgroundColor: "#d14dd8" },
  fontWeight: "bold",
  fontSize: "1rem",
};
