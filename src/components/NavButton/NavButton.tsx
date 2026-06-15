import { IoQrCodeOutline } from "react-icons/io5";
import { getNavButtonStyle } from "./NavButton.styles";

interface NavButtonProps {
  label?: string;
  icon?: string;
  onClick: () => void;
}

export default function NavButton({ label, icon, onClick }: NavButtonProps) {
  const isIcon = icon === "qr";

  return (
    <div 
      onClick={onClick} 
      style={getNavButtonStyle(isIcon)}
      className="nav-btn"
    >
      {isIcon ? <IoQrCodeOutline /> : label}
    </div>
  );
}
