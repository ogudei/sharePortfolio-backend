
const signUp = (req) => {
  let errorStack = [];

  if (Object.prototype.toString.call(req.body.email) != "[object String]") {
    errorStack.push({
      value : req.body.email,
      msg : "Email Error"
    });
  }
  // else if (Object.prototype.toString.call(req.body.email) == "[object String]"){
  //   //email kontrol
  // }
  if (Object.prototype.toString.call(req.body.username) != "[object String]") {
    errorStack.push({
      value : req.body.username,
      msg : "Username Error"
    });
  }else if (Object.prototype.toString.call(req.body.username) == "[object String]") {
    if (req.body.username.length<5) {
      errorStack.push({
        value : req.body.username,
        msg : "Username must be least 5 characters"
      });
    }
  }
  if (Object.prototype.toString.call(req.body.password) != "[object String]") {
    errorStack.push({
      value : req.body.password,
      msg : "Password Error"
    });
  }else if (Object.prototype.toString.call(req.body.password) == "[object String]") {
    if (req.body.password.length<5) {
      errorStack.push({
        value : req.body.password,
        msg : "Password must be least 5 characters"
      });
    }

  }
  return errorStack
};

module.exports = {
  signUp
};
