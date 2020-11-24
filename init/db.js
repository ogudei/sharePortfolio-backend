const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/sharePortfolio",
  { useNewUrlParser: true },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("db started...");
  }
);
