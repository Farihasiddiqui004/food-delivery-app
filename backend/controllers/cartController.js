import userModel from "../models/userModel.js"

// Add item to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId); // ✅ fixed
        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData }); // ✅ fixed
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId); // ✅ fixed
        let cartData = userData.cartData || {};

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId]; // optional: remove item if quantity is 0
            }
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData }); // ✅ fixed
        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Get user cart
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId); // ✅ fixed
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };
