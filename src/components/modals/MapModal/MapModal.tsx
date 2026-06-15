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
          <Typography variant={isMobile ? "h4" : "h3"} sx={titleTextSx}>🏟️ MAPA ZONAS XGN SILLEDA</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: isMobile ? "400px" : "87%", border: '2px dashed rgba(255, 255, 255, 0.2)', borderRadius: '8px' }}>
          <Typography variant="h5" sx={{ color: 'white', fontStyle: 'italic', textAlign: 'center', p: 3 }}>
            Próximamente se subirá la nueva zona...
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
