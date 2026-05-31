import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

export default function AddGameModal({ open, onClose, onAddGame }) {
  const [newGameName, setNewGameName] = useState("");
  const [newGameCover, setNewGameCover] = useState("");

  const handleAdd = () => {
    if (newGameName && newGameCover) {
      onAddGame({ name: newGameName, cover: newGameCover });
      setNewGameName("");
      setNewGameCover("");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#1e1e1e", padding: "20px", color: "white", borderRadius: "8px" }}>
        <Typography variant="h6">Añadir nuevo juego</Typography>
        <TextField label="Nombre del juego" fullWidth margin="normal" value={newGameName} onChange={(e) => setNewGameName(e.target.value)} style={{ backgroundColor: "white" }} />
        <TextField label="URL de la portada" fullWidth margin="normal" value={newGameCover} onChange={(e) => setNewGameCover(e.target.value)} style={{ backgroundColor: "white" }} />
        <Button variant="contained" color="primary" fullWidth onClick={handleAdd} style={{ marginTop: "10px" }}>Agregar Juego</Button>
      </Box>
    </Modal>
  );
}
