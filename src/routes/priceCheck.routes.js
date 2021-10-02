const express = require("express");
const {
  getAllPriceChecks,
  getPriceCheckById,
  getAllPriceChecksForProduct,
  deletePriceCheckById,
  deletePriceChecksForProduct,
} = require("../services/priceCheck.service");

const router = express.Router();

router.get("/", (req, res) => res.json(getAllPriceChecks()));

router.get("/:id", (req, res) => res.json(getPriceCheckById()));

router.get("/product/:productId", (req, res) =>
  res.json(getAllPriceChecksForProduct())
);

router.delete("/:id", (req, res) => res.json(deletePriceCheckById()));

router.delete("/product/:productId", (req, res) =>
  res.json(deletePriceChecksForProduct())
);

module.exports = router;
