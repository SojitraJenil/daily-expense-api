var mongoose = require("mongoose");


var UserSchema = mongoose.Schema({
    "title":{type:String},
      "body":{type:String},
      "userId":{type:String},
      "tags":{type:Array},
      "reactions": {type:String}
})

module.exports = mongoose.model("posts",UserSchema); 

