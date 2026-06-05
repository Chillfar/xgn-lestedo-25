import { useState } from "react";
import { Container } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./App.css";

// Constants
import { Game, User, userColors, geekQuotes } from "./constants/initialData";

// Auth
import { useAuth } from "./contexts/AuthContext";

// Hooks
import useFirestoreGames from "./hooks/useFirestoreGames";
import useFirestoreUsers from "./hooks/useFirestoreUsers";
import useFirestoreArchives, { ArchiveSnapshot } from "./hooks/useFirestoreArchives";
import useWindowSize from "./hooks/useWindowSize";
import useCountdown from "./hooks/useCountdown";
import useRandomGif from "./hooks/useRandomGif";
import useRandomQuote from "./hooks/useRandomQuote";
import useBuzzer from "./hooks/useBuzzer";

// Components
import IntroVideo from "./components/IntroVideo/IntroVideo";
import Header from "./components/Header/Header";
import QuotesBanner from "./components/QuotesBanner/QuotesBanner";
import CountdownPanel from "./components/CountdownPanel/CountdownPanel";
import NavButton from "./components/NavButton/NavButton";
import RankingPanel from "./components/RankingPanel/RankingPanel";
import ChartPanel from "./components/ChartPanel/ChartPanel";
import GamePanel from "./components/GamePanel/GamePanel";
import GiphyPanel from "./components/GiphyPanel/GiphyPanel";
import SpotifyPanel from "./components/SpotifyPanel/SpotifyPanel";
import VideosPanel from "./components/VideosPanel/VideosPanel";
import LocationPanel from "./components/LocationPanel/LocationPanel";
import BuzzerButton from "./components/BuzzerButton/BuzzerButton";

