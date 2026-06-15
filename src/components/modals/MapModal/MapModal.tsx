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
      <Box sx={{ ...modalBoxSx(isMobile), display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }} className="liquid-glass">
        <Box sx={{ ...titleContainerSx, position: 'relative', top: 0, mt: 0, mx: 0, marginBottom: 0, flexShrink: 0 }}>
          <div onClick={onClose} style={{ ...closeButtonStyle, top: '16px', right: '16px', zIndex: 50 }}>✕</div>
          <Typography variant={isMobile ? "h4" : "h3"} sx={{ ...titleTextSx, display: "flex", gap: "12px", alignItems: "center", textAlign: "left" }}>
            <span style={{ flexShrink: 0 }}>🏟️</span>
            <span>MAPA ZONAS XGN SILLEDA</span>
          </Typography>
        </Box>

        <Box sx={{ overflowY: 'auto', flex: 1, padding: isMobile ? "20px" : "32px", pt: "20px" }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: isMobile ? "400px" : "100%", border: '2px dashed rgba(255, 255, 255, 0.2)', borderRadius: '8px', minHeight: "400px" }}>
            <Typography variant="h5" sx={{ color: 'white', fontStyle: 'italic', textAlign: 'center', p: 3 }}>
              Próximamente se subirá la nueva zona...
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
