const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPortfolioSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User required."],
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: [true, "Share required."],
  },
  title: {
    type: String,
    required: [true, "Title required."],
  },
  symbol: {
    type: String,
    required: [true, "Symbol required."],
  },
  numberOfShares: {
    type: Number,
    required: [true, "Number Of Shares required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});
module.exports = UserPortfolio = mongoose.model("UserPortfolios", UserPortfolioSchema);

