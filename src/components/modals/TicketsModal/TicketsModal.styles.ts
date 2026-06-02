import { CSSProperties } from "react";

export const modalBoxSx = (isMobile: boolean) => ({ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: isMobile ? "60%" : 1300, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2, height: "85%", overflowY: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" });
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "10px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white" };
export const titleContainerSx = { width: "auto", height: "auto", borderRadius: "8px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", marginBottom: "80px" };
export const titleTextSx = { color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" };
export const imgSx: CSSProperties = { marginRight: '16px', marginBottom: '16px', width: "310px", maxWidth: "100%", height: "auto", borderRadius: "8px" };
export const imgLastSx: CSSProperties = { marginBottom: '16px', width: "310px", maxWidth: "100%", height: "auto", borderRadius: "8px" };
