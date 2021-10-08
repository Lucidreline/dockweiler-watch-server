const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProduct,
} = require("../services/product.service");

const router = express.Router();

router.get("/", async (req, res) => res.json(await getAllProducts()));

router.get("/:productId", async (req, res) =>
  res.json(await getProductById(productId))
);

router.post("/", async (req, res) =>
  res.json(await createProduct(req.body.productUrl))
);

router.delete("/", async (req, res) =>
  res.json(await deleteProduct(productId))
);

module.exports = router;
