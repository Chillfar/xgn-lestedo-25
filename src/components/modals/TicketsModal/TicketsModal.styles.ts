import { CSSProperties } from "react";

export const modalBoxSx = (isMobile: boolean) => ({
  position: "absolute", top: "50%", left: "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "80%" : 520,
  bgcolor: "#1e1e1e", color: "white",
  boxShadow: 24, p: 3,
  borderRadius: 2,
  overflow: "hidden",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
});
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "15px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white", background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", transition: "all 0.2s" };
export const titleContainerSx = { display: "flex", padding: "16px", alignItems: "center", justifyContent: "center", position: "sticky", top: "-24px", zIndex: 10, backgroundColor: "rgba(255, 255, 255, 0.04)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", marginBottom: "20px", mx: "-24px", mt: "-24px" };
export const titleTextSx = { color: "white", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", textShadow: "0 2px 10px rgba(0,0,0,0.5)" , maxWidth: "calc(100% - 80px)", wordBreak: "break-word", fontSize: "clamp(1rem, 5vw, 2.2rem) !important" };
export const imgSx: CSSProperties = { marginRight: '16px', marginBottom: '16px', width: "310px", maxWidth: "100%", height: "auto", borderRadius: "8px" };
export const imgLastSx: CSSProperties = { marginBottom: '16px', width: "310px", maxWidth: "100%", height: "auto", borderRadius: "8px" };
