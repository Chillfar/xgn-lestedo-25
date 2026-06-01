import { useAuth } from "../../contexts/AuthContext";
import { Rnd } from "react-rnd";
import {
  authButtonStyle,
  loginButtonStyle,
  mobileHeaderContainer,
  mobileLogoStyle,
  mobileRightSideStyle,
  topPinkLine,
  desktopHeaderContainer,
  desktopLogoContainer,
  desktopLogoStyle,
  desktopWidgetContainer,
  desktopNavRow,
  desktopBottomRightWidget
} from "./Header.styles";

interface HeaderProps {
  isMobile: boolean;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  children?: React.ReactNode;
  bottomRightWidget?: React.ReactNode;
}

export default function Header({ isMobile, isAuthenticated, onLoginClick, children, bottomRightWidget }: HeaderProps) {
  const { currentUser, logout } = useAuth();

  const authButton = isAuthenticated ? (
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
        <img src="/xgn-lestedo-25/logo_party_hd-removebg-preview.png" alt="Logo" style={mobileLogoStyle} />
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
      <div style={desktopHeaderContainer}>
        <div style={desktopLogoContainer}>
          <img src="/xgn-lestedo-25/logo_party_hd-removebg-preview.png" alt="Logo" style={desktopLogoStyle} />
        </div>
      </div>

      {!isMobile && (
        <Rnd default={{ x: 1510, y: 5, width: "19%", height: "auto" }} enableResizing={false} disableDragging={true} style={{ zIndex: 9999 }}>
          <div style={desktopWidgetContainer}>
            <div style={desktopNavRow}>
              {children}
              {authButton}
            </div>
            {bottomRightWidget && (
              <div style={desktopBottomRightWidget}>
                {bottomRightWidget}
              </div>
            )}
          </div>
        </Rnd>
      )}
    </>
  );
}
