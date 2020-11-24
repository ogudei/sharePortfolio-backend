const userSchema = require("../schemas/user");
const shareSchema = require("../schemas/share");
const userPortfolioSchema = require("../schemas/UserPortfolio");
const errorSchema = require("../schemas/error");

module.exports = {
  'userSchema': userSchema,
  'shareSchema': shareSchema,
  'userPortfolioSchema': userPortfolioSchema,
  'errorSchema': errorSchema
};
