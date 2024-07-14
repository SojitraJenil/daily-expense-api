var mongoose = require("mongoose");

var UsersSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  mobileNumber: { type: String },
});

module.exports = mongoose.model("users", UsersSchema);
