import { CSSProperties } from "react";

export const paperStyle: CSSProperties = {
  padding: "20px",
  color: "white",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  background: "linear-gradient(145deg, rgba(30, 30, 40, 0.7), rgba(15, 15, 20, 0.8))",
  backdropFilter: "blur(16px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
};
export const mobileContainerStyle: CSSProperties = { width: "100%", marginBottom: "20px" };
export const buttonSx = {
  mt: 2, mb: 2,
  width: "100%",
  borderRadius: "24px",
  background: "linear-gradient(45deg, #00FFA3, #00B8D4, #00FFA3)",
  backgroundSize: "200% auto",
  backgroundPosition: "0% center",
  color: "#0f0f13",
  fontWeight: "bold",
  textTransform: "none",
  border: "none",
  padding: "10px 16px",
  boxShadow: "0 4px 15px rgba(0, 255, 163, 0.3)",
  cursor: "pointer",
  transition: "all 0.4s ease",
  "&:hover": {
    backgroundPosition: "100% center",
    boxShadow: "0 6px 20px rgba(0, 255, 163, 0.5)",
    transform: "translateY(-2px)",
  }
};

export const secondaryAdminButtonStyle = { 
  color: "white",
  borderRadius: "20px",
  background: "linear-gradient(90deg, rgba(243,99,250,0.2) 0%, rgba(79,195,247,0.2) 100%)",
  border: "1px solid rgba(255,255,255,0.1)",
  textTransform: "none",
  fontWeight: 600,
  padding: "4px 16px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    background: "linear-gradient(90deg, rgba(243,99,250,0.3) 0%, rgba(79,195,247,0.3) 100%)",
    borderColor: "rgba(255,255,255,0.3)"
  }
};
