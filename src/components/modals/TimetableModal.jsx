import { Modal, Box, Typography } from "@mui/material";

const modalBoxSx = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "#1e1e1e",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: "85%",
  overflowY: "scroll",
  scrollbarWidth: "thin",
  scrollbarColor: "#F363FA #1e1e1e"
};

const headerSx = { width: "auto", height: "auto", borderRadius: "8px", display: "flex", padding: "10px", alignItems: "center", justifyContent: "center" };
const daySx = { width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "32px", paddingRight: "32px", paddingTop: "16px", paddingBottom: "16px" };
const itemSx = { width: "auto", height: "auto", borderRadius: "8px", display: "flex", paddingLeft: "40px", paddingRight: "32px" };

export default function TimetableModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalBoxSx}>
        <Box sx={headerSx}>
          <Typography variant="h3" sx={{ color: "white", fontWeight: "bold", backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "8px", borderRadius: "4px" }}>🕒 HORARIOS</Typography>
        </Box>
        
        {/* Viernes */}
        <Typography variant="h5" sx={daySx}>📅 Viernes</Typography>
        <Typography sx={itemSx}><b>Antes de la cena (18:30 - 21:00)</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Llegada de los participantes</li>
            <li>Acreditación oficial y entrega del kit de bienvenida</li>
            <li>Instalación de equipos y muestra de instalaciones</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>Cena (21:00 - 22:00)</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Menú: 🥘 Pizzas frescas de Casa Tarradellas. Las de casa...</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>Noche (22:00 - 00:00)</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Juegos libres y pruebas de conexión</li>
            <li>Preparativos para el gran inicio</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>00:00 - INAUGURACIÓN OFICIAL</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Ceremonia del encendido oficial de la LAN Party 💡🎮🔥</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}>00:00 en adelante</Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Noche de juegos non-stop hasta que el cuerpo aguante</li>
          </ul>
        </Typography>

        {/* Sábado */}
        <Typography variant="h5" sx={daySx}>📅 Sábado</Typography>
        <Typography sx={itemSx}><b>Mañana</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Desayuno flexible: ☕ Café con galletas / 🥖 Lomo con pan</li>
            <li>🎮 Juegos durante la mañana</li>
            <li>11:30 → Roxo va a la peluquería</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>12:00 - FASE BBQ ACTIVADA</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Se encienden las brasas para el churrasco</li>
            <li>🍻 Cervezas y observación del Parrillero Supremo™</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>14:00 - COMIDA: Churrasco time</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Post-comida: sobremesa, partidas ligeras o descanso breve</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>Tarde</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Juegos en red toda la tarde (torneos, retos, etc.)</li>
            <li>Opción de peli en la zona de consolas, sofá y tele 📺🍿</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>Noche</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Cena: 🍽️ Risotto casero</li>
            <li>Juegos toda la noche hasta el amanecer</li>
          </ul>
        </Typography>

        {/* Domingo */}
        <Typography variant="h5" sx={daySx}>📅 Domingo</Typography>
        <Typography sx={itemSx}><b>Mañana</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Desayuno libre cuando cada uno despierte 💤☕</li>
            <li>Última mañana de vicio gamer</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>14:00 - COMIDA FINAL</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>🍔 Noyas prepara sus hamburguesas legendarias</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>16:30 - EVENTO ESPECIAL</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>📺 Conexión IPTV de Danis: Barça - Madrid ⚽</li>
          </ul>
        </Typography>
        <Typography sx={itemSx}><b>Después del partido (aprox. 18:30)</b></Typography>
        <Typography sx={itemSx}>
          <ul>
            <li>Recogida de equipos y zona de juego</li>
            <li>Entrega de trofeo al MVP de la LAN (más puntos en juegos y minijuegos)</li>
          </ul>
        </Typography>
      </Box>
    </Modal>
  );
}
