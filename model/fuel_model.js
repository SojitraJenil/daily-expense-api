const mongoose = require("mongoose");

const BikeMileageSchema = mongoose.Schema({
  type: { type: String },
  Currentkm: { type: String, required: true },
  average: { type: String },
  fuelPrice: { type: String, required: true },
  fuelVolume: { type: String },
  mobileNumber: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("BikeMileage", BikeMileageSchema);
