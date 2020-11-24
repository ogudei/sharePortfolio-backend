const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ErrorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User required."],
  },
  errorValue: {
    type: String,
    required: [true, "Error Value required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = errorSchema = mongoose.model("errors", ErrorSchema);
