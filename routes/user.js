const express = require("express");
const NotificationType = require("../constants/notificationType");
const validate = require("../middleware/validation/validates/user").validate;

const responseCreator = require("../utils/responseCreator").responseCreator;
const userLogic = require("../logic/user");
const User = require("../logicModels/User");
const notificationCreator = require("../utils/responseCreator")
  .notificationCreator;
const errorHandler = require("../middleware/errorHandling/errorHandler");

const userRouter = express.Router();
userRouter.use(validate);

userRouter.post("/signin", async (req, res, next) => {
  try {
    let response = null;
    let status = null;
    let notification = null;
    if (req.validationErrors.length > 0) {
      response = responseCreator(
        NotificationType.ERROR,
        notificationCreator(
          undefined,
          undefined,
          undefined,
          "Validation Error"
        ),
        req.validationErrors
      );

      status = 443;
    } else {
      let user = new User(req.body.email, req.body.password, req.body.token);
      let signed = await userLogic.signIn(user);
      notification = notificationCreator(
        "Giriş başarılı",
        "Kullanıcı Adı veya Şifre yanlış",
        "Giriş yapılırken hata ile karşılaşıldı",
        "Token güncellenirken hata ile karşılaşıldı."
      );
      status = 200;
      response = responseCreator(signed.result, notification, signed.value);
    }
    res.status(status).send(response);
  } catch (error) {
    let errorObj = {
      message: "Error occured when signIn",
      value: error,
    };
    next(errorObj);
  }
});

userRouter.post("/signup", async (req, res, next) => {
  try {
    let response = null;
    let status = null;
    let notification = null;
    if (req.validationErrors.length > 0) {
      response = responseCreator(
        NotificationType.ERROR,
        notificationCreator(
          undefined,
          undefined,
          undefined,
          "Validation Error"
        ),
        req.validationErrors
      );

      status = 443;
    } else {
      let user = new User(
        req.body.email,
        req.body.password,
        req.body.username,
        undefined,
        [],
        []
      );
      let signedUp = await userLogic.signUp(user);
      notification = notificationCreator(
        "Kullanıcı başarı ile oluşturuldu",
        "Kullanıcı Mevcut",
        undefined,
        "Kullanıcı oluşturulurken problem oluştu"
      );
      status = 200;
      response = responseCreator(signedUp.result, notification, signedUp.value);
    }
    res.status(status).send(response);
  } catch (error) {
    let errorObj = {
      message: "Error occured when signUp",
      value: error,
    };
    next(errorObj);
  }
});
userRouter.use(errorHandler);

module.exports = userRouter;
