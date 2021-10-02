const PriceCheck = require("../models/priceCheck");

exports.getAllPriceChecks = () => PriceCheck.find({});

exports.getPriceCheckById = (priceCheckId) => PriceCheck.findById(priceCheckId);

exports.getAllPriceChecksForProduct = (productId) =>
  PriceCheck.find({ id_: productId });

exports.deletePriceCheckById = (priceCheckId) =>
  PriceCheck.findByIdAndDelete(priceCheckId);

exports.deletePriceChecksForProduct = async (productID) =>
  PriceCheck.deleteMany({ _id: productID });
