import { Modal, Box, Typography } from "@mui/material";

export default function TicketsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 1300, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2, height: "85%", overflowY: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" }}>
        <Box sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center", marginBottom: "80px" }}>
          <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>🔖 Descarga tu acreditación digital!</Typography>
        </Box>
        
        <img src={'/acreditacion-chillfar.jpg'} alt={'Acreditación Chillfar'} style={{ marginRight: '16px', width: "310px", height: "auto", borderRadius: "8px" }} />
        <img src={'/acreditacion-eras.jpg'} alt={'Acreditación Eras'} style={{ marginRight: '16px', width: "310px", height: "auto", borderRadius: "8px" }} />
        <img src={'/acreditacion-goku.jpg'} alt={'Acreditación Goku'} style={{ marginRight: '16px', width: "310px", height: "auto", borderRadius: "8px" }} />
        <img src={'/acreditacion-noyas.jpg'} alt={'Acreditación Noyas'} style={{ width: "310px", height: "auto", borderRadius: "8px" }} />
      </Box>
    </Modal>
  );
}
