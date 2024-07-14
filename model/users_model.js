const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
});

module.exports = mongoose.model("users", UsersSchema);
