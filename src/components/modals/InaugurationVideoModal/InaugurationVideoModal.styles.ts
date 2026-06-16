import { CSSProperties } from "react";

export const modalBoxSx = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.8)', position: 'relative' };
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "15px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white", background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(4px)", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", transition: "all 0.2s" };
