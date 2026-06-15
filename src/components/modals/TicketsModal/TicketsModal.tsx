import { Modal, Box, Typography } from "@mui/material";
import { modalBoxSx, closeButtonStyle, titleContainerSx } from "./TicketsModal.styles";

/** Maps player ID → accreditation image filename and player name */
const playerAccreditations: Record<number, { src: string; name: string }> = {
  1: { src: "/xgn-lestedo-25/acreditacion-chillfar.jpg", name: "Chillfar" },
  2: { src: "/xgn-lestedo-25/acreditacion-noyas.jpg",   name: "El Noyas" },
  3: { src: "/xgn-lestedo-25/acreditacion-goku.jpg",    name: "Goku" },
  4: { src: "/xgn-lestedo-25/acreditacion-eras.jpg",    name: "Eras" },
};

interface TicketsModalProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
  isAuthenticated: boolean;
  authenticatedPlayerId: number | null;
}

export default function TicketsModal({ open, onClose, isMobile, isAuthenticated, authenticatedPlayerId }: TicketsModalProps) {
  const accreditation = authenticatedPlayerId !== null ? playerAccreditations[authenticatedPlayerId] : null;

  return (
    <Modal open={open} onClose={onClose} style={isMobile ? { zIndex: 99999 } : undefined} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx(isMobile)}>
        <div onClick={onClose} style={closeButtonStyle}>✕</div>

        {!isAuthenticated ? (
          /* ── Not logged in ── */
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
            gap: 3,
          }}>
            <Typography variant="h2" sx={{ fontSize: isMobile ? "3rem" : "4rem" }}>🔒</Typography>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
              Inicia sesión para ver tu acreditación digital
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
              Solo los asistentes registrados pueden acceder a su acreditación.
            </Typography>
          </Box>
        ) : !accreditation ? (
          /* ── Logged in but no accreditation found ── */
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "80%",
            gap: 3,
          }}>
            <Typography variant="h2" sx={{ fontSize: isMobile ? "3rem" : "4rem" }}>⚠️</Typography>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
              No se encontró tu acreditación
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
              Contacta con el administrador para vincular tu cuenta.
            </Typography>
          </Box>
        ) : (
          /* ── Show own accreditation ── */
          <>
            <Box sx={titleContainerSx}>
              <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: "white", fontWeight: "bold", backgroundColor: "rgba(0,0,0,0.5)", padding: "8px", borderRadius: "4px", textAlign: "center" }}>
                🔖 Tu acreditación digital, <span style={{ color: "#F363FA" }}>{accreditation.name}</span>!
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", flex: 1, minHeight: 0 }}>
              <img
                src={accreditation.src}
                alt={`Acreditación ${accreditation.name}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "55vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(243, 99, 250, 0.4)",
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.4)", textAlign: "center", mt: 1 }}>
              Descarga la imagen para mostrarla en la entrada.
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
}
