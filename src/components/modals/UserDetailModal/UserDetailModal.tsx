import { Modal, Box, Typography } from "@mui/material";
import { User } from "../../../constants/initialData";
import { modalBoxSx, closeButtonStyle, coverBoxSx, titleTextSx, descSx } from "./UserDetailModal.styles";

// Per-user background position configuration to maintain exact visual behavior
const userBackgroundPosition: Record<string, any> = {
  "Chillfar": { backgroundPositionY: "top !important" },
  "Goku": { backgroundPositionY: "top" },
  "El Noyas": { backgroundPosition: "center" },
  "Eras": { backgroundPosition: "center" }
};

interface UserDetailModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export default function UserDetailModal({ open, onClose, user }: UserDetailModalProps) {
  if (!user) return null;

  const positionStyle = userBackgroundPosition[user.name] || { backgroundPosition: "center" };

  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx}>
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Box sx={coverBoxSx(user.cover, positionStyle)}>
          <Typography variant="h5" sx={titleTextSx}>{user.name}</Typography>
        </Box>
        <Typography variant="body1" sx={descSx}>{user.description}</Typography>
        <Typography variant="body1" sx={descSx}>{user.rol}</Typography>
      </Box>
    </Modal>
  );
}
