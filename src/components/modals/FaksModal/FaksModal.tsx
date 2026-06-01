import { Modal, Box, Typography } from "@mui/material";
import { modalBoxSx, closeButtonStyle, titleContainerSx, titleTextSx, questionSx, answerSx } from "./FaksModal.styles";

const faqItems = [
  {
    icon: "🎟️",
    question: "¿Hace falta registrarse o puedo aparecer como quien va a misa en Lestedo?",
    answer: "Esto no es la romería de San Campio, colega. Si no te registras, no entras. No hay hueco, no hay mesa, y lo único que te vas a llevar es una caminata por el polígono y una empanada triste."
  },
  {
    icon: "🖥️",
    question: "¿Qué tengo que llevar?",
    answer: "Tu torre, pantalla, cables, teclado, ratón, regleta, orgullo y paciencia. Y si vienes con un portátil de cuando Fraga era joven, tráete también una vela y una estampita de San Razer a ver si arranca."
  },
  {
    icon: "🧠",
    question: "¿Y si soy malo jugando?",
    answer: "Da igual, aquí aceptamos a mancos, feeders, y hasta al que se compró el LoL por Amazon. Pero prepárate: esto es Galicia, donde los piques duran más que una sobremesa de mariscada. Si pierdes, que sea con arte."
  },
  {
    icon: "🍕",
    question: "¿Habrá comida o me llevo una tortilla de Betanzos en el bolsillo?",
    answer: "Habrá comida, pero no esperes que la cocine tu abuela. Bocatas, pizzas, snacks... la dieta del gamer de verdad. Si quieres caldo, pulpo o filloas, llama a tu madre. Y no, no hay albariño (de momento)."
  },
  {
    icon: "🕹️",
    question: "¿Qué juegos se van a jugar?",
    answer: "Los que levantan pasiones y bajan autoestima: LoL, CS2, Valorant, Rocket League, Age of Empires II (en honor a los veteranos), y alguno más que salga a gritos. Si propones un torneo de FIFA, mejor sal al campo a correr tú."
  },
  {
    icon: "🏆",
    question: "¿Hay premios o solo sufrimiento y olor a Monster caliente?",
    answer: "Hay premios, sí. Y si no ganas nada, al menos te llevas trauma, sueño atrasado y una experiencia que ni el Camino de Santiago. Algún trofeo habrá, pero el verdadero premio es no salir en los memes del grupo."
  },
  {
    icon: "🛌",
    question: "¿Puedo dormir allí o tengo que buscar paja en un pajar gallego?",
    answer: "Hay zona para dormir, pero dormirás poco. Entre ronquidos, gritos de victoria y olor a humanidad, descansarás como en una rave rural. Recomendamos antifaz, tapones y una capacidad extrema de adaptación."
  },
  {
    icon: "📶",
    question: "¿Hay buen Internet o esto va por señales de humo desde el Monte do Gozo?",
    answer: "Tranquilo, la conexión va fina, como percebe de primera. Pero si abusas con el torrent, se activa el Protocolo Apagón y te desconectamos más rápido que un político en campaña por Lestedo."
  },
  {
    icon: "🧍",
    question: "¿Puedo ir solo o es obligatorio traer a mi primo del pueblo?",
    answer: "Ven como quieras. Aquí haces colegas en menos de lo que canta un gallo de corral. Eso sí, si vas de sobrado, acabas como los que aparcan en dirección prohibida en Santiago: solo, observado y malquerido."
  },
  {
    icon: "🛑",
    question: "¿Hay normas o esto es como un botellón en el campillo?",
    answer: "Sí, hay normas:",
    rules: [
      "No abuses del Wi-Fi o se te aparece el meigallo digital.",
      "No pongas reguetón en altavoces, por respeto a la humanidad.",
      "No ocupes más mesa de la que necesitas, que esto no es un pulpeiro.",
      "Respeta a todo el mundo, incluso al que juega con mando.",
      "Si pierdes, asume tu derrota como buen gallego: y cagate en todos los santos."
    ]
  }
];

interface FaksModalProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export default function FaksModal({ open, onClose, isMobile }: FaksModalProps) {
  const paddingLeft = isMobile ? "10px" : "40px";
  const paddingRight = isMobile ? "12px" : "32px";
  const questionPl = isMobile ? "0px" : "32px";
  const questionPr = isMobile ? "0px" : "32px";
  const titleVariant = isMobile ? "h4" : "h3";

  return (
    <Modal open={open} onClose={onClose} style={isMobile ? { zIndex: 99999 } : undefined} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx(isMobile)}>
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Box sx={titleContainerSx}>
          <Typography variant={titleVariant} sx={titleTextSx}>💀 FAKs  LESTEDO LAN PARTY</Typography>
        </Box>

        {faqItems.map((item, index) => (
          <div key={index}>
            <Typography sx={questionSx(questionPl, questionPr)}>
              {item.icon} <b>{item.question}</b><br/>
            </Typography>
            <Typography sx={answerSx(paddingLeft, paddingRight)}>
              {item.answer}
            </Typography>
            {item.rules && item.rules.map((rule, ruleIndex) => (
              <Typography key={ruleIndex} sx={answerSx(paddingLeft, paddingRight)}>
                - {rule}
              </Typography>
            ))}
          </div>
        ))}
      </Box>
    </Modal>
  );
}
