const Product = require("../models/Product");

exports.getAllProducts = () => Product.find({});

exports.getProductById = (productId) => Product.findById(productId);

exports.createProduct = (productUrl) => {
  // scrape page()
  // extract Product Model information from scrapePage()
  // add product to database
};

exports.deleteProduct = (productId) => {
  Product.deleteById(productId);
};
