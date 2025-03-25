import { useState } from "react";
import { Rnd } from "react-rnd";
import { Card, CardContent, Typography, Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const games = [
  { name: "Fortnite", cover: "https://i.3djuegos.com/juegos/8298/fortnite/fotos/ficha/fortnite-5154590.webp" },
  { name: "Fifa", cover: "https://i.3djuegos.com/juegos/19862/ea_sports_fc_25/fotos/ficha/ea_sports_fc_25-5908048.jpg" },
  { name: "Mario Kart", cover: "https://i.3djuegos.com/juegos/14356/mario_kart_8_switch/fotos/ficha/mario_kart_8_switch-3611054.jpg" },
  { name: "Street Fighter", cover: "https://i.3djuegos.com/juegos/18376/fotos/ficha/-5775675.webp" }
];

const savedUsers = [
  { id: 1, name: "Roxo", scores: { "Fortnite": 0, "Fifa": 0, "Mario Kart": 0, "Street Fighter": 0 }, history: [] },
  { id: 2, name: "Noya", scores: { "Fortnite": 0, "Fifa": 0, "Mario Kart": 0, "Street Fighter": 0 }, history: [] },
  { id: 3, name: "Danis", scores: { "Fortnite": 0, "Fifa": 0, "Mario Kart": 0, "Street Fighter": 0 }, history: [] },
  { id: 4, name: "Pablo", scores: { "Fortnite": 0, "Fifa": 0, "Mario Kart": 0, "Street Fighter": 0 }, history: [] }
];

const userColors = {
  Roxo: "#FF5733",
  Noya: "#33FF57",
  Danis: "#3357FF",
  Pablo: "#F3FF33"
};

export default function GameDashboard() {
  const [users, setUsers] = useState(savedUsers);
  const [selectedGame, setSelectedGame] = useState(null);
  const [round, setRound] = useState(0);

  const handleOpenModal = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const handleAssignPoints = (userId) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          const newScore = user.scores[selectedGame.name] + 10;
          const newTotal = Object.values(user.scores).reduce((acc, score) => acc + score, 0) + 10;
          const updatedHistory = [...user.history];
          updatedHistory[round] = newTotal;
          return { ...user, scores: { ...user.scores, [selectedGame.name]: newScore }, history: updatedHistory };
        }
        return user;
      });
    });
  };

  const nextRound = () => {
    setRound(prev => prev + 1);
    setUsers(prevUsers => prevUsers.map(user => ({
      ...user,
      history: [...user.history, Object.values(user.scores).reduce((acc, score) => acc + score, 0)]
    })));
  };

  const chartData = {
    labels: users[0]?.history.map((_, index) => `Ronda ${index + 1}`) || [],
    datasets: users.map(user => ({
      label: user.name,
      data: user.history,
      borderColor: userColors[user.name],
      backgroundColor: userColors[user.name]
    }))
  };

  return (
    <Container maxWidth={false} style={{ padding: "16px", backgroundColor: "#121212", color: "white", minHeight: "100vh", width: "100vw" }}>
      <Typography variant="h4" align="center" gutterBottom>
        XGN Lestedo '25
      </Typography>
      
      <Rnd default={{ x: 20, y: 20, width: "60%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography variant="h5" gutterBottom>Ranking</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white" }}><strong>Jugador</strong></TableCell>
                {games.map(game => (
                  <TableCell key={game.name} style={{ color: "white" }}><strong>{game.name}</strong></TableCell>
                ))}
                <TableCell style={{ color: "white" }}><strong>Puntos Totales</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell style={{ color: "white" }}>{user.name}</TableCell>
                  {games.map(game => (
                    <TableCell key={game.name} style={{ color: "white" }}>{user.scores[game.name]}</TableCell>
                  ))}
                  <TableCell style={{ color: "white" }}>{Object.values(user.scores).reduce((acc, score) => acc + score, 0)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Rnd>

      {/* Panel de Juegos */}
      <Rnd default={{ x: 20, y: 20, width: "60%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography variant="h5" gutterBottom>Selecciona un juego para puntuar</Typography>
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
      </Rnd>
        
      {/* Panel de Evolución */}
      <Rnd default={{ x: 20, y: 20, width: "60%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
            <Typography variant="h5" gutterBottom>Evolución de Puntos</Typography>
            <Line data={chartData} />
            <Button variant="contained" color="secondary" fullWidth onClick={nextRound} sx={{ mt: 2 }}>Siguiente Ronda</Button>
          </Paper>
      </Rnd>

      {/* Panel del Mapa */}
      <Rnd default={{ x: 20, y: 20, width: "60%", height: "auto" }}>
        <Paper style={{ padding: "16px", textAlign: "center", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography variant="h5" gutterBottom>Ubicación de LAN party</Typography>
          <iframe
            title="Ubicación"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCQp9lnjB31CyDBNg49fo4oz15n976iz2Q&q=Lugar+A+Picota,+5,+15881+Troitomil,+A+Coruña"
          ></iframe>
        </Paper>
      </Rnd>

      {/* Modal para asignar puntos */}
      <Modal open={!!selectedGame} onClose={handleCloseModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 }}>
          {selectedGame && (
            <>
              <Box sx={{ backgroundImage: `url(${selectedGame.cover})`, backgroundSize: "cover", backgroundPosition: "center", height: "150px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>{selectedGame.name}</Typography>
              </Box>
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
