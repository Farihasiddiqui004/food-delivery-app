import jwt from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
//import { loginUser } from "./userController.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// palcing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
  
    try {
      // Extract the token from headers
      const userId = req.userId || req.user?.id; // ✅ safer fallback

  
      // Check if userId exists
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
      }
  
      // Create the new order with the userId from the decoded token
      const newOrder = new orderModel({
        userId: userId,  // ✅ now using correct one
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address
      });
      await newOrder.save();
  
      // Clear cart data after placing the order
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
  
      const line_items = req.body.items.map((item) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.name
          },
          unit_amount: item.price * 100 * 280
        },
        quantity: item.quantity
      }));
  
      // Add delivery charges to line_items
      line_items.push({
        price_data: {
          currency: "pkr",
          product_data: {
            name: "Delivery Charges"
          },
          unit_amount: 5 * 100 * 280
        },
        quantity: 1
      });
  
      // Create the Stripe session
      const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      });
  
      res.json({ success: true, session_url: session.url });
    } catch (error) {
      console.log("ORDER ERROR:", error); // 👈 add this
      res.status(500).json({ success: false, message: "Error", error: error.message });
    }    
  };

  const verifyOrder = async (req,res) => {
    const {orderId,success} =req.body;
    try {
      if (success == 'true') {
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
      }
      else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"Not Paid"})
      }
    } catch {
      console.log(error)
      res.json({success:false,message:"Error"})
    }
  }

  // users orders for frontend
  const userOrders = async (req,res) => {
    try {
      const orders = await orderModel.find({userId:req.userId})
      res.json({success:true,data:orders})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"})
    }
  }

  // Listing orders for admin panel
  const listOrders = async (req,res) => {
    try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:'Error'})
    }
  }

  // api for updating order status
  const updateStatus = async (req,res) => {
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"Status Updated"})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
    }
  }
  
export {placeOrder, verifyOrder,userOrders,listOrders,updateStatus}