import dotenv from "dotenv";
dotenv.config();
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
  console.error("cloudinary credentials are missing from the enviroment variable");
  process.exit(1);
}

// Cloudinary storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "food_images", // The folder in Cloudinary where images will be stored
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed image formats
    
  },
});

const upload = multer({
  storage: storage,
   limits: { fileSize: 5 * 1024 * 1024 }, // Max file size of 5MB
}).single("image"); // Expecting a single image field named "image"

const foodRouter = express.Router();

// Route to add a food item with an image
foodRouter.post("/add", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Error uploading image", error: err.message });
    }
    // Proceed to add food after the image is uploaded
    addFood(req, res);
  });
});

// Other routes (list and remove food items)
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
