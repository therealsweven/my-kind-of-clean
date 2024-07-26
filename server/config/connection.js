const mongoose = require("mongoose");
const config = require("config");

//console.log(process.env);
mongoose.connect(
  config.get("MONGODB_URI")
  //  ||
  // "mongodb://127.0.0.1:27017/myKindofClean"
);

module.exports = mongoose.connection;
