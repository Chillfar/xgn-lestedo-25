import { Rnd } from "react-rnd";
import { Paper, Typography } from "@mui/material";
import { IoQrCodeOutline } from "react-icons/io5";

interface NavButtonProps {
  label?: string;
  icon?: string;
  onClick: () => void;
  position: { x: number; y: number; width?: string | number; height?: string | number };
}

export default function NavButton({ label, icon, onClick, position }: NavButtonProps) {
  const isIcon = icon === "qr";

  return (
    <Rnd default={position as any} enableResizing={false} disableDragging={true} onClick={onClick}>
      <Paper style={{ padding: "16px", boxShadow: "none", cursor: "pointer", backgroundColor: "transparent", color: "white", textAlign: "center" }}>
        <Typography style={{ fontSize: isIcon ? "1.3rem" : "1rem", fontWeight: "bold", border: "1px solid #9A26AE", padding: isIcon ? '2px' : undefined }}>
          {isIcon ? <IoQrCodeOutline /> : label}
        </Typography>
      </Paper>
    </Rnd>
  );
}
