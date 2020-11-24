const shareLogic = require("../../../logic/share");
const userLogic = require("../../../logic/user");
const { isUpperCase } = require("../../../utils/object");

const registerShare = async (req) => {
  let errorStack = [];
  let isExist;
  if (Object.prototype.toString.call(req.body.symbol) != "[object String]") {
    errorStack.push({
      value: req.body.symbol,
      msg: "Symbol Error",
    });
  } else if (
    Object.prototype.toString.call(req.body.symbol) == "[object String]"
  ) {
    if (isUpperCase(req.body.symbol) == false || req.body.symbol.length!=3) {
      if (isExist) {
        errorStack.push({
          value: req.body.symbol,
          msg: "Symbol's length must be 3 characters and symbol must be UPPERCASE",
        });
      }
    } else if (await shareLogic.isShareExist("symbol", req.body.symbol)) {
      errorStack.push({
        value: req.body.symbol,
        msg: "Symbol already in use",
      });
    }
  }
  if (Object.prototype.toString.call(req.body.title) != "[object String]") {
    errorStack.push({
      value: req.body.title,
      msg: "Title Error",
    });
  } else if (
    Object.prototype.toString.call(req.body.title) == "[object String]"
  ) {
    isExist = await shareLogic.isShareExist("title", req.body.title);
    if (isExist) {
      errorStack.push({
        value: req.body.title,
        msg: "Title already in use",
      });
    }
  }

  if (
    Object.prototype.toString.call(req.body.purchasePrice) != "[object Number]"
  ) {
    errorStack.push({
      value: req.body.purchasePrice,
      msg: "Purchase Price Error",
    });
  }
  if (
    Object.prototype.toString.call(req.body.numberOfShares) != "[object Number]"
  ) {
    errorStack.push({
      value: req.body.purchasePrice,
      msg: "Number Of Shares Error",
    });
  }
  return errorStack;
};

const buyShare = async (req) => {
  let errorStack = [];

  if (Object.prototype.toString.call(req.body.companyId) != "[object String]") {
    errorStack.push({
      value: "Error",
      msg: "Object Error",
    });
  } else if (
    Object.prototype.toString.call(req.body.companyId) == "[object String]"
  ) {
    if (!(await shareLogic.isShareExist("_id", req.body.companyId))) {
      errorStack.push({
        value: "Error",
        msg: "Share doesn't exist",
      });
    }
  }
  if (Object.prototype.toString.call(req.body.amount) != "[object Number]") {
    errorStack.push({
      value: req.body.amount,
      msg: "Amount Error",
    });
  } else if (
    Object.prototype.toString.call(req.body.amount) == "[object Number]"
  ) {
    if (req.body.amount <= 0) {
      errorStack.push({
        value: req.body.amount,
        msg: "Amount must be greater than 0",
      });
    }
  }
  return errorStack;
};

const sellShare = async (req) => {
  let errorStack = [];

  if (Object.prototype.toString.call(req.body.companyId) != "[object String]") {
    errorStack.push({
      value: "Error",
      msg: "Object Error",
    });
  } else if (
    Object.prototype.toString.call(req.body.companyId) == "[object String]"
  ) {
    if (!(await shareLogic.isShareExist("_id", req.body.companyId))) {
      errorStack.push({
        value: "Error",
        msg: "Share doesn't exist",
      });
    } else if (await userLogic.isPortfolioExist(req.id, req.body.companyId) == false) {
      errorStack.push({
        value: "Error",
        msg: "User Portfolio doesn't exist",
      });
    }
  }
  if (Object.prototype.toString.call(req.body.amount) != "[object Number]") {
    errorStack.push({
      value: req.body.amount,
      msg: "Amount Error",
    });
  } else if (
    Object.prototype.toString.call(req.body.amount) == "[object Number]"
  ) {
    if (req.body.amount <= 0) {
      errorStack.push({
        value: req.body.amount,
        msg: "Amount must be greater than 0",
      });
    }
  }
  return errorStack;
};

module.exports = {
  registerShare,
  buyShare,
  sellShare,
};
