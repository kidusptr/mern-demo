// firebase.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Load the service account key
const serviceAccount = JSON.parse(process.env.ACCOUNT_KEY);
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
