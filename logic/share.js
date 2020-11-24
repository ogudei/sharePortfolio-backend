const { isNullOrUndefined } = require("../utils/object");
const notificationType = require("../constants/notificationType");
const {generateInteger} = require("../utils/numberGenerator");

let orm = require("../orm/methods");
exports.addShare = async (share) => {
  return await orm.createBySchema("shareSchema", share);
};

exports.buyShare = async (companyId, user, amount) => {
  let share = await orm.findOneBySchema("shareSchema", "_id", companyId);

  let purchasePrice = share.purchasePrice;
  let numberOfShares = share.numberOfShares;
  if (numberOfShares < amount) {
    return notificationType.WARNING;
  }
  let totalPrice = amount * purchasePrice;
  if (user.cash < totalPrice) {
    return notificationType.WARNING;
  }

  try {
    let share =await orm.findOneAndUpdateBySchema(
      "shareSchema",
      { _id: companyId },
      { numberOfShares: numberOfShares - amount }
    );

    await orm.findOneAndUpdateBySchema(
      "userSchema",
      { _id: user._id },
      { cash: user.cash - totalPrice }
    );
    await orm.findOneAndUpdateBySchema(
      "userPortfolioSchema",
      { userId: user._id , companyId:companyId},
      {
        userId:user._id,
        '$inc' : {numberOfShares : amount},
        title: share.title,
        symbol: share.symbol,
        updatedAt: Date.now()
      },{upsert:true}
    );
    return notificationType.SUCCESS;
  } catch (error) {
    console.log(error);
    return notificationType.ERROR;
  }
};

exports.sellShare = async (companyId, user, amount) => {
  let share = await orm.findOneBySchema("shareSchema", "_id", companyId);
  let userPortfolio = await orm.findOneByJSON("userPortfolioSchema", {'companyId' : companyId, 'userId' : user._id});

  let sellingPrice = share.purchasePrice;
  let companySharesAmount = share.numberOfShares
  let numberOfShares = userPortfolio.numberOfShares;
  if (numberOfShares < amount) {
    return notificationType.WARNING;
  }
  let totalPrice = amount * sellingPrice;

  
    await orm.findOneAndUpdateBySchema(
      "shareSchema",
      { _id: companyId },
      { numberOfShares: companySharesAmount + amount }
    );

    await orm.findOneAndUpdateBySchema(
      "userSchema",
      { _id: user._id },
      { cash: user.cash + totalPrice }
    );
    let decreasedAmount = numberOfShares-amount

    await orm.findOneAndUpdateBySchema(
      "userPortfolioSchema",
      { 'userId': user._id , companyId:companyId},
      {
        numberOfShares:decreasedAmount,
        title: share.title,
        symbol: share.symbol,
        updatedAt: Date.now()
      },{upsert:true}
    );
    return notificationType.SUCCESS;
};

exports.updateShares = async () => {
try {
  let share = await orm.findAllBySchema("shareSchema");
  let promiseArray = []
  share.forEach(element => {
    let increasedPrice = generateInteger() + element.purchasePrice
    increasedPrice = increasedPrice > 0? increasedPrice : 0  
    let promise = orm.findOneAndUpdateBySchema(
      "shareSchema",
      { _id: element._id },
      { purchasePrice: increasedPrice }
    );
    promiseArray.push(promise) 
  });
  Promise.all(promiseArray).then((data)=>{
    console.log(data)
  })
  
} catch (error) {
  console.log(error);
  return notificationType.ERROR;
}
};
exports.isShareExist = async (key, value) => {
  let Share = await orm.findOneBySchema("shareSchema", key, value);
  if (!isNullOrUndefined(Share)) {
    return true;
  }
  Share = await orm.findOneBySchema("shareSchema", key, value);
  if (!isNullOrUndefined(Share)) {
    return true;
  }
  return false;
};
exports.shareRate = async (share) => {
  let Share = await orm.findOneBySchema("shareSchema", "symbol", share.symbol);
  return Share.numberOfShares;
};
