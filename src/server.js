const express = require("express");
const connectDB = require("./config/connectDB");
const productRoutes = require("./routes/product.routes");
const scrapePage = require("./utils/scrapePage");

const puppeteer = require("puppeteer");

const app = express();

connectDB();

async function ssr(url) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  console.log(await html);
}

ssr("https://developers.google.com/web/tools/puppeteer/articles/ssr");

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
