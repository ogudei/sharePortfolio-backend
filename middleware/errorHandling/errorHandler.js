const orm = require("../../orm/methods");
const NotificationType = require("../../constants/notificationType");
const responseCreator = require("../../utils/responseCreator").responseCreator;
const notificationCreator = require("../../utils/responseCreator")
  .notificationCreator;

const handleErrors = async (err, req, res, next) => {
  let notification = notificationCreator(
    undefined,
    undefined,
    undefined,
    err.message
  );
  let element={
      userId:req.id,
      errorValue:err.value.stack
  }
  await orm.createBySchema('errorSchema',element)
  let response = responseCreator(NotificationType.ERROR, notification, {});
  res.status(500).send(response);
};
module.exports = handleErrors;
