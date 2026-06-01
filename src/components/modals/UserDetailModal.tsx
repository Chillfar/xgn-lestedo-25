import { Modal, Box, Typography } from "@mui/material";
import { User } from "../../constants/initialData";

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
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Box sx={{
          backgroundImage: `url(${user.cover})`,
          backgroundSize: "cover",
          ...positionStyle,
          height: "150px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>{user.name}</Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>{user.description}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>{user.rol}</Typography>
      </Box>
    </Modal>
  );
}
