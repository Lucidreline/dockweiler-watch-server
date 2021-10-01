const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const priceCheckSchema = new Schema({
  timeStamp: Number,
  price: Number,
  onSale: Boolean,
  product: mongoose.Types.ObjectId,
});

const PriceCheck = model("PriceCheck", priceCheckSchema);

module.exports = PriceCheck;
