const mongoose = require("mongoose");
require("dotenv").config();

//console.log(process.env);
mongoose.connect(
  process.env.MONGODB_URI
  //  ||
  // "mongodb://127.0.0.1:27017/myKindofClean"
);

module.exports = mongoose.connection;
