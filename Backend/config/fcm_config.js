// firebase.js
import admin from "firebase-admin";
import { readFileSync } from "fs";

// Load the service account key
const serviceAccount = JSON.parse(
  readFileSync(new URL("./adminkey.json", import.meta.url), "utf8")
);

// Initialize Firebase Admin SDK
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Fcm initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

// Export the Firebase messaging service
export const messaging = admin.messaging();
