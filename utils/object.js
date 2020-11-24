exports.isNullOrUndefined = (obj) => {
  return obj === null || obj === undefined;
};

exports.isUpperCase = (str) => {
  return str == str.toUpperCase() && str != str.toLowerCase();
};
