import { useState } from "react";
import { Container } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./App.css";

// Constants
import { Game, User, initialGames, initialUsers, userColors, geekQuotes } from "./constants/initialData";

// Hooks
import useLocalStorage from "./hooks/useLocalStorage";
import useWindowSize from "./hooks/useWindowSize";
import useCountdown from "./hooks/useCountdown";
import useRandomGif from "./hooks/useRandomGif";
import useRandomQuote from "./hooks/useRandomQuote";

// Components
import IntroVideo from "./components/IntroVideo";
import Header from "./components/Header";
import QuotesBanner from "./components/QuotesBanner";
import CountdownPanel from "./components/CountdownPanel";
import NavButton from "./components/NavButton";
import RankingPanel from "./components/RankingPanel";
import ChartPanel from "./components/ChartPanel";
import GamePanel from "./components/GamePanel";
import GiphyPanel from "./components/GiphyPanel";
import SpotifyPanel from "./components/SpotifyPanel";
import VideosPanel from "./components/VideosPanel";
import LocationPanel from "./components/LocationPanel";

// Modals
import FaksModal from "./components/modals/FaksModal";
import MapModal from "./components/modals/MapModal";
import TimetableModal from "./components/modals/TimetableModal";
import TicketsModal from "./components/modals/TicketsModal";
import GameScoreModal from "./components/modals/GameScoreModal";
import UserDetailModal from "./components/modals/UserDetailModal";
import AddGameModal from "./components/modals/AddGameModal";
import ResetDataModal from "./components/modals/ResetDataModal";
import CountdownVideoModal from "./components/modals/CountdownVideoModal";
import InaugurationVideoModal from "./components/modals/InaugurationVideoModal";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GameDashboard() {
  // Persisted state
  const [games, setGames] = useLocalStorage<Game[]>("games", initialGames);
  const [users, setUsers] = useLocalStorage<User[]>("users", initialUsers);

  // UI state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [round, setRound] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openNewGameModal, setOpenNewGameModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [openFaksModal, setOpenFaksModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [openTimetableModal, setOpenTimetableModal] = useState(false);
  const [openTicketsModal, setOpenTicketsModal] = useState(false);

  // Custom hooks
  const { isMobile } = useWindowSize();
  const {
    countdown,
    videoCountdownModalOpen,
    setVideoCountdownModalOpen,
    videoInaugurationModalOpen,
    setVideoInaugurationModalOpen
  } = useCountdown("2025-05-10T20:59:00");
  const { gifUrl, fetchRandomGif } = useRandomGif();
  const quote = useRandomQuote(geekQuotes);

  // Handlers
  const handleAssignPoints = (userId: number) => {
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

  const addNewGame = (newGame: Game) => {
    setGames([...games, newGame]);
    setOpenNewGameModal(false);
  };

  const deleteGame = (game: Game) => {
    setGames(games.filter(g => g.name !== game.name));
    setSelectedGame(null);
  };

  const resetData = () => {
    localStorage.setItem("games", JSON.stringify(initialGames));
    localStorage.setItem("users", JSON.stringify(initialUsers));
    window.location.reload();
    setOpenResetModal(false);
  };

  // Chart data
  const chartData = {
    labels: Array.isArray(users) && users.length > 0 ? users[0].history.map((_, index) => `Ronda ${index + 1}`) : [],
    datasets: Array.isArray(users) ? users.map(user => ({
      label: user.name,
      data: user.history || [],
      borderColor: userColors[user.name as keyof typeof userColors] || "#FFFFFF",
      backgroundColor: userColors[user.name as keyof typeof userColors] || "#FFFFFF"
    })) : []
  };

  // Intro screen
  if (loading) {
    return <IntroVideo onSkip={() => setLoading(false)} />;
  }

  return (
    <Container maxWidth={false}>
      <Header isMobile={isMobile} />

      {/* Quote banner — desktop only */}
      {!isMobile && <QuotesBanner quote={quote} />}

      {/* Countdown */}
      <CountdownPanel countdown={countdown} isMobile={isMobile} />

      {/* Nav buttons — desktop only */}
      {!isMobile && (
        <>
          <NavButton label="FAKs" onClick={() => setOpenFaksModal(true)} position={{ x: 1788, y: -15, width: "5%", height: "auto" }} />
          <NavButton label="Mapa" onClick={() => setOpenMapModal(true)} position={{ x: 1714, y: -15, width: "5%", height: "auto" }} />
          <NavButton label="Horarios" onClick={() => setOpenTimetableModal(true)} position={{ x: 1621, y: -15, width: "6%", height: "auto" }} />
          <NavButton icon="qr" onClick={() => setOpenTicketsModal(true)} position={{ x: 1585, y: -15, width: "3%", height: "auto" }} />
        </>
      )}

      {/* Content modals — desktop only (except FaksModal which has mobile support) */}
      <FaksModal open={openFaksModal} onClose={() => setOpenFaksModal(false)} isMobile={isMobile} />
      {!isMobile && <MapModal open={openMapModal} onClose={() => setOpenMapModal(false)} />}
      {!isMobile && <TimetableModal open={openTimetableModal} onClose={() => setOpenTimetableModal(false)} />}
      {!isMobile && <TicketsModal open={openTicketsModal} onClose={() => setOpenTicketsModal(false)} />}

      {/* Video modals */}
      <CountdownVideoModal open={videoCountdownModalOpen} onClose={() => setVideoCountdownModalOpen(false)} />
      <InaugurationVideoModal open={videoInaugurationModalOpen} onClose={() => setVideoInaugurationModalOpen(false)} />

      {/* Main panels */}
      <RankingPanel
        users={users}
        games={games}
        isMobile={isMobile}
        onUserClick={setSelectedUser}
        onResetClick={() => setOpenResetModal(true)}
        onFaksClick={isMobile ? () => setOpenFaksModal(true) : undefined}
      />

      <ChartPanel chartData={chartData} isMobile={isMobile} onNextRound={nextRound} />

      {!isMobile && <GiphyPanel gifUrl={gifUrl} onClickGif={fetchRandomGif} />}

      <SpotifyPanel isMobile={isMobile} />

      <GamePanel
        games={games}
        isMobile={isMobile}
        onGameClick={setSelectedGame}
        onAddGameClick={() => setOpenNewGameModal(true)}
      />

      <VideosPanel isMobile={isMobile} />
      <LocationPanel isMobile={isMobile} />

      {/* Action modals */}
      <GameScoreModal
        open={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        selectedGame={selectedGame}
        users={users}
        onAssignPoints={handleAssignPoints}
        onDeleteGame={deleteGame}
      />

      <UserDetailModal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />

      <AddGameModal
        open={openNewGameModal}
        onClose={() => setOpenNewGameModal(false)}
        onAddGame={addNewGame}
      />

      <ResetDataModal
        open={openResetModal}
        onClose={() => setOpenResetModal(false)}
        onReset={resetData}
      />
    </Container>
  );
}
