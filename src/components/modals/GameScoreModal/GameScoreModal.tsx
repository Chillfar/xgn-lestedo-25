import { useState, SyntheticEvent } from "react";
import { Modal, Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { Game, User } from "../../../constants/initialData";
import { modalBoxSx, closeButtonStyle, coverBoxSx, titleTextSx, buttonSx } from "./GameScoreModal.styles";
import PredictionsSection from "./PredictionsSection";
import useFirestorePredictions from "../../../hooks/useFirestorePredictions";

interface GameScoreModalProps {
  open: boolean;
  onClose: () => void;
  selectedGame: Game | null;
  users: User[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  authenticatedPlayerId: number | null;
  onAssignPoints: (userId: number) => void;
  onDeleteGame: (game: Game) => void;
  playedGames: string[];
  activeGame: string | null;
}

export default function GameScoreModal({
  open,
  onClose,
  selectedGame,
  users,
  isAuthenticated,
  isAdmin,
  authenticatedPlayerId,
  onAssignPoints,
  onDeleteGame,
  playedGames,
  activeGame,
}: GameScoreModalProps) {
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "info">("success");

  const { predictions, submitPrediction } = useFirestorePredictions(
    open && selectedGame ? selectedGame.name : null
  );

  const handleAssignPoints = (userId: number, userName: string) => {
    onAssignPoints(userId);
    setToastSeverity("success");
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

  const handleSubmitPrediction = async (predictorId: number, predictedWinnerId: number) => {
    try {
      await submitPrediction(predictorId, predictedWinnerId);
      const winner = users.find(u => u.id === predictedWinnerId);
      setToastSeverity("info");
      setToastMessage(`¡Apuesta registrada! Apostaste por ${winner?.name} 🎯`);
    } catch (e: any) {
      console.error("Error inside submitPrediction:", e);
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
        <Box sx={{ ...modalBoxSx, maxHeight: "90vh", overflowY: "auto" }}>
          <div onClick={onClose} style={closeButtonStyle}>✕</div>
          {selectedGame && (
            <>
              <Box sx={coverBoxSx(selectedGame.cover)}>
                <Typography variant="h5" sx={titleTextSx}>{selectedGame.name}</Typography>
              </Box>

              {selectedGame && playedGames.includes(selectedGame.name) && (
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', mb: 2 }}>
                  Este juego ya ha sido jugado y puntuado.
                </Typography>
              )}
              {selectedGame && activeGame && activeGame !== selectedGame.name && (
                <Typography variant="body1" sx={{ color: '#ffcc00', textAlign: 'center', mb: 2 }}>
                  Ya hay otro juego activo en esta ronda ({activeGame}).
                </Typography>
              )}

              {isAuthenticated && selectedGame && !playedGames.includes(selectedGame.name) && (!activeGame || activeGame === selectedGame.name) && users.map(user => (
                <Button
                  key={user.id}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={buttonSx}
                  onClick={() => handleAssignPoints(user.id, user.name)}
                >
                  {user.name} +10 Puntos
                </Button>
              ))}

              {isAdmin && (
                <Button variant="contained" color="secondary" fullWidth sx={buttonSx} onClick={handleDelete}>
                  Quitar juego
                </Button>
              )}

              {/* Predictions section */}
              <PredictionsSection
                users={users}
                gameName={selectedGame.name}
                predictions={predictions}
                isAuthenticated={isAuthenticated}
                authenticatedPlayerId={authenticatedPlayerId}
                onSubmitPrediction={handleSubmitPrediction}
              />
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={!!toastMessage}
        autoHideDuration={2500}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastSeverity}
          sx={{
            width: '100%',
            fontSize: '1.1rem',
            backgroundColor: toastSeverity === "success" ? '#33FF57' : '#4fc3f7',
            color: 'black'
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
