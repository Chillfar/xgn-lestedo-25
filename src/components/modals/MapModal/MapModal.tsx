import { Modal, Box, Typography } from "@mui/material";
import { modalBoxSx, closeButtonStyle, titleContainerSx, titleTextSx } from "./MapModal.styles";

interface MapModalProps {
  open: boolean;
  onClose: () => void;
}

export default function MapModal({ open, onClose }: MapModalProps) {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx}>
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Box sx={titleContainerSx}>
          <Typography variant="h3" sx={titleTextSx}>🏟️ MAPA NOYA'S HOUSE VENUE</Typography>
        </Box>

        <iframe
          src="/xgn-lestedo-25/XGN PLANO.pdf"
          title="Mapa XGN Lestedo"
          width="100%"
          height="87%">
        </iframe>
      </Box>
    </Modal>
  );
}
