// sendNotification.js
import { messaging } from "./fcm_config.js";

// Function to send a notification
export async function sendNotification() {
  try {
    const response = await messaging.send({
      token:
        "fCTJqPpVQfyGXJjhDpUVHc:APA91bF0Dbl6GSIbfLe5mOfIHlz4sTnF3VSbYGo0x5eFfFQXGkgu45nAhN5srBuaFh6feYtCuV5hs40gOxRKCmN-RuaqhUKUmFiuzv3Xe8QEyAmM2dvKXx8",
      notification: {
        title: "test",
        body: "test",
      },
      //   data: payload.data || {}, // Additional data (if any)
    });
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
