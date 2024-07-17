const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: String, required: true },
  desc: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  mobileNumber: { type: String, required: true },
});

module.exports = mongoose.model("Expense", UsersSchema);
