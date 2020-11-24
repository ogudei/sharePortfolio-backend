const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShareSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title required."],
  },
  symbol: {
    type: String,
    required: [true, "Symbol required."],
  },
  purchasePrice: {
    type: Number,
    required: [true, "Purchase Price required."],
  },
  numberOfShares: {
    type: Number,
    required: [true, "Number Of Shares required."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Share = mongoose.model("shares", ShareSchema);
