import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1000;
const __dirname = path.resolve();

app.use(express.json());
app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
  });
}

app.get("/", (req, res) => {
  res.send("Hola migo!");
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server started on port " + PORT);
});
