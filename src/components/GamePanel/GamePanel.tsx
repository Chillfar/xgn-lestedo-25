import { Rnd } from "react-rnd";
import { Paper, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Game } from "../../constants/initialData";
import { paperStyle, buttonStyle, gridContainerStyle, cardStyle, imageStyle, typographyStyle, mobileContainerStyle } from "./GamePanel.styles";

interface GamePanelProps {
  games: Game[];
  isMobile: boolean;
  isAuthenticated: boolean;
  onGameClick: (game: Game) => void;
  onAddGameClick: () => void;
}

export default function GamePanel({ games, isMobile, isAuthenticated, onGameClick, onAddGameClick }: GamePanelProps) {
  const rndProps = isMobile
    ? { x: 0, y: 840, width: "92%", height: "auto" }
    : { x: 1510, y: 120, width: "19%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  const currentPaperStyle = isMobile ? paperStyle : paperStyle;

  const content = (
    <>
      <Paper style={currentPaperStyle}>
        <Typography variant="h5" gutterBottom>Selecciona un juego para puntuar</Typography>
        <Button className="cancel-drag" variant="contained" color="secondary" onClick={onAddGameClick} style={{ ...buttonStyle, visibility: isAuthenticated ? "visible" : "hidden" }}>
          Añadir Nuevo Juego
        </Button>
        <Grid container spacing={2} style={gridContainerStyle}>
          {games.map((game, index) => (
            <Grid item xs={6} key={index}>
              <Card className="cancel-drag" onClick={() => onGameClick(game)} style={cardStyle}>
                <CardContent>
                  <img src={game.cover} alt={game.name} style={imageStyle} loading="lazy" />
                  <Typography variant="body1" style={typographyStyle}>{game.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );

  return isMobile ? (
    <div style={mobileContainerStyle}>
      {content}
    </div>
  ) : (
    <Rnd default={rndProps} {...rndOptions} cancel="button, .cancel-drag">
      {content}
    </Rnd>
  );
}
