import { Modal, Box } from "@mui/material";

export default function InaugurationVideoModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/gCYcHz2k5x0?si=n7ZUrSRdWn8LriXS&start=43&autoplay=1"
          title="Final Inauguración Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </Box>
    </Modal>
  );
}
