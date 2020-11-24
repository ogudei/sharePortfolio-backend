
//can be more optional
//just written for knowledge
//planing request throttle middleware but now its unnecessary 
const validate = (req, res, next) => {
  let errors = [];
  if (req.header("Content-Type") != 'application/json') {
    errors = ["request type should be json"];
  }
  if (errors.length != 0) {
    return res.status(400).send({ errors });
  }
  return next();
};
module.exports = { validate };
