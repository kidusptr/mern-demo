import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola migo!");
});

app.post("/api/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ message: "Please make sure to provide all necessary fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(1000, () => {
  connectDB();
  console.log("Server started on port 1111");
});
