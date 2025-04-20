import { log } from "console";
import foodModel from "../models/foodModel.js";
//import fs from 'fs'

//add food item

export const addFood = async (req, res) => {
    try {
      const { name, description, price } = req.body;
  
      // Get the Cloudinary image URL from the request
      const imageUrl = req.file.path;  // This is the Cloudinary URL
  
      // Save food item with image URL in database
      const newFoodItem = new Food({
        name,
        description,
        price,
        image: imageUrl, // Save the Cloudinary URL in the database
      });
  
      await newFoodItem.save();
      res.status(201).json(newFoodItem); // Return the newly added food item
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error adding food item" });
    }
  };
  

// all food list
const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// remove food item

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        // fs.unlink(`uploads/${food.image}`,()=>{}) // comment this line

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export {addFood,listFood,removeFood}
