const rules = require("../rules/user");

const validate = (req, res, next) => {
  let errors=[]

  if (req.originalUrl=='/signUp') {
    errors = rules.signUp(req)
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

