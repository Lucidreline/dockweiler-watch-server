const express = require("express");
const connectDB = require("./config/connectDB");
const { schedulePriceChecks } = require("./utils/schedulePriceChecks");
const productRoutes = require("./routes/product.routes");
const pricecheckRoutes = require("./routes/priceCheck.routes");
const cors = require('cors')

const app = express();

connectDB();

app.use(express.json());
app.use(cors())

schedulePriceChecks();

app.use("/api/products", productRoutes);
app.use("/api/pricechecks", pricecheckRoutes);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
