class ShareModel {
  constructor(
    title = null,
    symbol = null,
    purchasePrice = null,
    numberOfShares = null
  ) {
    this.title = title;
    this.symbol = symbol;
    this.purchasePrice = purchasePrice;
    this.numberOfShares = numberOfShares;
  }
}

module.exports=ShareModel;
