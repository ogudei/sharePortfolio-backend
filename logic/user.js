const NotificationType = require("../constants/notificationType");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const orm = require("../orm/methods");
const { isNullOrUndefined } = require("../utils/object");
const tokenGenerator = require("hiz").objectId;

async function signIn(userReq) {
  throw new Error
  // let isAuthenticated = false;
  // let user = await orm.findOneBySchema("userSchema", "email", userReq.email);
  // if (!user) {
  //   return {
  //     value: {},
  //     result: NotificationType.INFO,
  //   };
  // } else {
  //   isAuthenticated = await bcrypt
  //     .compare(userReq.password, user.password)
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  //   if (isAuthenticated) {
  //     let token = tokenGenerator();
  //     let updateResult = await orm.findOneAndUpdateBySchema(
  //       "userSchema",
  //       { _id: user._id },
  //       { token: token }
  //     );
  //     if (updateResult) {
  //       return {
  //         value: user._id + "." + token,
  //         result: NotificationType.SUCCESS,
  //       };
  //     } else
  //       return {
  //         value: {},
  //         result: NotificationType.ERROR,
  //       };
  //   } else {
  //     return {
  //       value: {},
  //       result: NotificationType.WARNING,
  //     };
  //   }
  // }
}

async function signUp(userReq) {
  let user = null;
  user = await orm.findOneBySchema("userSchema", "email", userReq.email);
  if (user) {
    return {
      value: {},
      result: NotificationType.INFO,
    };
  } else {
    user = await orm.findOneBySchema("userSchema", "username", userReq.email);
    if (user) {
      return {
        value: {},
        result: NotificationType.INFO,
      };
    }
    let password = await bcrypt
      .hash(userReq.password, saltRounds)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
    userReq.password = password;
    userReq.token = tokenGenerator();
    let result = await orm.createBySchema("userSchema", userReq);
    if (result._doc) {
      return {
        value: result._id + "." + userReq.token,
        result: NotificationType.SUCCESS,
      };
    } else
      return {
        value: {},
        result: NotificationType.ERROR,
      };
  }
}

async function isPortfolioExist(userId,companyId) {
  let userPortfolio = await orm.findOneByJSON("userPortfolioSchema", {
    companyId: companyId,
    userId: userId,
  });
  if (isNullOrUndefined(userPortfolio)) {
    return false;
  }
  return true;
}

module.exports = {
  signIn,
  signUp,
  isPortfolioExist
};
