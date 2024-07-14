var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  body: { type: String },
  postId: { type: String },
  user: {
    username: { type: String },
  },
});

module.exports = mongoose.model("", UserSchema);
