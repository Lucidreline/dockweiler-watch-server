const Product = require("../models/Product");
const scrapePage = require("../utils/scrapePage");

exports.getAllProducts = () => Product.find({});

exports.getProductById = (productId) => Product.findById(productId);

exports.createProduct = async (productUrl) => {
  const pageResults = await scrapePage(productUrl);
  const { price, ...results } = pageResults;

  const newProduct = new Product({
    ...results,
    pageUrl: productUrl,
    price: {
      current: price.value,
      initial: price.value,
    },
  });

  // add product to database
  return newProduct.save();
};

exports.deleteProduct = (productId) => {
  Product.deleteById(productId);
};
