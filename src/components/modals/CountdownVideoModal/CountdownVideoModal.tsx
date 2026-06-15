import { Modal, Box } from "@mui/material";
import { modalBoxSx, closeButtonStyle } from "./CountdownVideoModal.styles";

interface CountdownVideoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CountdownVideoModal({ open, onClose }: CountdownVideoModalProps) {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx} className="liquid-glass">
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        {open && (
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/yS0Zz-D7pfA?autoplay=1"
            title="Final Countdown Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
      </Box>
    </Modal>
  );
}
