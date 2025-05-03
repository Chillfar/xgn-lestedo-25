import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { Card, CardContent, Typography, Grid, Container, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal, Box, Button, TextField } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./App.css";

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

const geekQuotes = [
  "Porque hoy se decide quién es digno de empuñar el ratón legendario.",
  "Porque la conexión LAN es nuestro vínculo sagrado.",
  "Porque los dragones no se matan solos, ¡necesitamos al escuadrón!",
  "Porque hoy no hay respawn en la vida real, pero aquí sí.",
  "Porque nada une más que un GG bien gritado en la cara del rival.",
  "Porque es el único día del año donde comemos pizza sin culpa y matamos zombis con estilo.",
  "Porque nuestras tarjetas gráficas necesitan sentirse vivas.",
  "Porque sin LAN party no hay gloria, solo lag.",
  "Porque el destino del universo gamer depende de esta sesión.",
  "Porque es el día sagrado en que honramos a nuestros ancestros frikis.",
  "Porque solo juntos derrotaremos al jefe final... y al sueño.",
  "Porque el WiFi es para los débiles. Hoy es LAN o nada.",
  "Porque formateamos el PC solo para este día. ¡Con drivers y todo!",
  "Porque el café fluye por nuestras venas como el maná en Azeroth.",
  "Porque el que no juega, ¡castea!",
  "Porque un teclado mecánico es música para nuestros oídos... de acero.",
  "Porque aquí no hay lag, solo decisiones mal tomadas.",
  "Porque el botón de escape hoy no existe.",
  "Porque no hay mejor frag que el que haces delante de tus colegas.",
  "Porque el ventilador suena como un reactor, y eso nos pone.",
  "Porque en este cuarto se mide la verdadera habilidad, no los FPS.",
  "Porque hoy la realidad se pausa y la fantasía se ejecuta.",
  "Porque los NPCs tienen miedo de que entremos al servidor.",
  "Porque solo en una LAN party puedes gritar '¡cura!' y que te oigan de verdad.",
  "Porque el que apaga el router... será desterrado para siempre."
];

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
  const [width, setWidth] = useState(window.innerWidth);
  const [quote, setQuote] = useState("");
  const [openFaksModal, setOpenFaksModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [openTimetableModal, setOpenTimetableModal] = useState(false);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  const handleGenerateQuote = () => {
    const randomIndex = Math.floor(Math.random() * geekQuotes.length);
    const random = geekQuotes[randomIndex];
    setQuote(random);
  };

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;

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
    }, 70000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleGenerateQuote();
    }, 20000);
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

  const skipIntro = () => {
    const video = document.getElementById("intro-video");
    if (video) {
      video.currentTime = video.duration;
      video.pause();
      setLoading(false);
    }
  };

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
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
        <Button variant="contained" color="secondary" onClick={skipIntro} sx={{ mt: 2 }} style={{ zIndex: 10000 }}>Saltar intro</Button>
        <video id="intro-video" width="100%" height="100%" autoPlay muted playsInline>
          <source src="/Imaginary Neon Cube_free.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <Container maxWidth={false} >
      {!isMobile && (<div style={{ width: "100%", height: "2px", backgroundColor: "#F363FA", position: "fixed", top: 0, left: 0, zIndex: 10000 }}></div>)}
      {!isMobile && (<div style={{ width: "10%", textAlign: "left", marginLeft:"25px", marginBottom: "30px", position: "relative", zIndex: 9999 }}>
        <img src="/logo_party_hd-removebg-preview.png" alt="Logo" style={{ maxWidth: "200px", marginTop: "-12px" }} />
      </div>)}
      {isMobile && (<div style={{ width: "10%", textAlign: "center", position: "relative", zIndex: 9999 }}>
        <img src="/logo_party_hd-removebg-preview.png" alt="Logo" style={{ maxWidth: "100px", marginTop: "-12px" }} />
      </div>)}

      {/* Panel Quotes */}
      {!isMobile && (<Rnd default={{ x: 224, y: 30, width: "74%", height: "auto" }} enableResizing={false} disableDragging={true}>
        <div className="flex flex-col items-center justify-center" style={{ padding: "16px", color: "white" }}>
          {quote && (
            <div className="panel-container">
              <div className="panel-text">{quote}</div>
            </div>
          )}
        </div>
      </Rnd>)}

      {/* Panel de Contador */}
      {!isMobile && (<Rnd default={{ x: 1600, y: 35, width: "14%", height: "auto" }}>
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
      </Rnd>)}

      {/* Panel de Contador móvil*/}
      {isMobile && (<Rnd default={{ x: 0, y: 0, width: "92%", height: "auto" }} enableResizing={false} disableDragging={true}>
        <Paper 
          // onClick={() => setVideoModalOpen(true)}
          style={{ 
            // cursor: "pointer",
            padding: "16px", 
            background: "linear-gradient(135deg, #ff4081, #ff80ab)", 
            color: "white", 
            textAlign: "right", 
            paddingRight: "30px",
            borderRadius: "12px", 
            boxShadow: "0 4px 10px rgba(255, 64, 129, 0.5)" 
          }}
        >
          <Typography variant="h6" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{countdown}</Typography>
        </Paper>
      </Rnd>)}

      {/* Panel de FAKs */}
      {!isMobile && (<Rnd default={{ x: 1780, y: -15, width: "5%", height: "auto" }} enableResizing={false} disableDragging={true} onClick={() => setOpenFaksModal(true)}>
        <Paper style={{ padding: "16px", boxShadow: "none", cursor: "pointer", backgroundColor: "transparent", color: "white", textAlign: "center" }}>
          <Typography style={{ fontSize: "1rem", fontWeight: "bold", border: "1px solid #9A26AE" }}>FAKs</Typography>
        </Paper>
      </Rnd>)}

      {/* Modal FAKs */}
      {!isMobile && (<Modal open={openFaksModal} onClose={() => setOpenFaksModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2, height: "85%", overflowY: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e"}}>
          <Box sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>💀 FAKs  LESTEDO LAN PARTY</Typography>
          </Box>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🎟️ <b>¿Hace falta registrarse o puedo aparecer como quien va a misa en Lestedo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Esto no es la romería de San Campio, colega. Si no te registras, no entras. No hay hueco, no hay mesa, y lo único que te vas a llevar es una caminata por el polígono y una empanada triste.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🖥️ <b>¿Qué tengo que llevar?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Tu torre, pantalla, cables, teclado, ratón, regleta, orgullo y paciencia. Y si vienes con un portátil de cuando Fraga era joven, tráete también una vela y una estampita de San Razer a ver si arranca.          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🧠 <b>¿Y si soy malo jugando?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Da igual, aquí aceptamos a mancos, feeders, y hasta al que se compró el LoL por Amazon. Pero prepárate: esto es Galicia, donde los piques duran más que una sobremesa de mariscada. Si pierdes, que sea con arte.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🍕 <b>¿Habrá comida o me llevo una tortilla de Betanzos en el bolsillo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Habrá comida, pero no esperes que la cocine tu abuela. Bocatas, pizzas, snacks... la dieta del gamer de verdad. Si quieres caldo, pulpo o filloas, llama a tu madre. Y no, no hay albariño (de momento).
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🕹️ <b>¿Qué juegos se van a jugar?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Los que levantan pasiones y bajan autoestima: LoL, CS2, Valorant, Rocket League, Age of Empires II (en honor a los veteranos), y alguno más que salga a gritos. Si propones un torneo de FIFA, mejor sal al campo a correr tú.          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🏆 <b>¿Hay premios o solo sufrimiento y olor a Monster caliente?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Hay premios, sí. Y si no ganas nada, al menos te llevas trauma, sueño atrasado y una experiencia que ni el Camino de Santiago. Algún trofeo habrá, pero el verdadero premio es no salir en los memes del grupo.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🛌 <b>¿Puedo dormir allí o tengo que buscar paja en un pajar gallego?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Hay zona para dormir, pero dormirás poco. Entre ronquidos, gritos de victoria y olor a humanidad, descansarás como en una rave rural. Recomendamos antifaz, tapones y una capacidad extrema de adaptación.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            📶 <b>¿Hay buen Internet o esto va por señales de humo desde el Monte do Gozo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Tranquilo, la conexión va fina, como percebe de primera. Pero si abusas con el torrent, se activa el Protocolo Apagón y te desconectamos más rápido que un político en campaña por Lestedo.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🧍 <b>¿Puedo ir solo o es obligatorio traer a mi primo del pueblo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Ven como quieras. Aquí haces colegas en menos de lo que canta un gallo de corral. Eso sí, si vas de sobrado, acabas como los que aparcan en dirección prohibida en Santiago: solo, observado y malquerido.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            🛑 <b>¿Hay normas o esto es como un botellón en el campillo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            Sí, hay normas:
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            - No abuses del Wi-Fi o se te aparece el meigallo digital.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            - No pongas reguetón en altavoces, por respeto a la humanidad.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            - No ocupes más mesa de la que necesitas, que esto no es un pulpeiro.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            - Respeta a todo el mundo, incluso al que juega con mando.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            - Si pierdes, asume tu derrota como buen gallego: y cagate en todos los santos.
          </Typography>
        </Box>
      </Modal>
      )}

      {/* Modal FAKs */}
      {isMobile && (<Modal open={openFaksModal} onClose={() => setOpenFaksModal(false)} style={{ zIndex: 9999 }}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60%", bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2, height: "85%", overflowY: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e"}}>
          <Box sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "10px", paddingBottom: "10px", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>💀 FAKs  LESTEDO LAN PARTY</Typography>
          </Box>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🎟️ <b>¿Hace falta registrarse o puedo aparecer como quien va a misa en Lestedo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Esto no es la romería de San Campio, colega. Si no te registras, no entras. No hay hueco, no hay mesa, y lo único que te vas a llevar es una caminata por el polígono y una empanada triste.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🖥️ <b>¿Qué tengo que llevar?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Tu torre, pantalla, cables, teclado, ratón, regleta, orgullo y paciencia. Y si vienes con un portátil de cuando Fraga era joven, tráete también una vela y una estampita de San Razer a ver si arranca.          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🧠 <b>¿Y si soy malo jugando?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Da igual, aquí aceptamos a mancos, feeders, y hasta al que se compró el LoL por Amazon. Pero prepárate: esto es Galicia, donde los piques duran más que una sobremesa de mariscada. Si pierdes, que sea con arte.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🍕 <b>¿Habrá comida o me llevo una tortilla de Betanzos en el bolsillo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Habrá comida, pero no esperes que la cocine tu abuela. Bocatas, pizzas, snacks... la dieta del gamer de verdad. Si quieres caldo, pulpo o filloas, llama a tu madre. Y no, no hay albariño (de momento).
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🕹️ <b>¿Qué juegos se van a jugar?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Los que levantan pasiones y bajan autoestima: LoL, CS2, Valorant, Rocket League, Age of Empires II (en honor a los veteranos), y alguno más que salga a gritos. Si propones un torneo de FIFA, mejor sal al campo a correr tú.          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🏆 <b>¿Hay premios o solo sufrimiento y olor a Monster caliente?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Hay premios, sí. Y si no ganas nada, al menos te llevas trauma, sueño atrasado y una experiencia que ni el Camino de Santiago. Algún trofeo habrá, pero el verdadero premio es no salir en los memes del grupo.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🛌 <b>¿Puedo dormir allí o tengo que buscar paja en un pajar gallego?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Hay zona para dormir, pero dormirás poco. Entre ronquidos, gritos de victoria y olor a humanidad, descansarás como en una rave rural. Recomendamos antifaz, tapones y una capacidad extrema de adaptación.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            📶 <b>¿Hay buen Internet o esto va por señales de humo desde el Monte do Gozo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Tranquilo, la conexión va fina, como percebe de primera. Pero si abusas con el torrent, se activa el Protocolo Apagón y te desconectamos más rápido que un político en campaña por Lestedo.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🧍 <b>¿Puedo ir solo o es obligatorio traer a mi primo del pueblo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Ven como quieras. Aquí haces colegas en menos de lo que canta un gallo de corral. Eso sí, si vas de sobrado, acabas como los que aparcan en dirección prohibida en Santiago: solo, observado y malquerido.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingTop: "16px", paddingBottom: "16px" }}>
            🛑 <b>¿Hay normas o esto es como un botellón en el campillo?</b><br/>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            Sí, hay normas:
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            - No abuses del Wi-Fi o se te aparece el meigallo digital.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            - No pongas reguetón en altavoces, por respeto a la humanidad.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            - No ocupes más mesa de la que necesitas, que esto no es un pulpeiro.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            - Respeta a todo el mundo, incluso al que juega con mando.
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "10px", paddingRight: "12px" }}>
            - Si pierdes, asume tu derrota como buen gallego: y cagate en todos los santos.
          </Typography>
        </Box>
      </Modal>
      )}

      {/* Panel de Mapa */}
      {!isMobile && (<Rnd default={{ x: 1705, y: -15, width: "5%", height: "auto" }} enableResizing={false} disableDragging={true} onClick={() => setOpenMapModal(true)}>
        <Paper style={{ padding: "16px", boxShadow: "none", cursor: "pointer", backgroundColor: "transparent", color: "white", textAlign: "center" }}>
          <Typography style={{ fontSize: "1rem", fontWeight: "bold", border: "1px solid #9A26AE" }}>Mapa</Typography>
        </Paper>
      </Rnd>)}

      {/* Modal Mapa */}
      {!isMobile && (<Modal open={openMapModal} onClose={() => setOpenMapModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 900, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2, height: "85%", overflowY: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e"}}>
          <Box sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>🏟️ MAPA NOYA'S HOUSE VENUE</Typography>
          </Box>

          <iframe
            src="XGN PLANO.pdf"
            title="Mapa XGN Lestedo"
            width="100%"
            height="87%">
          </iframe>
        </Box>
      </Modal>
      )}

      {/* Panel de Horarios */}
      {!isMobile && (<Rnd default={{ x: 1611, y: -15, width: "6%", height: "auto" }} enableResizing={false} disableDragging={true} onClick={() => setOpenTimetableModal(true)}>
        <Paper style={{ padding: "16px", boxShadow: "none", cursor: "pointer", backgroundColor: "transparent", color: "white", textAlign: "center" }}>
          <Typography style={{ fontSize: "1rem", fontWeight: "bold", border: "1px solid #9A26AE" }}>Horarios</Typography>
        </Paper>
      </Rnd>)}

      {/* Modal Horarios */}
      {!isMobile && (<Modal open={openTimetableModal} onClose={() => setOpenTimetableModal(false)}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, bgcolor: "#1e1e1e", color: "white", boxShadow: 24, p: 4, borderRadius: 2, height: "85%", overflowY: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e"}}>
          <Box sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>🕒 HORARIOS</Typography>
          </Box>
          
          <Typography variant="h5" sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            📅 Viernes
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>Antes de la cena (18:30 - 21:00)</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Llegada de los participantes</li>
              <li>Acreditación oficial y entrega del kit de bienvenida</li>
              <li>Instalación de equipos y muestra de instalaciones</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>Cena (21:00 - 22:00)</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Menú: 🥘 Arroz con huevos y salchichas ricas</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>Noche (22:00 - 00:00)</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Juegos libres y pruebas de conexión</li>
              <li>Preparativos para el gran inicio</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>00:00 - INAUGURACIÓN OFICIAL</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Ceremonia del encendido oficial de la LAN Party 💡🎮🔥</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            00:00 en adelante
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Noche de juegos non-stop hasta que el cuerpo aguante</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            📅 Sábado
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>Mañana</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Desayuno flexible: ☕ Café con galletas / 🥖 Lomo con pan</li>
              <li>🎮 Juegos durante la mañana</li>
              <li>11:30 → Roxo va a la peluquería</li>
            </ul>
          </Typography>

          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>12:00 - FASE BBQ ACTIVADA</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Se encienden las brasas para el churrasco</li>
              <li>🍻 Cervezas y observación del Parrillero Supremo™</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>14:00 - COMIDA: Churrasco time</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Post-comida: sobremesa, partidas ligeras o descanso breve</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>Tarde</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Juegos en red toda la tarde (torneos, retos, etc.)</li>
              <li>Opción de peli en la zona de consolas, sofá y tele 📺🍿</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>Noche</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Cena: 🍽️ Risotto casero</li>
              <li>Juegos toda la noche hasta el amanecer</li>
            </ul>
          </Typography>

          <Typography variant="h5" sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" }}>
            📅 Domingo
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>Mañana</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Desayuno libre cuando cada uno despierte 💤☕</li>
              <li>Última mañana de vicio gamer</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>14:00 - COMIDA FINAL</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>🍔 Noyas prepara sus hamburguesas legendarias</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>16:30 - EVENTO ESPECIAL</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>📺 Conexión IPTV de Danis: Barça - Madrid ⚽</li>
            </ul>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <b>Después del partido (aprox. 18:30)</b>
          </Typography>
          <Typography sx={{ width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" }}>
            <ul>
              <li>Recogida de equipos y zona de juego</li>
              <li>Entrega de trofeo al MVP de la LAN (más puntos en juegos y minijuegos)</li>
            </ul>
          </Typography>
        </Box>
      </Modal>
      )}

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
      {!isMobile && (<Rnd default={{ x: 40, y: 120, width: "40%", height: "auto" }}>
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
      </Rnd>)}
      {isMobile && (<Rnd default={{ x: 0, y: 100, width: "92%", height: "auto" }} enableResizing={false} disableDragging={true}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white", overflow: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e"}}>
          <Typography style={{ textAlign: "center"}} variant="h5" gutterBottom>Ranking</Typography>
          <Button variant="outlined" color="secondary" size="small" style={{ position: "absolute", left: "15px", top: "20px", color: "white" }} onClick={() => setOpenFaksModal(true)}>FAKs</Button>
          <Button variant="outlined" color="secondary" size="small" style={{ position: "absolute", right: "15px", top: "20px", color: "white" }} onClick={() => handleOpenResetModal(true)}>↻</Button>

          <Table style={{ overflow: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e"}}>
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
      </Rnd>)}
        
      {/* Panel de Evolución */}
      {!isMobile && (<Rnd default={{ x: 820, y: 120, width: "24%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
            <Typography variant="h5" gutterBottom>Evolución de Puntos</Typography>
            <Line data={chartData} />
            <Button variant="contained" color="secondary" fullWidth onClick={nextRound} sx={{ mt: 2 }}>Siguiente Ronda</Button>
          </Paper>
      </Rnd>)}
      {isMobile && (<Rnd default={{ x: 0, y: 510, width: "92%", height: "auto" }} enableResizing={false} disableDragging={true}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
            <Typography variant="h5" gutterBottom>Evolución de Puntos</Typography>
            <Line data={chartData} />
            <Button variant="contained" color="secondary" fullWidth onClick={nextRound} sx={{ mt: 2 }}>Siguiente Ronda</Button>
          </Paper>
      </Rnd>)}

      {/* Panel de GIPHY */}
      {!isMobile && (<Rnd default={{ x: 1300, y: 120, width: "10%", height: "auto" }}>
        <img src={gifUrl} alt="GIF" style={{ width: "100%", cursor: "pointer" }} onClick={fetchRandomGif} />
      </Rnd>)}

      {/* Panel de Spotify */}
      {!isMobile && (<Rnd default={{ x: 820, y: 480, width: "24%", height: "auto" }}>
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
      </Rnd>)}
      {isMobile && (<Rnd default={{ x: 0, y: 1900, width: "92%", height: "auto" }} enableResizing={false} disableDragging={true}>
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
      </Rnd>)}

      {/* Panel de Juegos */}
      {!isMobile && (<Rnd default={{ x: 1510, y: 120, width: "19%", height: "auto" }}>
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
      </Rnd>)}
      {isMobile && (<Rnd default={{ x: 0, y: 840, width: "92%", height: "auto" }} enableResizing={false} disableDragging={true}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white"}}>
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
      </Rnd>)}

      {/* Panel de Vídeos */}
      {!isMobile && (<Rnd default={{ x: 40, y: 480, width: "40%", height: "auto" }}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography variant="h5" gutterBottom>Party Vídeos</Typography>
          <iframe width="100%" height="300" src="https://www.youtube.com/embed/videoseries?si=yt9cPirnyjTM-f3_&amp;list=PL2ihC4aJWkWpD8C2MJ62Cx80abK9l-I4L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </Paper>
      </Rnd>)}
      {isMobile && (<Rnd default={{ x: 0, y: 2295, width: "92%", height: "auto" }} enableResizing={false} disableDragging={true}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white", marginBottom: "20px"}}>
          <Typography variant="h5" gutterBottom>Party Vídeos</Typography>
          <iframe width="100%" height="300" src="https://www.youtube.com/embed/videoseries?si=yt9cPirnyjTM-f3_&amp;list=PL2ihC4aJWkWpD8C2MJ62Cx80abK9l-I4L" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </Paper>
      </Rnd>)}

      {/* Panel del Mapa */}
      {!isMobile && (<Rnd default={{ x: 1300, y: 332, width: "10%", height: "auto" }}>
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
      </Rnd>)}
      {isMobile && (<Rnd default={{ x: 0, y: 1560, width: "92%", height: "auto" }} enableResizing={false} disableDragging={true}>
        <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
          <Typography variant="h5" gutterBottom>Ubicación</Typography>
          <iframe
            title="Ubicación"
            width="100%"
            height="250"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCQp9lnjB31CyDBNg49fo4oz15n976iz2Q&q=Lugar+A+Picota,+5,+15881+Troitomil,+A+Coruña"
          ></iframe>
        </Paper>
      </Rnd>)}

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
