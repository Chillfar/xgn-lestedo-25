import { Modal, Box, Typography } from "@mui/material";
import { modalBoxSx, closeButtonStyle, titleContainerSx, titleTextSx, imgSx, imgLastSx } from "./TicketsModal.styles";

interface TicketsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TicketsModal({ open, onClose }: TicketsModalProps) {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx}>
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Box sx={titleContainerSx}>
          <Typography variant="h4" sx={titleTextSx}>🔖 Descarga tu acreditación digital!</Typography>
        </Box>
        
        <img src={'/xgn-lestedo-25/acreditacion-chillfar.jpg'} alt={'Acreditación Chillfar'} style={imgSx} />
        <img src={'/xgn-lestedo-25/acreditacion-eras.jpg'} alt={'Acreditación Eras'} style={imgSx} />
        <img src={'/xgn-lestedo-25/acreditacion-goku.jpg'} alt={'Acreditación Goku'} style={imgSx} />
        <img src={'/xgn-lestedo-25/acreditacion-noyas.jpg'} alt={'Acreditación Noyas'} style={imgLastSx} />
      </Box>
    </Modal>
  );
}
