import { useState, SyntheticEvent } from "react";
import { Modal, Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { Game, User } from "../../../constants/initialData";
import { modalBoxSx, closeButtonStyle, coverBoxSx, titleTextSx, buttonSx } from "./GameScoreModal.styles";

interface GameScoreModalProps {
  open: boolean;
  onClose: () => void;
  selectedGame: Game | null;
  users: User[];
  isAuthenticated: boolean;
  onAssignPoints: (userId: number) => void;
  onDeleteGame: (game: Game) => void;
}

export default function GameScoreModal({ open, onClose, selectedGame, users, isAuthenticated, onAssignPoints, onDeleteGame }: GameScoreModalProps) {
  const [toastMessage, setToastMessage] = useState("");

  const handleAssignPoints = (userId: number, userName: string) => {
    onAssignPoints(userId);
    setToastMessage(`¡+10 Puntos para ${userName}! 🎉`);
  };

  const handleDelete = () => {
    if (selectedGame && window.confirm(`¿Seguro que quieres borrar el juego ${selectedGame.name}?`)) {
      onDeleteGame(selectedGame);
    }
  };

  const handleCloseToast = (_event: Event | SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') return;
    setToastMessage("");
  };

  return (
    <>
      <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
        <Box sx={modalBoxSx}>
          <div onClick={onClose} style={closeButtonStyle}>✕</div>
          {selectedGame && (
            <>
              <Box sx={coverBoxSx(selectedGame.cover)}>
                <Typography variant="h5" sx={titleTextSx}>{selectedGame.name}</Typography>
              </Box>
              {isAuthenticated && users.map(user => (
                <Button key={user.id} variant="contained" color="primary" fullWidth sx={buttonSx} onClick={() => handleAssignPoints(user.id, user.name)}>
                  {user.name} +10 Puntos
                </Button>
              ))}
              {isAuthenticated && (
                <Button variant="contained" color="secondary" fullWidth sx={buttonSx} onClick={handleDelete}>
                  Quitar juego
                </Button>
              )}
            </>
          )}
        </Box>
      </Modal>

      <Snackbar 
        open={!!toastMessage} 
        autoHideDuration={2000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%', fontSize: '1.2rem', backgroundColor: '#33FF57', color: 'black' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
