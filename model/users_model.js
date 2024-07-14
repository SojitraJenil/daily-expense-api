var mongoose = require("mongoose");

var UsersSchema = mongoose.Schema({
  "firstName": { type: String },
  "lastName": { type: String },
  "maidenName": { type: String },
  "age": { type: String },
  "gender": { type: String },
  "email": { type: String },
  "phone": { type: String },
  "username": { type: String },
  "password": { type: String },
  "birthDate": { type: String },
  "image": { type: String },
  "bloodGroup": { type: String },
  "height": { type: String },
  "weight": { type: String },
  "eyeColor": { type: String },
  "hair": {
    "color": { type: String },
    "type": { type: String }
  },
  "domain": { type: String },
});

module.exports = mongoose.model("users", UsersSchema);
