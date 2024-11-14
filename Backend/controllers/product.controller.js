import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { sendNotification } from "../config/send_notification.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    //await sendNotification();
    //console.log("Products:", products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  try {
    const product = await Product.findById(id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ message: "Please make sure to provide all necessary fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    if (product.fcmToken)
      sendNotification(
        product.fcmToken,
        "Success",
        "Your product was added successfully!!!"
      );
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ message: "Please make sure to provide all necessary fields" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    if (product.fcmToken)
      sendNotification(
        product.fcmToken,
        "Game time",
        "Time to play aviator!!!"
      );
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  console.log(id);
  try {
    await Product.findByIdAndDelete(id);
    if (product.fcmToken)
      sendNotification(
        product.fcmToken,
        "Deleted",
        "Product was deleted successfully!!!"
      );
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
