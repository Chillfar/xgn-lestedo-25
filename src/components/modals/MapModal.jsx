import { Modal, Box, Typography } from "@mui/material";

export default function MapModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 900, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2, height: "85%", overflowY: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" }}>
        <Box sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>🏟️ MAPA NOYA'S HOUSE VENUE</Typography>
        </Box>

        <iframe
          src="XGN PLANO.pdf"
          title="Mapa XGN Lestedo"
          width="100%"
          height="87%">
        </iframe>
      </Box>
    </Modal>
  );
}
