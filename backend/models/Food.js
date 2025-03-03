const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // Example: 'Indian', 'Fast Food'
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL to image
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
