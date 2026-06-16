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
export const primaryActionSx = {
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
export const gridContainerStyle: CSSProperties = { overflowY: "auto", flex: 1, minHeight: 0, scrollbarWidth: "none", marginTop: "4px" };
export const cardStyle: CSSProperties = {
  cursor: "pointer",
  textAlign: "center",
  color: "white",
  background: "rgba(255,255,255,0.03)",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.05)",
  transition: "all 0.3s ease"
};
export const imageStyle: CSSProperties = { width: "100%", height: "180px", objectFit: "cover", borderRadius: "12px 12px 0 0" };
export const typographyStyle: CSSProperties = { marginTop: "8px", fontWeight: 600, fontSize: "0.95rem" };
export const mobileContainerStyle: CSSProperties = { width: "100%", marginBottom: "20px" };
