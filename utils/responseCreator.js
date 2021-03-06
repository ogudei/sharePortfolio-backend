const NotificationType = require("../constants/notificationType");

const notificationCreator = (success, info, warning, err) => {
  let result = {
    SUCCESS: success,
    INFO: info,
    WARNING: warning,
    ERROR: err,
  };

  return result;
};

const responseCreator = (result, messageParam, value) => {
  let type = undefined;
  let isValid = undefined;
  let message = undefined;
  if (result === NotificationType.SUCCESS) {
    type = NotificationType.SUCCESS;
    message = messageParam.SUCCESS;
    isValid = 1;
  } else if (result === NotificationType.INFO) {
    message = messageParam.INFO;
    type = NotificationType.INFO;
    isValid = 0;
  } else if (result === NotificationType.WARNING) {
    message = messageParam.WARNING;
    type = NotificationType.WARNING;
    isValid = -1;
  }
  else if (result === NotificationType.ERROR) {
    message = messageParam.ERROR;
    type = NotificationType.ERROR;
    isValid = -2;
  }
  let notification = {
    message: message,
    type: type,
  };
  let response = {
    notification: notification,
    isValid: isValid,
    value: value,
  };
  return response;
};

module.exports = {
  responseCreator,
  notificationCreator,
};
