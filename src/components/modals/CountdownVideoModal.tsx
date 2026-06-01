import { Modal, Box } from "@mui/material";

interface CountdownVideoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CountdownVideoModal({ open, onClose }: CountdownVideoModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
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
