var mongoose = require("mongoose");

var userschema = mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("catagory", userschema);
