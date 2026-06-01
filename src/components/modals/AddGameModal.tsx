import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface AddGameModalProps {
  open: boolean;
  onClose: () => void;
  onAddGame: (game: { name: string; cover: string }) => void;
}

export default function AddGameModal({ open, onClose, onAddGame }: AddGameModalProps) {
  const [newGameName, setNewGameName] = useState("");
  const [newGameCover, setNewGameCover] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!newGameName || !newGameCover) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      new URL(newGameCover);
    } catch (_) {
      setError("La URL de la portada no es válida");
      return;
    }

    onAddGame({ name: newGameName, cover: newGameCover });
    setNewGameName("");
    setNewGameCover("");
    setError("");
  };

  const handleClose = () => {
    setNewGameName("");
    setNewGameCover("");
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#1e1e1e", padding: "20px", color: "white", borderRadius: "8px", width: "400px" }}>
        <Typography variant="h6" gutterBottom>Añadir nuevo juego</Typography>
        
        {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}

        <TextField 
          label="Nombre del juego" 
          fullWidth 
          margin="normal" 
          value={newGameName} 
          onChange={(e) => { setNewGameName(e.target.value); setError(""); }} 
          style={{ backgroundColor: "white", borderRadius: "4px" }} 
        />
        
        <TextField 
          label="URL de la portada" 
          fullWidth 
          margin="normal" 
          value={newGameCover} 
          onChange={(e) => { setNewGameCover(e.target.value); setError(""); }} 
          style={{ backgroundColor: "white", borderRadius: "4px" }} 
        />

        {newGameCover && !error && (
          <Box mt={2} mb={2} textAlign="center">
            <Typography variant="body2" gutterBottom>Vista previa:</Typography>
            <img 
              src={newGameCover} 
              alt="Preview" 
              style={{ maxWidth: "100%", maxHeight: "150px", borderRadius: "8px", objectFit: "cover" }}
              onError={() => setError("No se pudo cargar la imagen. Verifica la URL.")}
            />
          </Box>
        )}

        <Button variant="contained" color="primary" fullWidth onClick={handleAdd} style={{ marginTop: "10px" }}>
          Agregar Juego
        </Button>
      </Box>
    </Modal>
  );
}
