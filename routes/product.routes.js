const express = require("express");

const router = express.Router();

router.get("/");

router.get("/:productId");

router.post("/");

router.delete("/");

module.exports = router;
