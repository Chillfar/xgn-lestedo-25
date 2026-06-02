import { Modal, Box, Typography } from "@mui/material";
import { modalBoxSx, closeButtonStyle, titleContainerSx, titleTextSx, imgSx, imgLastSx } from "./TicketsModal.styles";

interface TicketsModalProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export default function TicketsModal({ open, onClose, isMobile }: TicketsModalProps) {
  return (
    <Modal open={open} onClose={onClose} style={isMobile ? { zIndex: 99999 } : undefined} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx(isMobile)}>
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Box sx={titleContainerSx}>
          <Typography variant={isMobile ? "h5" : "h4"} sx={titleTextSx}>🔖 Descarga tu acreditación digital!</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <img src={'/xgn-lestedo-25/acreditacion-chillfar.jpg'} alt={'Acreditación Chillfar'} style={imgSx} />
          <img src={'/xgn-lestedo-25/acreditacion-eras.jpg'} alt={'Acreditación Eras'} style={imgSx} />
          <img src={'/xgn-lestedo-25/acreditacion-goku.jpg'} alt={'Acreditación Goku'} style={imgSx} />
          <img src={'/xgn-lestedo-25/acreditacion-noyas.jpg'} alt={'Acreditación Noyas'} style={imgLastSx} />
        </Box>
      </Box>
    </Modal>
  );
}
