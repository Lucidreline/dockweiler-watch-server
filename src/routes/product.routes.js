const express = require("express");
const { getAllProducts } = require("../services/product.service");

const router = express.Router();

router.get("/", (req, res) => res.json(getAllProducts()));

router.get("/:productId", (req, res) => res.json(getProductById(productId)));

router.post("/", (req, res) => res.json(createProduct()));

router.delete("/", (req, res) => res.json(deleteProduct(productId)));

module.exports = router;
