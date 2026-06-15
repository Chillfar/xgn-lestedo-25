import { CSSProperties } from "react";

export const mobileContainerStyle: CSSProperties = { width: "100%", marginBottom: "20px" };
export const desktopContainerStyle: CSSProperties = { width: "320px", zIndex: 9990 };

export const mobilePaperStyle: CSSProperties = {
  padding: "16px",
  background: "linear-gradient(135deg, #ff4081, #ff80ab)",
  color: "white",
  textAlign: "right",
  paddingRight: "30px",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(255, 64, 129, 0.4)",
};

export const desktopPaperStyle: CSSProperties = {
  padding: "16px",
  background: "linear-gradient(135deg, #ff4081, #ff80ab)",
  color: "white",
  textAlign: "center",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(255, 64, 129, 0.4)",
};

export const typographyStyle: CSSProperties = { fontSize: "1.5rem", fontWeight: "bold" };
