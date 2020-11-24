const express = require("express");
const { userAuthLayer } = require("../middleware/auth/userAuth");
const validate = require("../middleware/validation/validates/share").validate;
const errorHandler = require("../middleware/errorHandling/errorHandler");

const responseCreator = require("../utils/responseCreator").responseCreator;
const notificationCreator = require("../utils/responseCreator")
  .notificationCreator;

const NotificationType = require("../constants/notificationType");
const shareLogic = require("../logic/share");
const Share = require("../logicModels/Share");

setInterval(async () => {
  await shareLogic.updateShares();
}, 5000);

const shareRouter = express.Router();
shareRouter.use(userAuthLayer);

shareRouter.use(validate);
shareRouter.post("/registerShare", async (req, res,next) => {
  try {
    let response = null;
    let status = null;
    let notification = null;
    req.validationErrors = await req.validationErrors;
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
      let share = new Share(
        req.body.title,
        req.body.symbol,
        req.body.purchasePrice,
        req.body.numberOfShares
      );
      let result = await shareLogic.addShare(share);
      notification = notificationCreator(
        "Share registered successfully",
        undefined,
        undefined,
        "Error occured when register share"
      );
      status = 200;
      response = responseCreator(result, notification, notification.message);
    }
    res.status(status).send(response);
  } catch (error) {
    let errorObj = {
      message: "Error occured when register share",
      value: error,
    };
    next(errorObj);
  }
});

shareRouter.post("/buyShare", async (req, res,next) => {
  try {
    let response = null;
    let status = null;
    let notification = null;
    req.validationErrors = await req.validationErrors;

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
      let result = await shareLogic.buyShare(
        req.body.companyId,
        req.user,
        req.body.amount
      );
      notification = notificationCreator(
        "Share buying completed",
        undefined,
        "Money or amount is not available to buy",
        "Error occured when buying share"
      );
      status = 200;
      response = responseCreator(result, notification, notification.message);
    }
    res.status(status).send(response);
  } catch (error) {
    let errorObj = {
      message: "Error occured when buying share",
      value: error,
    };
    next(errorObj);
  }
});

shareRouter.post("/sellShare", async (req, res, next) => {
  try {
    let response = null;
    let status = null;
    let notification = null;
    req.validationErrors = await req.validationErrors;

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
      let result = await shareLogic.sellShare(
        req.body.companyId,
        req.user,
        req.body.amount
      );
      notification = notificationCreator(
        "Share selling completed",
        undefined,
        "Amount is not available to sell",
        "Error occured when selling share"
      );
      status = 200;
      response = responseCreator(result, notification, notification.message);
    }
    res.status(status).send(response);
  } catch (error) {
    let errorObj = {
      message: "Error occured when selling share",
      value: error,
    };
    next(errorObj);
  }
});

shareRouter.use(errorHandler);

module.exports = shareRouter;
