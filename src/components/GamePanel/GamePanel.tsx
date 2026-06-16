import { Paper, Typography, Grid, Card, CardContent, Button, Tooltip } from "@mui/material";
import { Game } from "../../constants/initialData";
import { paperStyle, primaryActionSx, gridContainerStyle, cardStyle, imageStyle, typographyStyle, mobileContainerStyle } from "./GamePanel.styles";

interface GamePanelProps {
  games: Game[];
  activeGame: string | null;
  playedGames: string[];
  isMobile: boolean;
  isAuthenticated: boolean;
  onSelectGame: (game: Game) => void;
  onAddGameClick: () => void;
}

export default function GamePanel({ games, activeGame, playedGames, isMobile, isAuthenticated, onSelectGame, onAddGameClick }: GamePanelProps) {
  const currentPaperStyle = paperStyle;

  const content = (
    <>
      <Paper style={currentPaperStyle} className="liquid-glass">
        <Typography variant="h5" gutterBottom sx={{ cursor: "default" }}>Selecciona un juego para puntuar</Typography>
        <Button variant="contained" onClick={onAddGameClick} sx={{ ...primaryActionSx, visibility: isAuthenticated ? "visible" : "hidden" }}>
          Añadir Nuevo Juego
        </Button>
        <Grid container spacing={2} style={gridContainerStyle} className="game-grid-container">
          <style>{`.game-grid-container::-webkit-scrollbar { display: none; }`}</style>
          {games.map((game, index) => {
            const isPlayed = playedGames.includes(game.name);
            const isActive = activeGame === game.name;
            const isLockedOut = activeGame && !isActive; // If there's an active game and this isn't it, we might still let them view it, but GameScoreModal will block points.

            return (
              <Grid item xs={6} key={index}>
                <Tooltip
                  title={isPlayed ? "Este juego ya ha sido jugado y puntuado" : ""}
                  placement="top"
                  arrow
                  disableHoverListener={!isPlayed}
                >
                  <Card 
                    onClick={() => {
                      if (!isPlayed) onSelectGame(game);
                    }} 
                    style={{
                      ...cardStyle, 
                      opacity: isPlayed ? 0.4 : 1,
                      cursor: isPlayed ? 'not-allowed' : 'pointer',
                      border: isActive ? '2px solid #4fc3f7' : undefined,
                      filter: isPlayed ? 'grayscale(100%)' : 'none'
                    }}
                    className={`liquid-glass-card ${!isPlayed ? "game-card-hover" : ""}`}
                  >
                    <CardContent>
                      <img src={game.cover} alt={game.name} style={imageStyle} loading="lazy" />
                      <Typography variant="body1" style={typographyStyle}>{game.name}</Typography>
                    </CardContent>
                  </Card>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );

  if (isMobile) {
    return (
      <div style={mobileContainerStyle}>
        {content}
      </div>
    );
  }

  return content;
}
