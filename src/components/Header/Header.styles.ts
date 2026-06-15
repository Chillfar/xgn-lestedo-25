import { CSSProperties } from "react";

export const authButtonStyle: CSSProperties = {
  background: "transparent", border: "1px solid #F363FA", color: "#F363FA", padding: "4px 12px",
  borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold", height: "32px",
  display: "flex", alignItems: "center", boxSizing: "border-box"
};

export const loginButtonStyle: CSSProperties = {
  background: "#F363FA", border: "none", color: "white", padding: "4px 12px",
  borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "bold", height: "32px",
  display: "flex", alignItems: "center", boxSizing: "border-box"
};

export const mobileHeaderContainer: CSSProperties = { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 9999 };
export const mobileLogoStyle: CSSProperties = { maxWidth: "80px", marginTop: "-12px", transform: "scale(1.35) translateY(12px)", transformOrigin: "left center" };
export const mobileRightSideStyle: CSSProperties = { display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap", justifyContent: "flex-end", margin: "10px 0" };

export const topPinkLine: CSSProperties = { width: "100%", height: "2px", backgroundColor: "#F363FA", position: "fixed", top: 0, left: 0, zIndex: 10000 };
export const desktopHeaderContainer: CSSProperties = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "30px", position: "relative" };
export const desktopLogoContainer: CSSProperties = { marginLeft: "25px", zIndex: 9998 };
export const desktopLogoStyle: CSSProperties = { maxWidth: "200px", marginTop: "-12px" };

export const desktopWidgetContainer: CSSProperties = { display: "flex", flexDirection: "column", alignItems: "flex-end" };
export const desktopNavRow: CSSProperties = { display: "flex", alignItems: "center", gap: "10px" };
export const desktopBottomRightWidget: CSSProperties = { marginTop: "8px", alignSelf: "flex-end" };
