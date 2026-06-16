import { CSSProperties } from "react";

export const modalBoxSx = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 };
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "15px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white", background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", transition: "all 0.2s" };
export const coverBoxSx = (cover: string, positionStyle: any) => ({
  backgroundImage: `url(${cover})`,
  backgroundSize: "cover",
  ...positionStyle,
  height: "150px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});
export const titleTextSx = { color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" , maxWidth: "calc(100% - 80px)", wordBreak: "break-word", fontSize: "clamp(1rem, 5vw, 2.2rem) !important" };
export const descSx = { mt: 2 };
