import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Card, CardContent, Typography, Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, Button, TextField } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const initialGames = [
  { name: "Fortnite", cover: "https://i.3djuegos.com/juegos/8298/fortnite/fotos/ficha/fortnite-5154590.webp" },
  { name: "Fifa", cover: "https://i.3djuegos.com/juegos/19862/ea_sports_fc_25/fotos/ficha/ea_sports_fc_25-5908048.jpg" },
  { name: "Mario Kart", cover: "https://i.3djuegos.com/juegos/14356/mario_kart_8_switch/fotos/ficha/mario_kart_8_switch-3611054.jpg" },
  { name: "Street Fighter", cover: "https://i.3djuegos.com/juegos/18376/fotos/ficha/-5775675.webp" }
];

const savedUsers = [
  { id: 1, name: "Roxo", scores: {}, history: [] },
  { id: 2, name: "Noya", scores: {}, history: [] },
  { id: 3, name: "Danis", scores: {}, history: [] },
  { id: 4, name: "Pablo", scores: {}, history: [] }
];

const userColors = {
  Roxo: "#FF5733",
  Noya: "#33FF57",
  Danis: "#3357FF",
  Pablo: "#F3FF33"
};

export default function GameDashboard() {
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("games");
    return savedGames ? JSON.parse(savedGames) : initialGames;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : savedUsers;
  });

  const [selectedGame, setSelectedGame] = useState(null);
  const [newGameName, setNewGameName] = useState("");
  const [newGameCover, setNewGameCover] = useState("");
  const [round, setRound] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [gifUrl, setGifUrl] = useState("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmd4M3pnMXhoeW95aXJvamg0dWhydTdkZGp4bjN1cGF1bjgwc3g0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5tiNlHkA1WdUh3jRDW/giphy.gif");

  useEffect(() => {
    const previousGames = localStorage.getItem("games");
    if (JSON.stringify(games) !== previousGames) {
      localStorage.setItem("games", JSON.stringify(games));
    }
  }, [games]);

  useEffect(() => {
    const previousUsers = localStorage.getItem("users");
    if (JSON.stringify(users) !== previousUsers) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const addNewGame = () => {
    if (newGameName && newGameCover) {
      const newGame = { name: newGameName, cover: newGameCover };
      setGames([...games, newGame]);
      setNewGameName("");
      setNewGameCover("");
      setOpenModal(false);
    }
  };
  
  const fetchRandomGif = async () => {
    try {
      const response = await fetch("https://api.giphy.com/v1/gifs/random?api_key=JD0bZoUQ3cz56tCr8ndeAbteNP8SzTce&tag=fortnite");
      const data = await response.json();
      setGifUrl(data.data.images.original.url);
    } catch (error) {
      console.error("Error fetching GIF:", error);
    }
  };

  // Descomentar para activar el cambio automático de GIFs
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchRandomGif();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const video = document.getElementById("intro-video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => console.log("Autoplay prevented"));
      video.onended = () => setLoading(false);
    }
  }, []);

  const handleOpenModal = (game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const handleAssignPoints = (userId) => {
    if (!selectedGame) return;
  
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user.id === userId) {
          const newScore = (user.scores[selectedGame.name] || 0) + 10;
          const newTotal = Object.values(user.scores).reduce((acc, score) => acc + score, 0) + 10;
          const updatedHistory = [...user.history];
          updatedHistory[round] = newTotal;
          return { ...user, scores: { ...user.scores, [selectedGame.name]: newScore }, history: updatedHistory };
        }
        return user;
      });
  
      // Ordenar por puntos totales de mayor a menor
      return updatedUsers.sort((a, b) => {
        const totalA = Object.values(a.scores).reduce((acc, score) => acc + score, 0);
        const totalB = Object.values(b.scores).reduce((acc, score) => acc + score, 0);
        return totalB - totalA;
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

  // Descomentar para activar video intro
  // if (loading) {
  //   return (
  //     <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
  //       <video id="intro-video" width="100%" height="100%" autoPlay muted playsInline>
  //         <source src="/Imaginary Neon Cube_free.mp4" type="video/mp4" />
  //       </video>
  //     </div>
  //   );
  // }

  return (
    <Container maxWidth={false} style={{ padding: "16px", backgroundColor: "#121212", color: "white", minHeight: "100vh", width: "100vw" }}>
      <div style={{ width: "100%", height: "2px", backgroundColor: "#F363FA", position: "fixed", top: 0, left: 0, zIndex: 10000 }}></div>
      <div style={{ textAlign: "left", marginLeft:"25px", marginBottom: "20px", position: "relative", zIndex: 9999 }}>
        <img src="/logo.png" alt="Logo" style={{ maxWidth: "200px" }} />
      </div>

      {/* Panel de Ranking */}
      <Rnd default={{ x: 40, y: 120, width: "40%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography style={{ textAlign: "center"}} variant="h5" gutterBottom>Ranking</Typography>
          <Table style={{ overflowX: "scroll"}}>
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
        
      {/* Panel de Evolución */}
      <Rnd default={{ x: 820, y: 120, width: "24%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
            <Typography variant="h5" gutterBottom>Evolución de Puntos</Typography>
            <Line data={chartData} />
            <Button variant="contained" color="secondary" fullWidth onClick={nextRound} sx={{ mt: 2 }}>Siguiente Ronda</Button>
          </Paper>
      </Rnd>

      {/* Panel de GIPHY */}
      <Rnd default={{ x: 1300, y: 120, width: "10%", height: "auto" }}>
        <img src={gifUrl} alt="GIF" style={{ width: "100%", cursor: "pointer" }} onClick={fetchRandomGif} />
      </Rnd>

      {/* Panel de Spotify */}
      <Rnd default={{ x: 820, y: 480, width: "24%", height: "auto" }}>
        <iframe style={{ border: "none" }}
          src="https://open.spotify.com/embed/playlist/3YvgAU67nQK5XoaIP0aqSd?utm_source=generator" 
          width="100%" 
          height="376"
          allowfullscreen=""
          allow="autoplay;
            clipboard-write;
            encrypted-media;
            fullscreen;
            picture-in-picture"
          loading="lazy">
        </iframe>
      </Rnd>

      {/* Panel de Juegos */}
      <Rnd default={{ x: 1510, y: 120, width: "19%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography variant="h5" gutterBottom>Selecciona un juego para puntuar</Typography>
          {/* Botón para abrir modal de agregar juego */}
          <Button variant="contained" color="secondary" onClick={() => setOpenModal(true)} style={{ marginBottom: "10px", width: "100%" }}>
            Añadir Nuevo Juego
          </Button>
          <Grid container spacing={2} style={{ marginTop: "20px", overflowY: "auto", height: "600px", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" }}>
            {games.map((game, index) => (
              <Grid item xs={6} key={index}>
                <Card onClick={() => setSelectedGame(game)} style={{ cursor: "pointer", textAlign: "center", backgroundColor: "#2a2a2a", color: "white" }}>
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

      {/* Panel de Vídeos */}
      <Rnd default={{ x: 40, y: 480, width: "40%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography variant="h5" gutterBottom>Party Vídeos</Typography>
          <iframe width="100%" height="300" src="https://www.youtube.com/embed/videoseries?si=yt9cPirnyjTM-f3_&amp;list=PL2ihC4aJWkWpD8C2MJ62Cx80abK9l-I4L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </Paper>
      </Rnd>

      {/* Panel del Mapa */}
      <Rnd default={{ x: 1300, y: 332, width: "10%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography variant="h5" gutterBottom>Ubicación</Typography>
          <iframe
            title="Ubicación"
            width="100%"
            height="450"
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

      {/* Modal para agregar juegos */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#1e1e1e", padding: "20px", color: "white", borderRadius: "8px" }}>
          <Typography variant="h6">Añadir nuevo juego</Typography>
          <TextField label="Nombre del juego" fullWidth margin="normal" value={newGameName} onChange={(e) => setNewGameName(e.target.value)} style={{ backgroundColor: "white" }} />
          <TextField label="URL de la portada" fullWidth margin="normal" value={newGameCover} onChange={(e) => setNewGameCover(e.target.value)} style={{ backgroundColor: "white" }} />
          <Button variant="contained" color="primary" fullWidth onClick={addNewGame} style={{ marginTop: "10px" }}>Agregar Juego</Button>
        </Box>
      </Modal>
    </Container>
  );
}
