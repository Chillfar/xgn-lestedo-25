import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { modalBoxStyle, closeButtonStyle, textFieldStyle, previewImageStyle, addButtonStyle } from "./AddGameModal.styles";

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
    <Modal open={open} onClose={handleClose} sx={{ zIndex: 99999 }}>
      <Box style={modalBoxStyle}>
        <div onClick={handleClose} style={closeButtonStyle}>✕</div>
        <Typography variant="h6" gutterBottom>Añadir nuevo juego</Typography>

        {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}

        <TextField
          label="Nombre del juego"
          fullWidth
          margin="normal"
          value={newGameName}
          onChange={(e) => { setNewGameName(e.target.value); setError(""); }}
          style={textFieldStyle}
        />

        <TextField
          label="URL de la portada"
          fullWidth
          margin="normal"
          value={newGameCover}
          onChange={(e) => { setNewGameCover(e.target.value); setError(""); }}
          style={textFieldStyle}
        />

        {newGameCover && !error && (
          <Box mt={2} mb={2} textAlign="center">
            <Typography variant="body2" gutterBottom>Vista previa:</Typography>
            <img
              src={newGameCover}
              alt="Preview"
              style={previewImageStyle}
              onError={() => setError("No se pudo cargar la imagen. Verifica la URL.")}
            />
          </Box>
        )}

        <Button variant="contained" color="primary" fullWidth onClick={handleAdd} style={addButtonStyle}>
          Agregar Juego
        </Button>
      </Box>
    </Modal>
  );
}
