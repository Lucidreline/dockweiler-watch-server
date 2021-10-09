const { schedule } = require("node-cron");
require("dotenv").config();
const devLog = require('./devLog')
const Product = require("../models/Product");
const PriceCheck = require("../models/PriceCheck");
const scrapePage = require("./scrapePage");
const {
  sendPriceIncreaseEmail,
  sendPriceDecreaseEmail,
} = require("./sendPriceEmail");

exports.schedulePriceChecks = () => {
  devLog(`Will be checking prices every ${process.env.PRICE_SCRAPE_FREQ}th hours.`)
  schedule(`0 */${process.env.PRICE_SCRAPE_FREQ} * * *`, () => {
    recordPrices();
  });
};

exports.createPriceCheck = async (price, productId) => {
  const newPriceCheck = new PriceCheck({
    timeStamp: Date.now(),
    price: price.value,
    onSale: price.onSale,
    product: productId,
  });

  await newPriceCheck.save();
};

const recordPrices = async () => {
  devLog(`Starting web scraping process...`)
  const allProducts = await Product.find({});

  allProducts.forEach(async (product) => {
    devLog(`Scraping ${product.name}.`)
    const { price } = await scrapePage(product.pageUrl);

    const newPriceCheck = new PriceCheck({
      timeStamp: Date.now(),
      price: price.value,
      onSale: price.onSale,
      product: product._id,
    });

    await newPriceCheck.save();
    devLog(`Saved ${product.name}'s $${newPriceCheck.price} price check.`)

    if (newPriceCheck.price != product.price.current) {
      if (newPriceCheck.price > product.price.current) {
        devLog(`Sending price increase email.`)
        sendPriceIncreaseEmail(
          product.name,
          product.price.current,
          newPriceCheck.price
        );
      }

      else if (newPriceCheck.price < product.price.current) {
        devLog(`Sending price decrease email.`)
        sendPriceDecreaseEmail(
          product.name,
          product.price.current,
          newPriceCheck.price
        );
      }

      product.price.current = newPriceCheck.price;
      await product.save();
    }
  });
};
