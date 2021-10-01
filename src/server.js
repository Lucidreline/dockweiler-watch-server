const express = require("express");
const connectDB = require("./config/connectDB");
const productRoutes = require("./routes/product.routes");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
