const { initializeApp } = require("firebase/app");
const { getFirestore, doc, getDoc } = require("firebase/firestore");
// We need to fetch the firebase config from the project.
const fs = require("fs");

const fileContent = fs.readFileSync("./src/firebase.ts", "utf-8");
const configMatch = fileContent.match(/const firebaseConfig = (\{[\s\S]*?\});/);
if (configMatch) {
  const configStr = configMatch[1].replace(/import\.meta\.env\.VITE_FIREBASE_([A-Z_]+)/g, (match, p1) => {
    // we don't have the env vars here easily, let's just abort this and use a different strategy
    return `"${match}"`;
  });
}
