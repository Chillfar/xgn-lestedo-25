import { Modal, Box, Typography, Button } from "@mui/material";

export default function ResetDataModal({ open, onClose, onReset }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography variant="body1">¿Seguro que deseas borrar los datos guardados?</Typography>
        <Button variant="contained" color="primary" fullWidth onClick={onReset} style={{ marginTop: "10px" }}>Borrar datos</Button>
      </Box>
    </Modal>
  );
}
