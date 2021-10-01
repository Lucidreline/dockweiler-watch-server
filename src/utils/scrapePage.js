const puppeteer = require("puppeteer");

const scrapePage = async (pageUrl) => {
  const results = {};

  // browser setup
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(pageUrl, { waitUntil: "networkidle0" });

  // grab results
  results.name = await getName(page);
  results.imageUrl = await getMainImageurl(page);
  results.price = await getPrice(page);

  await browser.close();

  return results;
};

const getName = async (page) => {
  const nameElement = await page.$("h1.product-main-info__name");
  const txtData = await nameElement.getProperty("textContent");
  const txt = await txtData.jsonValue();
  return await txt.trim();
};

const getMainImageurl = async (page) => {
  const imageElement = await page.$(
    "body > div.js-device-info > main > div.product-details.container.clearfix.js-show-stock-info > div > div > div.col-xs-12.col-sm-7.col-sm-height.col-top.js-image-gallery.image-gallery.image-gallery__main > div > div > div > div > div.item.js-zoom-img.slick-slide.slick-current.slick-active > a > picture > img"
  );
  const srcData = await imageElement.getProperty("src");
  const src = await srcData.jsonValue();
  return src;
};

const getPrice = async (page) => {
  const result = { onSale: true };

  const specialPrice = await page.$(".was-price-present.hide");
  if (specialPrice) result.onSale = false;

  const priceElement = await page.$("span.bfx-price");
  const txtData = await priceElement.getProperty("textContent");
  txt = await txtData.jsonValue();
  txt = txt.substring(1); // removes the dollar sign
  result.price = Number(txt);

  return result;
};

module.exports = scrapePage;
