import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

const games = [
  { name: "Fortnite", cover: "https://i.3djuegos.com/juegos/8298/fortnite/fotos/ficha/fortnite-5154590.webp" },
  { name: "Fifa", cover: "https://i.3djuegos.com/juegos/19862/ea_sports_fc_25/fotos/ficha/ea_sports_fc_25-5908048.jpg" },
  { name: "Mario Kart", cover: "https://i.3djuegos.com/juegos/14356/mario_kart_8_switch/fotos/ficha/mario_kart_8_switch-3611054.jpg" },
  { name: "Street Fighter", cover: "https://i.3djuegos.com/juegos/18376/fotos/ficha/-5775675.webp" }
];

const initialUsers = [
  { id: 1, name: "Jugador 1", scores: { Fortnite: 0, Fifa: 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 2, name: "Jugador 2", scores: { Fortnite: 0, Fifa: 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 3, name: "Jugador 3", scores: { Fortnite: 0, Fifa: 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 4, name: "Jugador 4", scores: { Fortnite: 0, Fifa: 0, "Mario Kart": 0, "Street Fighter": 0 } },
];

export default function GameDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error obteniendo la ubicación", error);
      }
    );
  }, []);

  const updatePoints = (userId, game, points) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, scores: { ...user.scores, [game]: user.scores[game] + points } }
        : user
    ));
  };

  return (
    <Container maxWidth="lg" style={{ padding: "16px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Torneo de Videojuegos
      </Typography>
      
      <Grid container spacing={3}>
        {/* Panel de Ranking */}
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: "16px" }}>
            <Typography variant="h5" gutterBottom>Ranking</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Jugador</strong></TableCell>
                  <TableCell><strong>Puntos Totales</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{Object.values(user.scores).reduce((acc, score) => acc + score, 0)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        
        {/* Panel de Juegos */}
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: "16px" }}>
            <Typography variant="h5" gutterBottom>Juegos</Typography>
            <Grid container spacing={2}>
              {games.map(game => (
                <Grid item xs={6} key={game.name}>
                  <Card>
                    <CardContent style={{ textAlign: "center" }}>
                      <img src={game.cover} alt={game.name} style={{ width: "100%", borderRadius: "8px" }} />
                      <Typography variant="body1" style={{ marginTop: "8px" }}>{game.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        
        {/* Panel de Ubicación */}
        <Grid item xs={12}>
          <Paper style={{ padding: "16px", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>Ubicación del Torneo</Typography>
            {location ? (
              <iframe
                width="100%"
                height="300"
                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCQp9lnjB31CyDBNg49fo4oz15n976iz2Q&center=${location.lat},${location.lng}&zoom=15`}
                allowFullScreen
              ></iframe>
            ) : (
              <Typography variant="body1">Obteniendo ubicación...</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
