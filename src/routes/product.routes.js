const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
} = require("../services/product.service");

const router = express.Router();

router.get("/", (req, res) => res.json(getAllProducts()));

router.get("/:productId", (req, res) => res.json(getProductById(productId)));

router.post("/", async (req, res) =>
  res.json(await createProduct(req.body.productUrl))
);

router.delete("/", (req, res) => res.json(deleteProduct(productId)));

module.exports = router;
