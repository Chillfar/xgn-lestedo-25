import { useState, SyntheticEvent } from "react";
import { Modal, Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { Game, User } from "../../constants/initialData";

interface GameScoreModalProps {
  open: boolean;
  onClose: () => void;
  selectedGame: Game | null;
  users: User[];
  onAssignPoints: (userId: number) => void;
  onDeleteGame: (game: Game) => void;
}

export default function GameScoreModal({ open, onClose, selectedGame, users, onAssignPoints, onDeleteGame }: GameScoreModalProps) {
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
      <Modal open={open} onClose={onClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 }}>
          {selectedGame && (
            <>
              <Box sx={{ backgroundImage: `url(${selectedGame.cover})`, backgroundSize: "cover", backgroundPosition: "center", height: "150px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>{selectedGame.name}</Typography>
              </Box>
              {users.map(user => (
                <Button key={user.id} variant="contained" color="primary" fullWidth sx={{ mt: 1 }} onClick={() => handleAssignPoints(user.id, user.name)}>
                  {user.name} +10 Puntos
                </Button>
              ))}
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 1 }} onClick={handleDelete}>
                Quitar juego
              </Button>
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
