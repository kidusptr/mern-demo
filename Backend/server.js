import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;

app.use(express.json());
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hola migo!");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server started on port " + PORT);
});
