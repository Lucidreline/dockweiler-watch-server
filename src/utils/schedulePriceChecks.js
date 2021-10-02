const { schedule } = require("node-cron");
const Product = require("../models/Product");
const PriceCheck = require("../models/PriceCheck");
const scrapePage = require("./scrapePage");

const schedulePriceChecks = () => {
  schedule("0 */12 * * *", async () => {
    await recordPrices();
    console.log(await PriceCheck.find({}));
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
      product.price.current = newPriceCheck.price;
      await product.save();
    }
  });
};

module.exports = schedulePriceChecks;
