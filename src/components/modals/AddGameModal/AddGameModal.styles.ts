import { CSSProperties } from "react";

export const modalBoxStyle: CSSProperties = { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#1e1e1e", padding: "20px", color: "white", borderRadius: "8px", width: "400px" };
export const closeButtonStyle: CSSProperties = { position: "absolute", top: "10px", right: "15px", cursor: "pointer", fontSize: "1.2rem", zIndex: 50, color: "white" };
export const textFieldStyle: CSSProperties = { backgroundColor: "white", borderRadius: "4px" };
export const previewImageStyle: CSSProperties = { maxWidth: "100%", maxHeight: "150px", borderRadius: "8px", objectFit: "cover" };
export const addButtonStyle: CSSProperties = { marginTop: "10px" };
