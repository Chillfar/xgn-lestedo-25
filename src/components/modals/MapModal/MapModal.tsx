import { Modal, Box, Typography } from "@mui/material";
import { modalBoxSx, closeButtonStyle, titleContainerSx, titleTextSx } from "./MapModal.styles";

interface MapModalProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export default function MapModal({ open, onClose, isMobile }: MapModalProps) {
  return (
    <Modal open={open} onClose={onClose} style={isMobile ? { zIndex: 99999 } : undefined} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx(isMobile)}>
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Box sx={titleContainerSx}>
          <Typography variant={isMobile ? "h4" : "h3"} sx={titleTextSx}>🏟️ MAPA NOYA'S HOUSE VENUE</Typography>
        </Box>

        <iframe
          src="/xgn-lestedo-25/XGN PLANO.pdf"
          title="Mapa XGN Lestedo"
          width="100%"
          height={isMobile ? "400px" : "87%"}>
        </iframe>
      </Box>
    </Modal>
  );
}
