const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

const connectToMongo = async () => {
  await mongoose.connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true },
    () => {
      console.log("Connected to MongoDB URI: ", process.env.MONGO_DB);
    }
  );
};

module.exports = connectToMongo;
