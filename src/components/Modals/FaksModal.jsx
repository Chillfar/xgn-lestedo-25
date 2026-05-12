import { Modal, Box, Typography } from "@mui/material";

export default function FaksModal({ open, onClose, isMobile }) {
  return (
    <>
      {/* Modal FAKs - Desktop */}
      {!isMobile && (
        <Modal open={open} onClose={onClose}>
          <Box
            sx={{
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
              height: "80vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                display: "flex",
                padding: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                💀 FAKs LESTEDO LAN PARTY
              </Typography>
            </Box>

            <FakItem
              emoji="🎟️"
              title="¿Hace falta registrarse o puedo aparecer como quien va a misa en Lestedo?"
              answer="Esto no es la romería de San Campio, colega. Si no te registras, no entras. No hay hueco, no hay mesa, y lo único que te vas a llevar es una caminata por el polígono y una empanada de recelo."
              paddingLeft="32px"
            />

            <FakItem
              emoji="🖥️"
              title="¿Qué tengo que llevar?"
              answer="Tu torre, pantalla, cables, teclado, ratón, regleta, orgullo y paciencia. Y si vienes con un portátil de cuando Fraga era joven, tráete también una vela y una estampita de San Razquin."
              paddingLeft="32px"
            />

            <FakItem
              emoji="🧠"
              title="¿Y si soy malo jugando?"
              answer="Da igual, aquí aceptamos a mancos, feeders, y hasta al que se compró el LoL por Amazon. Pero prepárate: esto es Galicia, donde los piques duran más que una sobremesa de mariscada."
              paddingLeft="32px"
            />

            <FakItem
              emoji="🍕"
              title="¿Habrá comida o me llevo una tortilla de Betanzos en el bolsillo?"
              answer="Habrá comida, pero no esperes que la cocine tu abuela. Bocatas, pizzas, snacks... la dieta del gamer de verdad. Si quieres caldo, pulpo o filloas, llama a tu madre. Y no, no hay albóndigas ni potaje."
              paddingLeft="32px"
            />

            <FakItem
              emoji="🕹️"
              title="¿Qué juegos se van a jugar?"
              answer="Los que levantan pasiones y bajan autoestima: LoL, CS2, Valorant, Rocket League, Age of Empires II (en honor a los veteranos), y alguno más que salga a gritos. Si propones un torneo de Candy Crush, te echamos."
              paddingLeft="32px"
            />

            <FakItem
              emoji="🏆"
              title="¿Hay premios o solo sufrimiento y olor a Monster caliente?"
              answer="Hay premios, sí. Y si no ganas nada, al menos te llevas trauma, sueño atrasado y una experiencia que ni el Camino de Santiago. Algún trofeo habrá, pero el verdadero premio es no suicidarse en un 1v5."
              paddingLeft="32px"
            />

            <FakItem
              emoji="🛌"
              title="¿Puedo dormir allí o tengo que buscar paja en un pajar gallego?"
              answer="Hay zona para dormir, pero dormirás poco. Entre ronquidos, gritos de victoria y olor a humanidad, descansarás como en una rave rural. Recomendamos antifaz, tapones y una capacidad emocional de acero."
              paddingLeft="32px"
            />

            <FakItem
              emoji="📶"
              title="¿Hay buen Internet o esto va por señales de humo desde el Monte do Gozo?"
              answer="Tranquilo, la conexión va fina, como percebe de primera. Pero si abusas con el torrent, se activa el Protocolo Apagón y te desconectamos más rápido que un político en campaña post-elecciones."
              paddingLeft="32px"
            />

            <FakItem
              emoji="🧍"
              title="¿Puedo ir solo o es obligatorio traer a mi primo del pueblo?"
              answer="Ven como quieras. Aquí haces colegas en menos de lo que canta un gallo de corral. Eso sí, si vas de sobrado, acabas como los que aparcan en dirección prohibida en Santiago: solo, odiado y sin respeto."
              paddingLeft="32px"
            />

            <Typography
              sx={{
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                display: "flex",
                paddingLeft: "32px",
                paddingRight: "32px",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              🛑 <b>¿Hay normas o esto es como un botellón en el campillo?</b>
              <br />
            </Typography>
            <Typography
              sx={{
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                display: "flex",
                paddingLeft: "40px",
                paddingRight: "32px",
              }}
            >
              Sí, hay normas:
            </Typography>

            <RuleItem text="No abuses del Wi-Fi o se te aparece el meigallo digital." />
            <RuleItem text="No pongas reguetón en altavoces, por respeto a la humanidad." />
            <RuleItem text="No ocupes más mesa de la que necesitas, que esto no es un pulpeiro." />
            <RuleItem text="Respeta a todo el mundo, incluso al que juega con mando." />
            <RuleItem text="Si pierdes, asume tu derrota como buen gallego: y cagate en todos los santos." />
          </Box>
        </Modal>
      )}

      {/* Modal FAKs - Mobile */}
      {isMobile && (
        <Modal open={open} onClose={onClose} style={{ zIndex: 9999 }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              bgcolor: "#1e1e1e",
              color: "white",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              height: "80vh",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                display: "flex",
                paddingTop: "10px",
                paddingBottom: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                💀 FAKs LESTEDO LAN PARTY
              </Typography>
            </Box>

            <FakItem
              emoji="🎟️"
              title="¿Hace falta registrarse o puedo aparecer como quien va a misa en Lestedo?"
              answer="Esto no es la romería de San Campio, colega. Si no te registras, no entras. No hay hueco, no hay mesa, y lo único que te vas a llevar es una caminata por el polígono y una empanada de recelo."
              paddingLeft="10px"
              isMobile={true}
            />

            <FakItem
              emoji="🖥️"
              title="¿Qué tengo que llevar?"
              answer="Tu torre, pantalla, cables, teclado, ratón, regleta, orgullo y paciencia. Y si vienes con un portátil de cuando Fraga era joven, tráete también una vela y una estampita de San Razquin."
              paddingLeft="10px"
              isMobile={true}
            />

            <FakItem
              emoji="🧠"
              title="¿Y si soy malo jugando?"
              answer="Da igual, aquí aceptamos a mancos, feeders, y hasta al que se compró el LoL por Amazon. Pero prepárate: esto es Galicia, donde los piques duran más que una sobremesa de mariscada."
              paddingLeft="10px"
              isMobile={true}
            />

            <FakItem
              emoji="🍕"
              title="¿Habrá comida o me llevo una tortilla de Betanzos en el bolsillo?"
              answer="Habrá comida, pero no esperes que la cocine tu abuela. Bocatas, pizzas, snacks... la dieta del gamer de verdad. Si quieres caldo, pulpo o filloas, llama a tu madre. Y no, no hay albóndigas ni potaje."
              paddingLeft="10px"
              isMobile={true}
            />

            <FakItem
              emoji="🕹️"
              title="¿Qué juegos se van a jugar?"
              answer="Los que levantan pasiones y bajan autoestima: LoL, CS2, Valorant, Rocket League, Age of Empires II (en honor a los veteranos), y alguno más que salga a gritos. Si propones un torneo de Candy Crush, te echamos."
              paddingLeft="10px"
              isMobile={true}
            />

            <FakItem
              emoji="🏆"
              title="¿Hay premios o solo sufrimiento y olor a Monster caliente?"
              answer="Hay premios, sí. Y si no ganas nada, al menos te llevas trauma, sueño atrasado y una experiencia que ni el Camino de Santiago. Algún trofeo habrá, pero el verdadero premio es no suicidarse en un 1v5."
              paddingLeft="10px"
              isMobile={true}
            />

            <FakItem
              emoji="🛌"
              title="¿Puedo dormir allí o tengo que buscar paja en un pajar gallego?"
              answer="Hay zona para dormir, pero dormirás poco. Entre ronquidos, gritos de victoria y olor a humanidad, descansarás como en una rave rural. Recomendamos antifaz, tapones y una capacidad emocional de acero."
              paddingLeft="10px"
              isMobile={true}
            />

            <FakItem
              emoji="📶"
              title="¿Hay buen Internet o esto va por señales de humo desde el Monte do Gozo?"
              answer="Tranquilo, la conexión va fina, como percebe de primera. Pero si abusas con el torrent, se activa el Protocolo Apagón y te desconectamos más rápido que un político en campaña post-elecciones."
              paddingLeft="10px"
              isMobile={true}
            />

            <FakItem
              emoji="🧍"
              title="¿Puedo ir solo o es obligatorio traer a mi primo del pueblo?"
              answer="Ven como quieras. Aquí haces colegas en menos de lo que canta un gallo de corral. Eso sí, si vas de sobrado, acabas como los que aparcan en dirección prohibida en Santiago: solo, odiado y sin respeto."
              paddingLeft="10px"
              isMobile={true}
            />

            <Typography
              sx={{
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                display: "flex",
                paddingTop: "16px",
                paddingBottom: "16px",
              }}
            >
              🛑 <b>¿Hay normas o esto es como un botellón en el campillo?</b>
              <br />
            </Typography>
            <Typography
              sx={{
                width: "auto",
                height: "auto",
                borderRadius: "8px",
                display: "flex",
                paddingLeft: "10px",
                paddingRight: "12px",
              }}
            >
              Sí, hay normas:
            </Typography>

            <RuleItem text="No abuses del Wi-Fi o se te aparece el meigallo digital." isMobile={true} />
            <RuleItem text="No pongas reguetón en altavoces, por respeto a la humanidad." isMobile={true} />
            <RuleItem text="No ocupes más mesa de la que necesitas, que esto no es un pulpeiro." isMobile={true} />
            <RuleItem text="Respeta a todo el mundo, incluso al que juega con mando." isMobile={true} />
            <RuleItem text="Si pierdes, asume tu derrota como buen gallego: y cagate en todos los santos." isMobile={true} />
          </Box>
        </Modal>
      )}
    </>
  );
}

// Componente para cada pregunta FAQ
function FakItem({ emoji, title, answer, paddingLeft, isMobile }) {
  return (
    <>
      <Typography
        sx={{
          width: "auto",
          height: "auto",
          borderRadius: "8px",
          display: "flex",
          paddingLeft,
          paddingRight: isMobile ? "12px" : "32px",
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        <b>
          {emoji} {title}
        </b>
        <br />
      </Typography>
      <Typography
        sx={{
          width: "auto",
          height: "auto",
          borderRadius: "8px",
          display: "flex",
          paddingLeft: isMobile ? "10px" : paddingLeft === "32px" ? "40px" : "10px",
          paddingRight: isMobile ? "12px" : "32px",
        }}
      >
        {answer}
      </Typography>
    </>
  );
}

// Componente para cada regla
function RuleItem({ text, isMobile }) {
  return (
    <Typography
      sx={{
        width: "auto",
        height: "auto",
        borderRadius: "8px",
        display: "flex",
        paddingLeft: isMobile ? "10px" : "40px",
        paddingRight: isMobile ? "12px" : "32px",
      }}
    >
      - {text}
    </Typography>
  );
}
