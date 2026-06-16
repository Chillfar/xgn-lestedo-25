import { useState, useEffect, useMemo } from "react";
import { Container } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./App.css";

// Constants
import { Game, User, userColors, geekQuotes, emailToPlayerId } from "./constants/initialData";

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
import { resolvePredictions as firestoreResolvePredictions } from "./hooks/useFirestorePredictions";


// Components

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
import NextRoundModal from "./components/modals/NextRoundModal/NextRoundModal";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GameDashboard() {
  // Liquid Glass: interactive mouse-following refraction
  useEffect(() => {
    let currentPanel: HTMLElement | null = null;
    let currentCard: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      // ── Panels ──
      const panel = el.closest('.liquid-glass') as HTMLElement | null;
      if (currentPanel && currentPanel !== panel) {
        currentPanel.classList.remove('liquid-glass--hover');
      }
      currentPanel = panel;
      if (panel) {
        const rect = panel.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        panel.style.setProperty('--mouse-x', `${x}%`);
        panel.style.setProperty('--mouse-y', `${y}%`);
        panel.classList.add('liquid-glass--hover');
      }

      // ── Cards ──
      const card = el.closest('.liquid-glass-card') as HTMLElement | null;
      if (currentCard && currentCard !== card) {
        currentCard.classList.remove('liquid-glass-card--hover');
      }
      currentCard = card;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
        card.classList.add('liquid-glass-card--hover');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auth
  const { isAuthenticated, isAdmin, currentUser } = useAuth();

  // Resolve which player (from the fixed player list) the logged-in user is
  const authenticatedPlayerId: number | null =
    currentUser?.email ? (emailToPlayerId[currentUser.email] ?? null) : null;

  // Firestore state (replaces localStorage)
  const { games: liveGames, addGame, removeGame } = useFirestoreGames();
  const {
    users: liveUsers,
    round,
    activeGame,
    playedGames,
    loading: usersLoading,
    assignPoints,
    nextRound,
    resetData,
    addPredictionPoints,
  } = useFirestoreUsers();
  const { archives, createArchive, loadArchive, deleteArchive } = useFirestoreArchives();

  // Archive viewing state
  const [viewingArchive, setViewingArchive] = useState<{ id: string; label: string; snapshot: ArchiveSnapshot } | null>(null);

  // Resolve which data to show: archived or live
  const usersDataRaw = viewingArchive ? viewingArchive.snapshot.users : liveUsers;
  
  const usersData = useMemo(() => {
    if (!usersDataRaw || usersDataRaw.length === 0) return usersDataRaw;

    const maxRounds = Math.max(0, ...usersDataRaw.map(u => u.history?.length || 0));
    if (maxRounds <= 1) return usersDataRaw;

    let firstValidIndex = 0;
    for (let i = 0; i < maxRounds; i++) {
      const sum = usersDataRaw.reduce((acc, u) => acc + (u.history?.[i] || 0), 0);
      if (sum > 0) {
        firstValidIndex = i;
        break;
      }
    }

    let lastValidIndex = maxRounds - 1;
    for (let i = maxRounds - 1; i > firstValidIndex; i--) {
      const sum = usersDataRaw.reduce((acc, u) => acc + (u.history?.[i] || 0), 0);
      const prevSum = usersDataRaw.reduce((acc, u) => acc + (u.history?.[i - 1] || 0), 0);
      if (sum > prevSum) {
        lastValidIndex = i;
        break;
      }
    }

    if (firstValidIndex === 0 && lastValidIndex === maxRounds - 1) {
      return usersDataRaw;
    }

    return usersDataRaw.map(u => ({
      ...u,
      history: u.history ? u.history.slice(firstValidIndex, lastValidIndex + 1) : []
    }));
  }, [usersDataRaw]);
  
  const games = viewingArchive ? viewingArchive.snapshot.games : liveGames;
  const isReadOnly = !!viewingArchive;

  // UI state
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const [openNewGameModal, setOpenNewGameModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [openFaksModal, setOpenFaksModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [openTimetableModal, setOpenTimetableModal] = useState(false);
  const [openTicketsModal, setOpenTicketsModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openArchiveModal, setOpenArchiveModal] = useState(false);
  const [openNextRoundModal, setOpenNextRoundModal] = useState(false);

  // Custom hooks
  const { isMobile } = useWindowSize();
  const {
    countdown,
    videoCountdownModalOpen,
    setVideoCountdownModalOpen,
    videoInaugurationModalOpen,
    setVideoInaugurationModalOpen
  } = useCountdown("2026-10-09T22:00:00");
  const { gifUrl, fetchRandomGif } = useRandomGif();
  const quote = useRandomQuote(geekQuotes);


  // Handlers
  const handleAssignPoints = async (userId: number) => {
    if (!selectedGame) return;
    try {
      await assignPoints(userId, selectedGame.name);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleAddNewGame = async (newGame: Game) => {
    await addGame(newGame);
    setOpenNewGameModal(false);
  };

  const handleDeleteGame = async (game: Game) => {
    await removeGame(game);
    setSelectedGame(null);
  };

  const handleNextRound = async () => {
    setOpenNextRoundModal(false);
    
    let winnersData: { winnerIds: number[], rewards: Record<number, number> } | undefined;

    if (activeGame) {
      // Find the winner(s) of the active game
      const maxScore = Math.max(...liveUsers.map(u => u.scores[activeGame] || 0));
      if (maxScore > 0) {
        const winnerIds = liveUsers.filter(u => (u.scores[activeGame] || 0) === maxScore).map(u => u.id);
        
        try {
          const rewards = await firestoreResolvePredictions(activeGame, winnerIds);
          const rewardCount = Object.keys(rewards || {}).length;
          if (rewardCount > 0) {
            winnersData = { winnerIds, rewards };
            console.log(`[Predictions] Added points for ${rewardCount} players due to game resolution.`);
          }
        } catch (e: any) {
          console.error("[Predictions Error]", e);
        }
      }
    }

    await nextRound(winnersData);
  };

  const handleResetData = async () => {
    await resetData();
    setOpenResetModal(false);
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  // Archive handlers
  const handleCreateArchive = async (label: string) => {
    await createArchive(liveUsers, liveGames, round, label);
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
    labels: Array.isArray(usersData) && usersData.length > 0 ? usersData[0].history.map((_, index) => `Ronda ${index + 1}`) : [],
    datasets: Array.isArray(usersData) ? usersData.map(user => ({
      label: user.name,
      data: user.history || [],
      borderColor: userColors[user.name as keyof typeof userColors] || "#FFFFFF",
      backgroundColor: userColors[user.name as keyof typeof userColors] || "#FFFFFF"
    })) : []
  };



  const ArchiveBanner = viewingArchive ? (
    <div style={{ width: isMobile ? "100%" : "max-content", zIndex: 9990 }}>
      <div style={{
        padding: "16px",
        background: "linear-gradient(135deg, #4fc3f7, #0288d1)",
        color: "white",
        borderRadius: "16px",
        marginBottom: isMobile ? "20px" : "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
        cursor: "default",
        height: isMobile ? "auto" : "74px"
      }}>
        <span style={{ 
          fontWeight: "bold", 
          fontSize: "1rem", 
          whiteSpace: "nowrap", 
        }}>
          Viendo edición: {viewingArchive.label}
        </span>
        <button
          onClick={handleExitArchiveView}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "1px solid white",
            color: "white",
            padding: "6px 10px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.75rem",
            marginLeft: "12px",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            flexShrink: 0
          }}
        >
          Volver a En Vivo
        </button>
      </div>
    </div>
  ) : null;

  return (
    <Container maxWidth={false} sx={{ height: isMobile ? "auto" : "100vh", display: "flex", flexDirection: "column", overflow: isMobile ? "visible" : "hidden" }}>
      <Header
        isMobile={isMobile}
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setOpenLoginModal(true)}
        bottomRightWidget={
          !isMobile ? (
            viewingArchive ? ArchiveBanner : <CountdownPanel countdown={countdown} isMobile={false} />
          ) : undefined
        }
        leftWidget={!viewingArchive && (
          !isMobile ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, rgba(243,99,250,0.18), rgba(79,195,247,0.12))',
              border: '1px solid rgba(243,99,250,0.45)',
              borderRadius: '24px',
              padding: '5px 14px 5px 10px',
              boxShadow: '0 0 12px rgba(243,99,250,0.25)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '1rem' }}>🎮</span>
              <span style={{
                color: '#F363FA',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>Ronda {round + 1}</span>
              {activeGame && (
                <span style={{
                  color: '#4fc3f7',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  background: 'rgba(79,195,247,0.12)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  border: '1px solid rgba(79,195,247,0.3)',
                  marginLeft: '4px',
                }}>
                  {activeGame}
                </span>
              )}
            </div>
          ) : undefined
        )}
        centerWidget={!isMobile ? <QuotesBanner quote={quote} /> : undefined}
      >

        {!!currentUser && <NavButton icon="qr" onClick={() => setOpenTicketsModal(true)} />}
        <NavButton label="Horarios" onClick={() => setOpenTimetableModal(true)} />
        <NavButton label="Mapa" onClick={() => setOpenMapModal(true)} />
        <NavButton label="FAKs" onClick={() => setOpenFaksModal(true)} />

        {!!currentUser && (
          <NavButton label="Ediciones" onClick={() => setOpenArchiveModal(true)} />
        )}
      </Header>

      {/* Archive viewing banner — mobile only (on desktop it sits in the header widget) */}
      {isMobile && ArchiveBanner}

      {/* Content modals */}
      <FaksModal open={openFaksModal} onClose={() => setOpenFaksModal(false)} isMobile={isMobile} />
      <MapModal open={openMapModal} onClose={() => setOpenMapModal(false)} isMobile={isMobile} />
      <TimetableModal open={openTimetableModal} onClose={() => setOpenTimetableModal(false)} isMobile={isMobile} />
      <TicketsModal
        open={openTicketsModal}
        onClose={() => setOpenTicketsModal(false)}
        isMobile={isMobile}
        isAuthenticated={isAuthenticated}
        authenticatedPlayerId={authenticatedPlayerId}
      />

      {/* Video modals */}
      <CountdownVideoModal open={videoCountdownModalOpen} onClose={() => setVideoCountdownModalOpen(false)} />
      <InaugurationVideoModal open={videoInaugurationModalOpen} onClose={() => setVideoInaugurationModalOpen(false)} />

      {/* Login modal */}
      <LoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} isMobile={isMobile} />

      {/* Main panels */}
      {isMobile ? (
        /* ── Mobile: panels stack vertically ── */
        <>
          <RankingPanel
            users={usersData}
            games={games}
            isMobile={isMobile}
            isAuthenticated={isReadOnly ? false : isAdmin}
            onUserClick={setSelectedUser}
            onNextRoundClick={() => setOpenNextRoundModal(true)}
          />
          <ChartPanel 
            chartData={chartData} 
            isMobile={isMobile} 
            isAuthenticated={isReadOnly ? false : isAuthenticated} 
            isAdmin={isReadOnly ? false : isAdmin}
            onResetClick={() => setOpenResetModal(true)}
            onArchiveClick={() => setOpenArchiveModal(true)}
            users={usersData} 
          />
          <SpotifyPanel isMobile={isMobile} />
          <GamePanel
            games={games}
            activeGame={activeGame}
            playedGames={playedGames}
            onSelectGame={isReadOnly ? () => {} : handleSelectGame}
            isMobile={isMobile}
            isAuthenticated={isReadOnly ? false : isAdmin}
            onAddGameClick={() => setOpenNewGameModal(true)}
          />
          <VideosPanel isMobile={isMobile} />
          <LocationPanel isMobile={isMobile} />
        </>
      ) : (
        /* ── Desktop: CSS Grid ── */
        <div style={{
          display: "grid",
          gridTemplateColumns: "5fr 3fr 1.3fr 2.5fr",
          gridTemplateRows: "minmax(0, 55fr) minmax(0, 45fr)",
          gap: "20px",
          alignItems: "stretch",
          flex: 1,
          minHeight: 0,
          paddingBottom: "16px",
        }}>
          {/* Row 1, Col 1 — Ranking */}
          <div style={{ gridColumn: "1", gridRow: "1", minWidth: 0, minHeight: 0, height: "100%" }}>
            <RankingPanel
              users={usersData}
              games={games}
              isMobile={isMobile}
              isAuthenticated={isReadOnly ? false : isAdmin}
              onUserClick={setSelectedUser}
              onNextRoundClick={() => setOpenNextRoundModal(true)}
            />
          </div>

          {/* Row 1, Col 2 — Chart */}
          <div style={{ gridColumn: "2", gridRow: "1", minWidth: 0, minHeight: 0, height: "100%" }}>
            <ChartPanel 
              chartData={chartData} 
              isMobile={isMobile} 
              isAuthenticated={isReadOnly ? false : isAuthenticated} 
              isAdmin={isReadOnly ? false : isAdmin}
              onResetClick={() => setOpenResetModal(true)}
              onArchiveClick={() => setOpenArchiveModal(true)}
              users={usersData} 
            />
          </div>

          {/* Col 3 — Giphy and Location (spans both rows) */}
          <div style={{ gridColumn: "3", gridRow: "1 / 3", minWidth: 0, minHeight: 0, height: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
              <GiphyPanel gifUrl={gifUrl} onClickGif={fetchRandomGif} />
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <LocationPanel isMobile={isMobile} />
            </div>
          </div>

          {/* Row 1-2, Col 4 — Game Panel (spans both rows) */}
          <div style={{ gridColumn: "4", gridRow: "1 / 3", minWidth: 0, minHeight: 0, height: "100%" }}>
            <GamePanel
              games={games}
              activeGame={activeGame}
              playedGames={playedGames}
              onSelectGame={isReadOnly ? () => {} : handleSelectGame}
              isMobile={isMobile}
              isAuthenticated={isReadOnly ? false : isAdmin}
              onAddGameClick={() => setOpenNewGameModal(true)}
            />
          </div>

          {/* Row 2, Col 1 — Videos */}
          <div style={{ gridColumn: "1", gridRow: "2", minWidth: 0, minHeight: 0, height: "100%" }}>
            <VideosPanel isMobile={isMobile} />
          </div>

          {/* Row 2, Col 2 — Spotify */}
          <div style={{ gridColumn: "2", gridRow: "2", minWidth: 0, minHeight: 0, height: "100%" }}>
            <SpotifyPanel isMobile={isMobile} />
          </div>


        </div>
      )}

      {/* Action modals */}
      <GameScoreModal
        open={Boolean(selectedGame)}
        selectedGame={selectedGame}
        users={usersData}
        onClose={handleCloseModal}
        onAssignPoints={handleAssignPoints}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
        authenticatedPlayerId={authenticatedPlayerId}
        onDeleteGame={removeGame}
        playedGames={playedGames}
        activeGame={activeGame}
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
        isAuthenticated={isAdmin}
        hasData={liveUsers.some(u => (u.history && u.history.length > 1) || Object.values(u.scores).some(s => s > 0))}
        onCreateArchive={handleCreateArchive}
        onLoadArchive={handleLoadArchive}
        onDeleteArchive={deleteArchive}
        isMobile={isMobile}
      />

      <NextRoundModal
        open={openNextRoundModal}
        onClose={() => setOpenNextRoundModal(false)}
        onConfirm={handleNextRound}
      />
    </Container>
  );
}
