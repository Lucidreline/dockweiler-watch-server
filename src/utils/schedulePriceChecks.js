const { schedule } = require("node-cron");
require("dotenv").config();
const Product = require("../models/Product");
const PriceCheck = require("../models/PriceCheck");
const scrapePage = require("./scrapePage");
const {
  sendPriceIncreaseEmail,
  sendPriceDecreaseEmail,
} = require("./sendPriceEmail");

const schedulePriceChecks = () => {
  schedule(`* */${process.env.PRICE_SCRAPE_FREQ} * * *`, () => {
    recordPrices();
  });
};

const recordPrices = async () => {
  const allProducts = await Product.find({});

  allProducts.forEach(async (product) => {
    const { price } = await scrapePage(product.pageUrl);

    const newPriceCheck = new PriceCheck({
      timeStamp: Date.now(),
      price: price.value,
      onSale: price.onSale,
      product: product._id,
    });

    await newPriceCheck.save();

    if (newPriceCheck.price != product.price.current) {
      if (newPriceCheck.price > product.price.current)
        sendPriceIncreaseEmail(
          product.name,
          product.price.current,
          newPriceCheck.price
        );
      else if (newPriceCheck.price < product.price.current)
        sendPriceDecreaseEmail(
          product.name,
          product.price.current,
          newPriceCheck.price
        );

      product.price.current = newPriceCheck.price;
      await product.save();
    }
  });
};

module.exports = schedulePriceChecks;
