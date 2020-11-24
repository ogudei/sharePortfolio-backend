const rules = require("../rules/share");

const validate = (req, res, next) => {
  let errors=[]

  if (req.originalUrl=='/buyShare') {
    errors = rules.buyShare(req)
  }
  else if (req.originalUrl=='/registerShare') {
    errors = rules.registerShare(req);
  }
  else if (req.originalUrl=='/sellShare') {
    errors = rules.sellShare(req);
  }
  if (errors.length == 0) {
    req.validationErrors = [];
    return next();
  }
  req.validationErrors = errors;

  return next();
};

module.exports = { validate };
