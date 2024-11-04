// sendNotification.js
import { messaging } from "./fcm_config.js";

// Function to send a notification
export async function sendNotification(token, title, body) {
  try {
    const response = await messaging.send({
      token: token,
      notification: {
        title: title,
        body: body,
      },
      data: {
        url: "https://mern-demo-kkmv.onrender.com/add",
      }, // Additional data (if any)
    });
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
