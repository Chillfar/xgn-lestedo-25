import { useState } from "react";
import { Card, CardContent, Typography, Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, Button } from "@mui/material";

const games = [
  { name: "Fortnite", cover: "https://i.3djuegos.com/juegos/8298/fortnite/fotos/ficha/fortnite-5154590.webp" },
  { name: "Fifa", cover: "https://i.3djuegos.com/juegos/19862/ea_sports_fc_25/fotos/ficha/ea_sports_fc_25-5908048.jpg" },
  { name: "Mario Kart", cover: "https://i.3djuegos.com/juegos/14356/mario_kart_8_switch/fotos/ficha/mario_kart_8_switch-3611054.jpg" },
  { name: "Street Fighter", cover: "https://i.3djuegos.com/juegos/18376/fotos/ficha/-5775675.webp" }
];

const savedUsers = [
  { id: 1, name: "Roxo", scores: { "Fortnite": 0, "Fifa": 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 2, name: "Noya", scores: { "Fortnite": 0, "Fifa": 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 3, name: "Danis", scores: { "Fortnite": 0, "Fifa": 0, "Mario Kart": 0, "Street Fighter": 0 } },
  { id: 4, name: "Pablo", scores: { "Fortnite": 0, "Fifa": 0, "Mario Kart": 0, "Street Fighter": 0 } }
];

export default function GameDashboard() {
  const [users, setUsers] = useState(savedUsers);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleOpenModal = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const handleAssignPoints = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...user, scores: { ...user.scores, [selectedGame.name]: user.scores[selectedGame.name] + 10 } }
          : user
      ).sort((a, b) =>
        Object.values(b.scores).reduce((acc, score) => acc + score, 0) -
        Object.values(a.scores).reduce((acc, score) => acc + score, 0)
      )
    );
  };

  return (
    <Container maxWidth="lg" style={{ padding: "16px", backgroundColor: "#121212", color: "white", minHeight: "100vh" }}>
      <Typography variant="h4" align="center" gutterBottom>
        XGN Lestedo '25
      </Typography>
      
      <Grid container spacing={3}>
        {/* Panel de Ranking */}
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
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
          <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
            <Typography variant="h5" gutterBottom>Juegos</Typography>
            <Grid container spacing={2}>
              {games.map(game => (
                <Grid item xs={6} key={game.name}>
                  <Card onClick={() => handleOpenModal(game)} style={{ cursor: "pointer", textAlign: "center", backgroundColor: "#2a2a2a", color: "white" }}>
                    <CardContent>
                      <img src={game.cover} alt={game.name} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                      <Typography variant="body1" style={{ marginTop: "8px" }}>{game.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Panel del Mapa */}
        <Grid item xs={12}>
          <Paper style={{ padding: "16px", textAlign: "center", backgroundColor: "#1e1e1e", color: "white" }}>
            <Typography variant="h5" gutterBottom>Ubicación del Torneo</Typography>
            <iframe
              title="Ubicación"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Lugar+A+Picota,+5,+15881+Troitomil,+A+Coruña"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>

      {/* Modal para asignar puntos */}
      <Modal open={!!selectedGame} onClose={handleCloseModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 }}>
          {selectedGame && (
            <>
              <Box sx={{ backgroundImage: `url(${selectedGame.cover})`, backgroundSize: "cover", backgroundPosition: "center", height: "150px", borderRadius: "8px" }} />
              <Typography variant="h6" align="center" gutterBottom>{selectedGame.name}</Typography>
              {users.map(user => (
                <Button key={user.id} variant="contained" color="primary" fullWidth sx={{ mt: 1 }} onClick={() => handleAssignPoints(user.id)}>
                  {user.name} +10 Puntos
                </Button>
              ))}
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}
