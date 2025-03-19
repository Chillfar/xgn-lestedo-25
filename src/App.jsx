import { useState } from "react";
import { Card, CardContent, Typography, Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, Button } from "@mui/material";

const games = [
  { name: "Fortnite", cover: "https://i.3djuegos.com/juegos/8298/fortnite/fotos/ficha/fortnite-5154590.webp" },
  { name: "Fifa", cover: "https://i.3djuegos.com/juegos/19862/ea_sports_fc_25/fotos/ficha/ea_sports_fc_25-5908048.jpg" },
  { name: "Mario Kart", cover: "https://i.3djuegos.com/juegos/14356/mario_kart_8_switch/fotos/ficha/mario_kart_8_switch-3611054.jpg" },
  { name: "Street Fighter", cover: "https://i.3djuegos.com/juegos/18376/fotos/ficha/-5775675.webp" }
];

const initialUsers = [
  { id: 1, name: "Roxo", scores: { Fortnite: 0, Fifa: 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 2, name: "Noya", scores: { Fortnite: 0, Fifa: 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 3, name: "Danis", scores: { Fortnite: 0, Fifa: 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 4, name: "Pablo", scores: { Fortnite: 0, Fifa: 0, "Mario Kart": 0, "Street Fighter": 0 } },
];

export default function GameDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleOpenModal = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const handleAssignPoints = (userId) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user =>
        user.id === userId
          ? { ...user, scores: { ...user.scores, [selectedGame.name]: user.scores[selectedGame.name] + 10 } }
          : user
      );
      return updatedUsers.sort((a, b) => 
        Object.values(b.scores).reduce((acc, score) => acc + score, 0) -
        Object.values(a.scores).reduce((acc, score) => acc + score, 0)
      );
    });
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
                  <Card onClick={() => handleOpenModal(game)} style={{ cursor: "pointer" }}>
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
            <iframe
              width="100%"
              height="300"
              src="https://www.google.com/maps/embed/v1/place?key=TU_API_KEY&q=Lugar+A+Picota,5,15881+Troitomil,A+Coruña"
              allowFullScreen
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Modal para asignación de puntos */}
      <Modal open={!!selectedGame} onClose={handleCloseModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "background.paper", p: 4, boxShadow: 24, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Asignar puntos en {selectedGame?.name}</Typography>
          {users.map(user => (
            <Box key={user.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography>{user.name}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleAssignPoints(user.id)}>+10 Puntos</Button>
            </Box>
          ))}
          <Button variant="outlined" onClick={handleCloseModal} fullWidth>Cerrar</Button>
        </Box>
      </Modal>
    </Container>
  );
}