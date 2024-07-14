var mongoose = require("mongoose");

var userschema = mongoose.Schema({
    "title":{type:String},
    "description":{type:String},
    "price":{type:String},
    "discountPercentage":{type:String},
    "rating":{type:String},
    "stock":{type:String},
    "brand":{type:String},
    "category":{type:String},
    "thumbnail":{type:String},
    "images":{type:String},
})

module.exports = mongoose.model("product",userschema);