const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: String,
  imageUrl: String,
  pageUrl: String,
  price: {
    current: Number,
    initial: Number,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
