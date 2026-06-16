import { Modal, Box, Typography, Button } from "@mui/material";
import { modalBoxSx, closeButtonStyle, primaryActionSx } from "./ResetDataModal.styles";

interface ResetDataModalProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
}

export default function ResetDataModal({ open, onClose, onReset }: ResetDataModalProps) {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx} className="liquid-glass">
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Typography variant="body1">¿Seguro que deseas borrar los datos guardados?</Typography>
        <Button variant="contained" fullWidth onClick={onReset} sx={primaryActionSx}>Borrar datos</Button>
      </Box>
    </Modal>
  );
}
