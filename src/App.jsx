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

const initialUsers = [
  { id: 1, name: "Chillfar", rol: "Rol: Informático de guardia y DJ espiritual del grupo.", description: "El hacker de la LAN y alma de fiesta digital. Fan del Fortnite, amante del software libre (y del no tan libre también). Su lema: “Si se puede crackear, se puede disfrutar“. Sueña con vivir en Ibiza, entre beats de house y scripts en Python. Tiene más pelis en el disco duro que Netflix en la nube.",
    cover: '/xgn-lestedo-25/roxo.JPG', scores: {}, history: [] },
  { id: 2, name: "El Noyas", rol: "Rol: Embajador de Nintendo y evangelizador oficial de la Switch.", description: "Francotirador honorífico del grupo… aunque el blanco suele salir ileso por pura suerte. Fan incondicional de Nintendo, especialmente de Zelda: si no ha hablado de Hyrule hoy, es que está enfermo. En misión personal para que todos se compren la Switch 2 (“porque esta vez sí que va a ser la buena”). Apunta con el sniper como Link con los ojos vendados, pero eso sí, con estilo.",
    cover: '/xgn-lestedo-25/noyas.JPG', scores: {}, history: [] },
  { id: 3, name: "Goku", rol: "Rol: Maestro de los Soulslike y gurú de las tecnologías de pantalla.", description: "El guerrero esporádico de la LAN, pero cuando aparece, deja el sofá para siempre. Dueño orgulloso de una PS5, sufre (y disfruta) con juegos como Dark Souls, Xenoblade y Elden Ring. No siempre se pasa por la XGN, pero a la de XGN Lestedo no falta ni loco: allí es territorio sagrado. Amante de las teles con más siglas que un cohete: si no tiene 4K, HDR10 y Dolby Vision, no es digno de sus ojos.",
    cover: '/xgn-lestedo-25/danis.jpg', scores: {}, history: [] },
  { id: 4, name: "Eras", rol: "Rol: Guía oficial de excursiones y consejero gastronómico.", description: "El explorador del grupo, tanto en el juego como en la vida real. Juega al Fortnite cuando no está perdido en “The Forest” (literalmente). Dueño de la cuenta @gallegoviajero, conoce más rincones de Galicia que Google Maps. Experto en senderismo, comida rica y escapadas rurales con encanto. Si desaparece durante la LAN, probablemente esté buscando una ruta en Wikiloc o un pulpo á feira.",
    cover: '/xgn-lestedo-25/pablo.JPG', scores: {}, history: [] }
];

const userColors = {
  Chillfar: "#FF5733",
  ElNoyas: "#33FF57",
  Goku: "#3357FF",
  Eras: "#F3FF33"
};

