import { CSSProperties } from "react";

export const modalBoxSx = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 };
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "10px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white" };
export const coverBoxSx = (cover: string) => ({ backgroundImage: `url(${cover})`, backgroundSize: "cover", backgroundPosition: "center", height: "150px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" });
export const titleTextSx = { color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" };
export const buttonSx = { mt: 1 };
