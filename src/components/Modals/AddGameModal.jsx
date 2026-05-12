import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function AddGameModal({ open, onClose, onAddGame }) {
  const [gameName, setGameName] = useState("");
  const [gameCover, setGameCover] = useState("");

  const handleAddGame = () => {
    if (gameName && gameCover) {
      onAddGame({ name: gameName, cover: gameCover });
      setGameName("");
      setGameCover("");
    }
  };

  const handleClose = () => {
    setGameName("");
    setGameCover("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#1e1e1e",
          padding: "20px",
          color: "white",
          borderRadius: "8px",
          minWidth: "400px",
        }}
      >
        <Typography variant="h6">Añadir nuevo juego</Typography>
        <TextField
          label="Nombre del juego"
          fullWidth
          margin="normal"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
        <TextField
          label="URL de la portada"
          fullWidth
          margin="normal"
          value={gameCover}
          onChange={(e) => setGameCover(e.target.value)}
          style={{ backgroundColor: "white" }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddGame}
          style={{ marginTop: "10px" }}
        >
          Agregar Juego
        </Button>
      </Box>
    </Modal>
  );
}