export default function GameDashboard() {
  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("games");
    return savedGames ? JSON.parse(savedGames) : initialGames;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });  

  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newGameName, setNewGameName] = useState("");
  const [newGameCover, setNewGameCover] = useState("");
  const [round, setRound] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openNewGameModal, setOpenNewGameModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [gifUrl, setGifUrl] = useState("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmd4M3pnMXhoeW95aXJvamg0dWhydTdkZGp4bjN1cGF1bjgwc3g0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5tiNlHkA1WdUh3jRDW/giphy.gif");
  const [countdown, setCountdown] = useState("");
  const [videoCountdownModalOpen, setVideoCountdownModalOpen] = useState(false);
  const [videoInaugurationModalOpen, setVideoInaugurationModalOpen] = useState(false);

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

  useEffect(() => {
    const targetDate = new Date("2025-05-09T23:59:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 31000 && distance > -800) {
        setVideoCountdownModalOpen(true);
        localStorage.setItem("countdown", '');
      } else if (distance <= -800) {
        clearInterval(interval);
        setVideoCountdownModalOpen(false);
        if(localStorage.getItem('countdown') === '¡Party inaugurada!') {
          setCountdown("¡Party inaugurada!");
          return;
        }

        setVideoInaugurationModalOpen(true);
        setCountdown("¡Party inaugurada!");
        localStorage.setItem("countdown", '¡Party inaugurada!');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addNewGame = () => {
    if (newGameName && newGameCover) {
      const newGame = { name: newGameName, cover: newGameCover };
      setGames([...games, newGame]);
      setNewGameName("");
      setNewGameCover("");
      setOpenNewGameModal(false);
    }
  };

  const deleteGame = (selectedGame) => {
    setGames(games.filter(game => game.name !== selectedGame.name));
    setSelectedGame(null);
    setOpenNewGameModal(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRandomGif();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const video = document.getElementById("intro-video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => console.log("Autoplay prevented"));
      video.onended = () => setLoading(false);
    }
  }, []);

  const handleOpenGamesModal = (game) => {
    setSelectedGame(game);
  };

  const handleCloseGamesModal = () => {
    setSelectedGame(null);
  };

  const handleUserModal = (user) => {
    setSelectedUser(user);
  };

  const handleCloseUserModal = () => {
    setSelectedUser(null);
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

  const resetData = () => {
    localStorage.setItem("games", JSON.stringify(initialGames));
    localStorage.setItem("users", JSON.stringify(initialUsers));
    window.location.reload();
    setOpenResetModal(false);
  };

  const handleOpenResetModal = () => {
    setOpenResetModal(true);
  };

  const handleCloseResetModal = () => {
    setOpenResetModal(false);
  };

  const chartData = {
    labels: Array.isArray(users) && users.length > 0 ? users[0].history.map((_, index) => `Ronda ${index + 1}`) : [],
    datasets: Array.isArray(users) ? users.map(user => ({
      label: user.name,
      data: user.history || [],
      borderColor: userColors[user.name] || "#FFFFFF",
      backgroundColor: userColors[user.name] || "#FFFFFF"
    })) : []
  };

  // Descomentar para activar video intro
  if (loading) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video id="intro-video" width="100%" height="100%" autoPlay muted playsInline>
          <source src="/xgn-lestedo-25/Imaginary Neon Cube_free.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <Container maxWidth={false} style={{ padding: "16px", backgroundColor: "#121212", color: "white", minHeight: "100vh", width: "100vw" }}>
      <div style={{ width: "100%", height: "2px", backgroundColor: "#F363FA", position: "fixed", top: 0, left: 0, zIndex: 10000 }}></div>
      <div style={{ width: "10%", textAlign: "left", marginLeft:"25px", marginBottom: "20px", position: "relative", zIndex: 9999 }}>
        <img src="/xgn-lestedo-25/logo.png" alt="Logo" style={{ maxWidth: "200px" }} />
      </div>


      {/* Panel de Contador */}
      <Rnd default={{ x: 1600, y: 35, width: "14%", height: "auto" }}>
        <Paper 
          // onClick={() => setVideoModalOpen(true)}
          style={{ 
            // cursor: "pointer",
            padding: "16px", 
            background: "linear-gradient(135deg, #ff4081, #ff80ab)", 
            color: "white", 
            textAlign: "center", 
            borderRadius: "12px", 
            boxShadow: "0 4px 10px rgba(255, 64, 129, 0.5)" 
          }}
        >
          <Typography variant="h6" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{countdown}</Typography>
        </Paper>
      </Rnd>

      {/* Modal de Countdown */}
      <Modal open={videoCountdownModalOpen} onClose={() => setVideoModalOpen(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/yS0Zz-D7pfA?autoplay=1"
              title="Final Countdown Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
        </Box>
      </Modal>

      {/* Modal de Inauguración */}
      <Modal open={videoInaugurationModalOpen} onClose={() => setVideoInaugurationModalOpen(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/gCYcHz2k5x0?si=n7ZUrSRdWn8LriXS&start=43&autoplay=1"
              title="Final Inauguración Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
        </Box>
      </Modal>

      {/* Panel de Ranking */}
      <Rnd default={{ x: 40, y: 120, width: "40%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography style={{ textAlign: "center"}} variant="h5" gutterBottom>Ranking</Typography>
          <Button variant="outlined" color="secondary" size="small" style={{ position: "absolute", right: "15px", top: "20px" }} onClick={() => handleOpenResetModal(true)}>Resetear datos</Button>

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
                  <TableCell style={{ color: "white", cursor: "pointer" }} onClick={() => handleUserModal(user)}>{user.name}</TableCell>
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
          <Button variant="contained" color="secondary" onClick={() => setOpenNewGameModal(true)} style={{ marginBottom: "10px", width: "100%" }}>
            Añadir Nuevo Juego
          </Button>
          <Grid container spacing={2} style={{ overflowY: "auto", height: "600px", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" }}>
            {games.map((game, index) => (
              <Grid item xs={6} key={index}>
                <Card onClick={() => handleOpenGamesModal(game)} style={{ cursor: "pointer", textAlign: "center", backgroundColor: "#2a2a2a", color: "white" }}>
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
      <Modal open={!!selectedGame} onClose={handleCloseGamesModal}>
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
              <Button variant="contained" color="secondary" fullWidth sx={{ mt: 1 }} onClick={() => deleteGame(selectedGame)}>
                Quitar juego
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal datos jugador */}
      <Modal open={!!selectedUser} onClose={handleCloseUserModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 }}>
          {selectedUser && selectedUser.name === 'Chillfar' && (
            <>
              <Box sx={{ backgroundImage: `url(${selectedUser.cover})`, backgroundSize: "cover", backgroundPositionY: "top !important", height: "150px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>{selectedUser.name}</Typography>
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>{selectedUser.description}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{selectedUser.rol}</Typography>
              
            </>
          )}

          {selectedUser && selectedUser.name === 'Eras' && (
            <>
              <Box sx={{ backgroundImage: `url(${selectedUser.cover})`, backgroundSize: "cover", backgroundPosition: "center", height: "150px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>{selectedUser.name}</Typography>
              </Box>

              <Typography variant="body1" sx={{ mt: 2 }}>{selectedUser.description}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{selectedUser.rol}</Typography>
            </>
          )}

          {selectedUser && selectedUser.name === 'Goku' && (
            <>
              <Box sx={{ backgroundImage: `url(${selectedUser.cover})`, backgroundSize: "cover", backgroundPositionY: "top", height: "150px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>{selectedUser.name}</Typography>
              </Box>

              <Typography variant="body1" sx={{ mt: 2 }}>{selectedUser.description}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{selectedUser.rol}</Typography>
            </>
          )}

          {selectedUser && selectedUser.name === 'El Noyas' && (
            <>
              <Box sx={{ backgroundImage: `url(${selectedUser.cover})`, backgroundSize: "cover", backgroundPosition: "center", height: "150px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>{selectedUser.name}</Typography>
              </Box>

              <Typography variant="body1" sx={{ mt: 2 }}>{selectedUser.description}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>{selectedUser.rol}</Typography>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal para agregar juegos */}
      <Modal open={openNewGameModal} onClose={() => setOpenNewGameModal(false)}>
        <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#1e1e1e", padding: "20px", color: "white", borderRadius: "8px" }}>
          <Typography variant="h6">Añadir nuevo juego</Typography>
          <TextField label="Nombre del juego" fullWidth margin="normal" value={newGameName} onChange={(e) => setNewGameName(e.target.value)} style={{ backgroundColor: "white" }} />
          <TextField label="URL de la portada" fullWidth margin="normal" value={newGameCover} onChange={(e) => setNewGameCover(e.target.value)} style={{ backgroundColor: "white" }} />
          <Button variant="contained" color="primary" fullWidth onClick={addNewGame} style={{ marginTop: "10px" }}>Agregar Juego</Button>
        </Box>
      </Modal>

      {/* Modal reseteo de datos */}
      <Modal open={openResetModal} onClose={handleCloseResetModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="body1">¿Seguro que deseas borrar los datos guardados?</Typography>
          <Button variant="contained" color="primary" fullWidth onClick={resetData} style={{ marginTop: "10px" }}>Borrar datos</Button>
        </Box>
      </Modal>
    </Container>
  );
}
