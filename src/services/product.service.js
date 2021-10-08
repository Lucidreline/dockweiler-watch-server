const Product = require("../models/Product");
const priceCheck = require("../models/PriceCheck");
const scrapePage = require("../utils/scrapePage");
const { createPriceCheck } = require("../utils/schedulePriceChecks");

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

  const createdProduct = await newProduct.save();

  await createPriceCheck(price, createdProduct._id);

  // add product to database
  return createdProduct;
};

exports.deleteProduct = (productId) => {
  Product.deleteById(productId);
};
