/**
 * One-time setup script to create Firebase Auth users and send them
 * password reset emails so they can set their own passwords.
 *
 * Run with: node --loader ts-node/esm scripts/setup-firebase-users.ts
 * Or simply: npx tsx scripts/setup-firebase-users.ts
 */

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

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

const users = [
  { email: "chillfar@gmail.com", name: "Chillfar" },
  { email: "davidnoyapardo@gmail.com", name: "El Noyas" },
  { email: "danielfd86@gmail.com", name: "Goku (Danis)" },
  { email: "erasbrion@gmail.com", name: "Eras" },
];

const TEMP_PASSWORD = "XgnLestedo2025!";

async function setupUsers() {
  console.log("🔧 Creando usuarios en Firebase Auth...\n");

  for (const user of users) {
    try {
      await createUserWithEmailAndPassword(auth, user.email, TEMP_PASSWORD);
      console.log(`✅ ${user.name} (${user.email}) — creado`);

      // Sign out so we can create the next user
      await signOut(auth);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        console.log(`⚠️  ${user.name} (${user.email}) — ya existe, saltando`);
      } else {
        console.error(`❌ Error creando ${user.name}: ${err.message}`);
      }
    }
  }

  console.log("\n📧 Enviando emails de restablecimiento de contraseña...\n");

  for (const user of users) {
    try {
      await sendPasswordResetEmail(auth, user.email);
      console.log(`📬 Email enviado a ${user.name} (${user.email})`);
    } catch (err: any) {
      console.error(`❌ Error enviando email a ${user.name}: ${err.message}`);
    }
  }

  console.log("\n🎉 Setup completado!");
  console.log("Los usuarios recibirán un email para establecer su contraseña definitiva.");
  process.exit(0);
}

setupUsers();
