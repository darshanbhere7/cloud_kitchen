const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// ✅ Get All Foods
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Add a Food Item
router.post("/", async (req, res) => {
  try {
    const { name, category, price, image, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const newFood = new Food({ name, category, price, image, description });
    await newFood.save();
    res.status(201).json({ message: "Food item added successfully", food: newFood });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Update Food Item
router.put("/:id", async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFood) return res.status(404).json({ message: "Food item not found" });

    res.status(200).json({ message: "Food item updated", food: updatedFood });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Delete Food Item
router.delete("/:id", async (req, res) => {
  try {
    const deletedFood = await Food.findByIdAndDelete(req.params.id);
    if (!deletedFood) return res.status(404).json({ message: "Food item not found" });

    res.status(200).json({ message: "Food item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
