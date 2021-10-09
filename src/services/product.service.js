const Product = require("../models/Product");
const scrapePage = require("../utils/scrapePage");
const { createPriceCheck } = require("../utils/schedulePriceChecks");
const devLog = require("../utils/devLog");

exports.getAllProducts = () => Product.find({});

exports.getProductById = (productId) => Product.findById(productId);

exports.createProduct = async (productUrl) => {
  devLog(`Scraping new product: ${productUrl}.`)
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

  devLog(`Successfully scraped ${newProduct.name}.`)

  const createdProduct = await newProduct.save();

  await createPriceCheck(price, createdProduct._id);
  devLog(`Added ${newProduct.name} and it's price check to database.`)

  // add product to database
  return createdProduct;
};

exports.deleteProduct = (productId) => {
  Product.deleteById(productId);
};
