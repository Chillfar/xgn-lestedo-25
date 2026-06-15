import { Modal, Box } from "@mui/material";
import { modalBoxSx, closeButtonStyle } from "./InaugurationVideoModal.styles";

interface InaugurationVideoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function InaugurationVideoModal({ open, onClose }: InaugurationVideoModalProps) {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx} className="liquid-glass">
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        {open && (
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/gCYcHz2k5x0?si=n7ZUrSRdWn8LriXS&start=43&autoplay=1"
            title="Final Inauguración Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
      </Box>
    </Modal>
  );
}
