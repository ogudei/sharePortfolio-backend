const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "E-mail required."],
  },
  username: {
    type: String,
    required: [true, "Username required."],
  },
  password: {
    type: String,
    required: [true, "Password required."],
  },
  token: {
    type: String,
  },
  cash: {
    type: Number,
    required: [true, "Cash required."],
		default: 5000
	},
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  shares: Object,
  updatedAt: Date,
  isActive: Boolean,
});

module.exports = user = mongoose.model("users", userSchema);

