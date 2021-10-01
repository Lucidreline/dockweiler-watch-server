const puppeteer = require("puppeteer");

const scrapePage = async (pageUrl) => {
  const results = {};

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://news.ycombinator.com", {
    waitUntil: "networkidle2",
  });
  await page.pdf({ path: "hn.pdf", format: "a4" });

  await browser.close();

  // find name

  // find image url

  // find price

  return results;
};

module.exports = scrapePage;
