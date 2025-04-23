import foodModel from "../models/foodModel.js";

// Add food item
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    console.log("Body received:", req.body);
    

    if (!req.file) {
      console.log("❌ No image file received.");
      return res.status(400).json({ message: "No image file uploaded." });
    }

    const imageUrl = req.file.path;
    console.log("Image URL:", imageUrl);

    const newFoodItem = new foodModel({
      name,
      description,
      price,
      image: imageUrl,
      category,
    });

    await newFoodItem.save();
    console.log("✅ Food item saved to DB");
    res.status(201).json(newFoodItem);
  } catch (error) {
    console.error("🔥 Error in addFood:", error);
    res.status(500).json({ message: "Error adding food item" });
  }
};

// Get all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const foods = await foodModel.findById(req.body.id);
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
