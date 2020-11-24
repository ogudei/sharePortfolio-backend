shareRouter.post("/updateShare", async (req, res) => {
  let response = null;
  let status = null;
  let notification = null;
  req.validationErrors=await req.validationErrors

  if (req.validationErrors.length > 0) {
    response = responseCreator(
      NotificationType.ERROR,
      notificationCreator(undefined, undefined, undefined, "Validation Error"),
      req.validationErrors
    );
    status = 443;
  } else {
    let result = await shareLogic.updateShares(
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
});
