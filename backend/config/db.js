const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (e) {
    console.log("MONGODB FAILED TO CONNECT",e);
  }
};

module.exports = connectDB;