// Modals
import FaksModal from "./components/modals/FaksModal/FaksModal";
import MapModal from "./components/modals/MapModal/MapModal";
import TimetableModal from "./components/modals/TimetableModal/TimetableModal";
import TicketsModal from "./components/modals/TicketsModal/TicketsModal";
import GameScoreModal from "./components/modals/GameScoreModal/GameScoreModal";
import UserDetailModal from "./components/modals/UserDetailModal/UserDetailModal";
import AddGameModal from "./components/modals/AddGameModal/AddGameModal";
import ResetDataModal from "./components/modals/ResetDataModal/ResetDataModal";
import CountdownVideoModal from "./components/modals/CountdownVideoModal/CountdownVideoModal";
import InaugurationVideoModal from "./components/modals/InaugurationVideoModal/InaugurationVideoModal";
import LoginModal from "./components/modals/LoginModal/LoginModal";
import ArchiveModal from "./components/modals/ArchiveModal/ArchiveModal";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GameDashboard() {
  // Auth
  const { isAuthenticated, currentUser } = useAuth();

  // Firestore state (replaces localStorage)
  const { games: liveGames, addGame, removeGame } = useFirestoreGames();
  const { users: liveUsers, round: liveRound, assignPoints, nextRound, resetData } = useFirestoreUsers();
  const { archives, createArchive, loadArchive, deleteArchive } = useFirestoreArchives();

  // Archive viewing state
  const [viewingArchive, setViewingArchive] = useState<{ id: string; label: string; snapshot: ArchiveSnapshot } | null>(null);

  // Resolve which data to show: archived or live
  const users = viewingArchive ? viewingArchive.snapshot.users : liveUsers;
  const games = viewingArchive ? viewingArchive.snapshot.games : liveGames;
  const isReadOnly = !!viewingArchive;

  // UI state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [openNewGameModal, setOpenNewGameModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [openFaksModal, setOpenFaksModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [openTimetableModal, setOpenTimetableModal] = useState(false);
  const [openTicketsModal, setOpenTicketsModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);

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
  const { triggerBuzzer } = useBuzzer();

  // Handlers
  const handleAssignPoints = async (userId: number) => {
    if (!selectedGame) return;
    await assignPoints(userId, selectedGame.name);
  };

  const handleNextRound = async () => {
    await nextRound();
  };

  const handleAddNewGame = async (newGame: Game) => {
    await addGame(newGame);
    setOpenNewGameModal(false);
  };

  const handleDeleteGame = async (game: Game) => {
    await removeGame(game);
    setSelectedGame(null);
  };

  const handleResetData = async () => {
    await resetData();
    setOpenResetModal(false);
  };

  // Archive handlers
  const handleCreateArchive = async (label: string) => {
    await createArchive(liveUsers, liveGames, liveRound, label);
  };

  const handleLoadArchive = async (archiveId: string) => {
    const snapshot = await loadArchive(archiveId);
    if (snapshot) {
      const archive = archives.find((a) => a.id === archiveId);
      setViewingArchive({ id: archiveId, label: archive?.label || archiveId, snapshot });
    }
  };

  const handleExitArchiveView = () => {
    setViewingArchive(null);
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

  const ArchiveBanner = viewingArchive ? (
    <div style={{
      width: "100%",
      padding: "10px 20px",
      background: "linear-gradient(135deg, #4fc3f7, #0288d1)",
      color: "white",
      borderRadius: "8px",
      marginBottom: isMobile ? "16px" : "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxSizing: "border-box",
      boxShadow: !isMobile ? "0 4px 10px rgba(2, 136, 209, 0.5)" : "none",
    }}>
      <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
        Viendo edición: {viewingArchive.label}
      </span>
      <button
        onClick={handleExitArchiveView}
        style={{
          background: "rgba(255,255,255,0.2)",
          border: "1px solid white",
          color: "white",
          padding: "6px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "0.85rem",
        }}
      >
        Volver a En Vivo
      </button>
    </div>
  ) : null;

  return (
    <Container maxWidth={false}>
      <Header
        isMobile={isMobile}
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setOpenLoginModal(true)}
        bottomRightWidget={
          !isMobile ? (
            viewingArchive ? ArchiveBanner : <CountdownPanel countdown={countdown} isMobile={false} />
          ) : undefined
        }
      >
        <BuzzerButton onBuzz={triggerBuzzer} isMobile={isMobile} />
        <NavButton icon="qr" onClick={() => setOpenTicketsModal(true)} />
        <NavButton label="Horarios" onClick={() => setOpenTimetableModal(true)} />
        <NavButton label="Mapa" onClick={() => setOpenMapModal(true)} />
        <NavButton label="FAKs" onClick={() => setOpenFaksModal(true)} />
        {!!currentUser && (
          <NavButton label="Ediciones" onClick={() => setOpenArchiveModal(true)} />
        )}
      </Header>

      {/* Quote banner — desktop only */}
      {!isMobile && <QuotesBanner quote={quote} />}

      {/* Archive viewing banner — mobile only (on desktop it sits in the header widget) */}
      {isMobile && ArchiveBanner}

      {/* Content modals */}
      <FaksModal open={openFaksModal} onClose={() => setOpenFaksModal(false)} isMobile={isMobile} />
      <MapModal open={openMapModal} onClose={() => setOpenMapModal(false)} isMobile={isMobile} />
      <TimetableModal open={openTimetableModal} onClose={() => setOpenTimetableModal(false)} isMobile={isMobile} />
      <TicketsModal open={openTicketsModal} onClose={() => setOpenTicketsModal(false)} isMobile={isMobile} />

      {/* Video modals */}
      <CountdownVideoModal open={videoCountdownModalOpen} onClose={() => setVideoCountdownModalOpen(false)} />
      <InaugurationVideoModal open={videoInaugurationModalOpen} onClose={() => setVideoInaugurationModalOpen(false)} />

      {/* Login modal */}
      <LoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} isMobile={isMobile} />

      {/* Main panels */}
      <RankingPanel
        users={users}
        games={games}
        isMobile={isMobile}
        isAuthenticated={isReadOnly ? false : isAuthenticated}
        onUserClick={setSelectedUser}
        onResetClick={() => setOpenResetModal(true)}
        onArchiveClick={() => setOpenArchiveModal(true)}
      />

      <ChartPanel chartData={chartData} isMobile={isMobile} isAuthenticated={isReadOnly ? false : isAuthenticated} onNextRound={handleNextRound} />

      {!isMobile && <GiphyPanel gifUrl={gifUrl} onClickGif={fetchRandomGif} />}

      <SpotifyPanel isMobile={isMobile} />

      <GamePanel
        games={games}
        isMobile={isMobile}
        isAuthenticated={isReadOnly ? false : isAuthenticated}
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
        isAuthenticated={isReadOnly ? false : isAuthenticated}
        onAssignPoints={handleAssignPoints}
        onDeleteGame={handleDeleteGame}
      />

      <UserDetailModal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />

      <AddGameModal
        open={openNewGameModal}
        onClose={() => setOpenNewGameModal(false)}
        onAddGame={handleAddNewGame}
      />

      <ResetDataModal
        open={openResetModal}
        onClose={() => setOpenResetModal(false)}
        onReset={handleResetData}
      />

      <ArchiveModal
        open={openArchiveModal}
        onClose={() => setOpenArchiveModal(false)}
        archives={archives}
        isAuthenticated={isAuthenticated}
        hasData={liveUsers.some(u => (u.history && u.history.length > 0) || Object.values(u.scores).some(s => s > 0))}
        onCreateArchive={handleCreateArchive}
        onLoadArchive={handleLoadArchive}
        onDeleteArchive={deleteArchive}
        isMobile={isMobile}
      />
    </Container>
  );
}
