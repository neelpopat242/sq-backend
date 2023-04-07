const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  price: {
    type: Number,
    required: [true],
    min: [1, "Price must be greater than 0"],
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;