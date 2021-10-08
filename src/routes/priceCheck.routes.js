const express = require("express");
const {
  getAllPriceChecks,
  getPriceCheckById,
  getAllPriceChecksForProduct,
  deletePriceCheckById,
  deletePriceChecksForProduct,
} = require("../services/priceCheck.service");

const router = express.Router();

router.get("/", async (req, res) => res.json(await getAllPriceChecks()));

router.get("/:id", async (req, res) => res.json(await getPriceCheckById()));

router.get("/product/:productId", async (req, res) =>
  res.json(await getAllPriceChecksForProduct())
);

router.delete("/:id", async (req, res) =>
  res.json(await deletePriceCheckById())
);

router.delete("/product/:productId", async (req, res) =>
  res.json(await deletePriceChecksForProduct())
);

module.exports = router;
