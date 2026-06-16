import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { modalBoxStyle, closeButtonStyle, textFieldSx, inputLabelSx, previewImageStyle, addButtonStyle } from "./AddGameModal.styles";

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
      <Box style={modalBoxStyle} className="liquid-glass">
        <div onClick={handleClose} style={closeButtonStyle}>✕</div>
        <Typography variant="h6" gutterBottom>Añadir nuevo juego</Typography>

        {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}

        <Box sx={{ width: "100%", mb: 2 }}>
          <Typography sx={inputLabelSx}>Nombre del juego</Typography>
          <TextField
            fullWidth
            value={newGameName}
            onChange={(e) => { setNewGameName(e.target.value); setError(""); }}
            sx={textFieldSx}
          />
        </Box>

        <Box sx={{ width: "100%", mb: 2 }}>
          <Typography sx={inputLabelSx}>URL de la portada</Typography>
          <TextField
            fullWidth
            value={newGameCover}
            onChange={(e) => { setNewGameCover(e.target.value); setError(""); }}
            sx={textFieldSx}
          />
        </Box>

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

        <Button variant="contained" fullWidth onClick={handleAdd} sx={addButtonStyle}>
          Agregar Juego
        </Button>
      </Box>
    </Modal>
  );
}
