import { Modal, Box, Typography, Button } from "@mui/material";
import { modalBoxSx, closeButtonStyle, primaryActionSx } from "./NextRoundModal.styles";

interface NextRoundModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function NextRoundModal({ open, onClose, onConfirm }: NextRoundModalProps) {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx} className="liquid-glass">
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Typography variant="h6" gutterBottom>Siguiente Ronda</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>¿Estás seguro de que quieres avanzar a la siguiente ronda?</Typography>
        <Button variant="contained" fullWidth onClick={onConfirm} sx={primaryActionSx}>Avanzar de ronda</Button>
      </Box>
    </Modal>
  );
}
