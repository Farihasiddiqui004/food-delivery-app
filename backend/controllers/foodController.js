import { log } from "console";
import foodModel from "../models/foodModel.js";
//import fs from 'fs'

//add food item

const addFood = async (req, res) => {
  try {
    const { name, description, price, category  } = req.body;

    // Cloudinary image URL
    const imageUrl = req.file.path;

    const newFoodItem = new foodModel({
      name,
      description,
      price,
      image: imageUrl,
      category, 
    });

    await newFoodItem.save();
    res.status(201).json(newFoodItem);
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
