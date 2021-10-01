const { Console } = require("console");
const mongoose = require("mongoose");

const connectDB = () => {
  const mongoUrl = "mongodb://admin:password@db:27017/?authSource=admin";
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("Connected to DB"))
    .catch((err) => Console.log(`Failed to connect to db: ${err.message}`));
};
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);

module.exports = connectDB;
