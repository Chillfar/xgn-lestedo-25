import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Archive } from "../../../hooks/useFirestoreArchives";
import { modalBoxSx, closeButtonStyle, viewIconStyle, deleteIconStyle } from "./ArchiveModal.styles";

interface ArchiveModalProps {
  open: boolean;
  onClose: () => void;
  archives: Archive[];
  isAuthenticated: boolean;
  hasData: boolean;
  onCreateArchive: (label: string) => Promise<void>;
  onLoadArchive: (archiveId: string) => void;
  onDeleteArchive: (archiveId: string) => Promise<void>;
  isMobile: boolean;
}

/** Format an ISO UTC date string as dd/mm/yyyy */
function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// styles exported to ArchiveModal.styles.ts

export default function ArchiveModal({
  open,
  onClose,
  archives,
  isAuthenticated,
  hasData,
  onCreateArchive,
  onLoadArchive,
  onDeleteArchive,
  isMobile,
}: ArchiveModalProps) {
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!label.trim()) return;
    setCreating(true);
    try {
      await onCreateArchive(label.trim());
      setLabel("");
    } catch (err: any) {
      console.error("Error creating archive:", err);
      alert(`Error al archivar: ${err.message || err}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (archiveId: string) => {
    setDeletingId(archiveId);
    try {
      await onDeleteArchive(archiveId);
    } finally {
      setDeletingId(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
  };

  return (
    <Modal open={open} onClose={onClose} style={isMobile ? { zIndex: 99999 } : undefined} sx={{ zIndex: 99999 }}>
      <Box sx={{ ...modalBoxSx(isMobile), display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }} className="liquid-glass">
        <Box sx={{ display: "flex", padding: "16px", alignItems: "center", justifyContent: "center", position: "relative", top: 0, zIndex: 10, backgroundColor: "rgba(255, 255, 255, 0.04)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", marginBottom: 0, mx: 0, mt: 0, flexShrink: 0 }}>
          <div onClick={onClose} style={{ ...closeButtonStyle, top: '16px', right: '16px', zIndex: 50 }}>✕</div>
          <Typography variant="h5" sx={{ color: "white", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", textShadow: "0 2px 10px rgba(0,0,0,0.5)", textAlign: "center", maxWidth: "calc(100% - 80px)", wordBreak: "break-word", fontSize: "clamp(1rem, 5vw, 2.2rem) !important" }}>
            Ediciones Archivadas
          </Typography>
        </Box>
        
        <Box sx={{ overflowY: 'auto', flex: 1, padding: isMobile ? "20px" : "32px", pt: "20px" }}>

        {/* Create archive — admin only */}
        {isAuthenticated && hasData && (
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              label="Nombre de la edición"
              size="small"
              fullWidth
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#F363FA" },
                  "&.Mui-focused fieldset": { borderColor: "#F363FA" },
                },
                "& .MuiInputLabel-root": { color: "#aaa" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#F363FA" },
              }}
            />
            <Button
              variant="contained"
              disabled={creating || !label.trim()}
              onClick={handleCreate}
              sx={{
                backgroundColor: "#F363FA",
                "&:hover": { backgroundColor: "#d14dd8" },
                fontWeight: "bold",
                whiteSpace: "nowrap",
                minWidth: "120px",
              }}
            >
              {creating ? <CircularProgress size={20} color="inherit" /> : "Archivar"}
            </Button>
          </Box>
        )}

        {/* Archive list */}
        <Box sx={{ overflowY: "auto", flexGrow: 1, scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" }}>
          {archives.length === 0 ? (
            <Typography variant="body2" sx={{ color: "#aaa", textAlign: "center", mt: 4 }}>
              No hay ediciones archivadas todavía.
            </Typography>
          ) : (
            <List>
              {archives.map((archive) => (
                <ListItem
                  key={archive.id}
                  className="liquid-glass-card"
                  sx={{
                    mb: 1.5,
                    py: 1.5,
                    px: 2,
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        edge="end"
                        onClick={() => {
                          onLoadArchive(archive.id);
                          onClose();
                        }}
                        sx={{ color: "#4fc3f7", p: 1.5 }}
                        title="Ver edición"
                      >
                        <span style={viewIconStyle}>👁</span>
                      </IconButton>
                      {isAuthenticated && (
                        <IconButton
                          edge="end"
                          onClick={() => handleDelete(archive.id)}
                          disabled={deletingId === archive.id}
                          sx={{ color: "#ef5350", p: 1.5 }}
                          title="Eliminar"
                        >
                          {deletingId === archive.id ? (
                            <CircularProgress size={18} color="inherit" />
                          ) : (
                            <span style={deleteIconStyle}>🗑</span>
                          )}
                        </IconButton>
                      )}
                    </Box>
                  }
                >
                  <ListItemText
                    primary={archive.label}
                    secondary={formatDate(archive.archivedAt)}
                    primaryTypographyProps={{ color: "white", fontWeight: "bold" }}
                    secondaryTypographyProps={{ color: "#aaa" }}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        </Box>
      </Box>
    </Modal>
  );
}
