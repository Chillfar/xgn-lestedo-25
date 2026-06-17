import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_RCBVTo6yW5LatnF2ir52Qv-UslS2h_Y",
  authDomain: "xgn-lestedo.firebaseapp.com",
  projectId: "xgn-lestedo",
  storageBucket: "xgn-lestedo.firebasestorage.app",
  messagingSenderId: "931884269837",
  appId: "1:931884269837:web:9af89a6e0954e0f5077044",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const newGames = [
  {
    "name": "Fortnite",
    "cover": "https://i.3djuegos.com/juegos/8298/fortnite/fotos/ficha/fortnite-5154590.webp"
  },
  {
    "name": "Fifa",
    "cover": "https://i.3djuegos.com/juegos/19862/ea_sports_fc_25/fotos/ficha/ea_sports_fc_25-5908048.jpg"
  },
  {
    "name": "Mario Kart",
    "cover": "https://i.3djuegos.com/juegos/14356/mario_kart_8_switch/fotos/ficha/mario_kart_8_switch-3611054.jpg"
  },
  {
    "name": "Mario Party",
    "cover": "https://m.media-amazon.com/images/I/81EzN0PFG6L._AC_UF1000,1000_QL80_.jpg"
  },
  {
    "name": "Injustice",
    "cover": "https://upload.wikimedia.org/wikipedia/en/f/f8/Injustice_Gods_Among_Us_Cover_Art.jpg"
  },
  {
    "name": "GT 7",
    "cover": "https://blog.latam.playstation.com/tachyon/sites/3/2022/03/a730b12243d5c8f700aae0df31c9d33ba53f945d.jpeg"
  },
  {
    "name": "Bomberman",
    "cover": "https://m.media-amazon.com/images/I/81qwNA2+baL.jpg"
  }
];

const newUsers = [
  {
    "id": 3,
    "name": "Goku",
    "rol": "Rol: Maestro de los Soulslike y gurú de las tecnologías de pantalla.",
    "description": "El guerrero esporádico de la LAN, pero cuando aparece, deja el sofá para siempre. Dueño orgulloso de una PS5, sufre (y disfruta) con juegos como Dark Souls, Xenoblade y Elden Ring. No siempre se pasa por la XGN, pero a la de XGN Lestedo no falta ni loco: allí es territorio sagrado. Amante de las teles con más siglas que un cohete: si no tiene 4K, HDR10 y Dolby Vision, no es digno de sus ojos.",
    "cover": "/lan-party/danis.jpg",
    "scores": {
      "Injustice": 40,
      "Fifa": 40,
      "GT 7": 30,
      "Mario Kart": 30,
      "Bomberman": 20,
      "Fortnite": 20,
      "Mario Party": 40
    },
    "history": [0, 40, 80, 110, 140, 160, 180, 220, 220]
  },
  {
    "id": 1,
    "name": "Chillfar",
    "rol": "Rol: Informático de guardia y DJ espiritual del grupo.",
    "description": "El hacker de la LAN y alma de fiesta digital. Fan del Fortnite, amante del software libre (y del no tan libre también). Su lema: “Si se puede crackear, se puede disfrutar“. Sueña con vivir en Ibiza, entre beats de house y scripts en Python. Tiene más pelis en el disco duro que Netflix en la nube.",
    "cover": "/lan-party/roxo.JPG",
    "scores": {
      "Injustice": 30,
      "Fifa": 30,
      "GT 7": 40,
      "Mario Kart": 20,
      "Bomberman": 10,
      "Fortnite": 30,
      "Mario Party": 30
    },
    "history": [0, 30, 60, 100, 120, 130, 160, 190, 190]
  },
  {
    "id": 2,
    "name": "El Noyas",
    "rol": "Rol: Embajador de Nintendo y evangelizador oficial de la Switch.",
    "description": "Francotirador honorífico del grupo… aunque el blanco suele salir ileso por pura suerte. Fan incondicional de Nintendo, especialmente de Zelda: si no ha hablado de Hyrule hoy, es que está enfermo. En misión personal para que todos se compren la Switch 2 (“porque esta vez sí que va a ser la buena”). Apunta con el sniper como Link con los ojos vendados, pero eso sí, con estilo.",
    "cover": "/lan-party/noyas.JPG",
    "scores": {
      "Injustice": 10,
      "Fifa": 10,
      "GT 7": 20,
      "Mario Kart": 40,
      "Bomberman": 40,
      "Fortnite": 40,
      "Mario Party": 10
    },
    "history": [0, 10, 20, 40, 80, 120, 160, 170, 170]
  },
  {
    "id": 4,
    "name": "Eras",
    "rol": "Rol: Guía oficial de excursiones y consejero gastronómico.",
    "description": "El explorador del grupo, tanto en el juego como en la vida real. Juega al Fortnite cuando no está perdido en “The Forest” (literalmente). Dueño de la cuenta @gallegoviajero, conoce más rincones de Galicia que Google Maps. Experto en senderismo, comida rica y escapadas rurales con encanto. Si desaparece durante la LAN, probablemente esté buscando una ruta en Wikiloc o un pulpo á feira.",
    "cover": "/lan-party/pablo.JPG",
    "scores": {
      "Injustice": 20,
      "Fifa": 20,
      "GT 7": 10,
      "Mario Kart": 10,
      "Bomberman": 30,
      "Fortnite": 10,
      "Mario Party": 20
    },
    "history": [0, 20, 40, 50, 60, 90, 100, 120, 120]
  }
];

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

async function seedData() {
  console.log("Conectando con Firebase...");

  try {
    console.log("Autenticando...");
    try {
      // Intentar loguear con el usuario chillfar original
      await signInWithEmailAndPassword(auth, "chillfar@gmail.com", "XgnLestedo2025!");
      console.log("¡Autenticado como Chillfar!");
    } catch (err) {
      console.log("Fallo login de Chillfar, creando un bot temporal para subir datos...");
      try {
        await createUserWithEmailAndPassword(auth, "bot@xgnlestedo.com", "BotTemporal123!");
        console.log("Bot temporal creado y autenticado.");
      } catch (err2: any) {
        if (err2.code === "auth/email-already-in-use") {
          await signInWithEmailAndPassword(auth, "bot@xgnlestedo.com", "BotTemporal123!");
          console.log("Bot temporal autenticado.");
        } else {
          throw err2;
        }
      }
    }

    console.log("\nGuardando juegos en la colección 'games'...");
    for (const game of newGames) {
      await setDoc(doc(db, "games", game.name), game);
      console.log(`✅ Juego subido: ${game.name}`);
    }

    console.log("\nGuardando usuarios en la colección 'users'...");
    for (const user of newUsers) {
      await setDoc(doc(db, "users", String(user.id)), user);
      console.log(`✅ Usuario subido: ${user.name}`);
    }

    console.log("\n🎉 ¡Base de datos actualizada correctamente!");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error subiendo los datos:", error.message);
    process.exit(1);
  }
}

seedData();
