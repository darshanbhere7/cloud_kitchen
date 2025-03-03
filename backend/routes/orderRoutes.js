const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ Place Order
router.post("/", async (req, res) => {
  try {
    const { user, items, totalPrice } = req.body;
    
    if (!user || !items || !totalPrice) {
      return res.status(400).json({ message: "User, items, and total price are required" });
    }

    const newOrder = new Order({ user, items, totalPrice });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("items.food");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Update Order Status
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
