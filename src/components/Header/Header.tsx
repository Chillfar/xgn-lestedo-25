import { useAuth } from "../../contexts/AuthContext";
import NetworkStatus from "./NetworkStatus";
import {
  authButtonStyle,
  loginButtonStyle,
  mobileHeaderContainer,
  mobileLogoStyle,
  mobileRightSideStyle,
  topPinkLine,
  desktopLogoStyle,
  desktopNavRow,
  desktopBottomRightWidget
} from "./Header.styles";

interface HeaderProps {
  isMobile: boolean;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  children?: React.ReactNode;
  bottomRightWidget?: React.ReactNode;
  leftWidget?: React.ReactNode;
  centerWidget?: React.ReactNode;
}

export default function Header({ isMobile, isAuthenticated, onLoginClick, children, bottomRightWidget, leftWidget, centerWidget }: HeaderProps) {
  const { currentUser, logout } = useAuth();

  const authButton = !!currentUser ? (
    <button onClick={logout} style={authButtonStyle}>
      {currentUser?.email?.split("@")[0]}
    </button>
  ) : (
    <button onClick={onLoginClick} style={loginButtonStyle}>
      Login
    </button>
  );

  if (isMobile) {
    return (
      <div style={mobileHeaderContainer}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/lan-party/logo_party_hd-removebg-preview.png" alt="Logo" style={mobileLogoStyle} />
          <NetworkStatus isMobile />
        </div>
        <div style={mobileRightSideStyle}>
          {children}
          {authButton}
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={topPinkLine}></div>
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "-60px",
        position: "relative",
      }}>
        {/* Logo */}
        <div style={{ marginLeft: "25px", position: "relative", zIndex: 9998 }}>
          <img src="/lan-party/logo_party_hd-removebg-preview.png" alt="Logo" style={desktopLogoStyle} />
        </div>

        {/* Center widget (QuotesBanner) placed absolutely to span behind Logo and Countdown */}
        {centerWidget && (
          <div style={{ position: "absolute", top: "50px", left: "125px", right: "60px", height: "80px", zIndex: 50, pointerEvents: "none" }}>
            {centerWidget}
          </div>
        )}

        {/* Nav widget — right side */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", position: "relative", zIndex: 9999, marginTop: "12px" }}>
          <div style={desktopNavRow}>
            {leftWidget}
            <NetworkStatus />
            {children}
            {authButton}
          </div>
          {bottomRightWidget && (
            <div style={desktopBottomRightWidget}>
              {bottomRightWidget}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

