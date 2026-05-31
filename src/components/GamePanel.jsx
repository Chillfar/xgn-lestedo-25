import { Rnd } from "react-rnd";
import { Paper, Typography, Grid, Card, CardContent, Button } from "@mui/material";

export default function GamePanel({ games, isMobile, onGameClick, onAddGameClick }) {
  const rndProps = isMobile
    ? { x: 0, y: 840, width: "92%", height: "auto" }
    : { x: 1510, y: 120, width: "19%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  const paperStyle = isMobile
    ? { padding: "16px", backgroundColor: "#1e1e1e", color: "white" }
    : { padding: "16px", backgroundColor: "#1e1e1e", color: "white" };

  return (
    <Rnd default={rndProps} {...rndOptions}>
      <Paper style={paperStyle}>
        <Typography variant="h5" gutterBottom>Selecciona un juego para puntuar</Typography>
        <Button variant="contained" color="secondary" onClick={onAddGameClick} style={{ marginBottom: "10px", width: "100%" }}>
          Añadir Nuevo Juego
        </Button>
        <Grid container spacing={2} style={{ overflowY: "auto", height: "600px", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" }}>
          {games.map((game, index) => (
            <Grid item xs={6} key={index}>
              <Card onClick={() => onGameClick(game)} style={{ cursor: "pointer", textAlign: "center", backgroundColor: "#2a2a2a", color: "white" }}>
                <CardContent>
                  <img src={game.cover} alt={game.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                  <Typography variant="body1" style={{ marginTop: "8px" }}>{game.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Rnd>
  );
}