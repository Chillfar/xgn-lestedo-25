import { CSSProperties } from "react";

export const paperStyle: CSSProperties = { padding: "16px", backgroundColor: "#1e1e1e", color: "white", position: "relative" };
export const headerContainerStyle: CSSProperties = { position: "relative", display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: "16px", minHeight: "36px" };
export const titleStyle: CSSProperties = { position: "absolute", left: 0, right: 0, textAlign: "center", cursor: "grab", margin: 0 };
export const adminButtonsContainerStyle: CSSProperties = { display: "flex", gap: "8px", position: "relative", zIndex: 10 };
export const adminButtonStyle: CSSProperties = { color: "white" };
export const tableContainerStyle: CSSProperties = { overflow: "auto", maxHeight: "350px", width: "100%", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" };
export const headerCellStyle: CSSProperties = { color: "white", whiteSpace: "nowrap" };
export const firstPlaceStyle: CSSProperties = { backgroundColor: "rgba(255, 215, 0, 0.1)" };
export const scoreCellStyle: CSSProperties = { color: "white" };
export const totalScoreCellStyle: CSSProperties = { color: "white", fontWeight: "bold" };
export const mobileContainerStyle: CSSProperties = { width: "100%", marginBottom: "20px" };

export const getCellStyle = (index: number, hasPoints: boolean): CSSProperties => ({
  color: "white", 
  cursor: "pointer", 
  fontWeight: index < 3 && hasPoints ? "bold" : "normal", 
  whiteSpace: "nowrap"
});
