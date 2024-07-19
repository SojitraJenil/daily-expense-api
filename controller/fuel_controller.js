const Fuel = require("../model/fuel_model");

// Show all fuel details
exports.Show_all_Fuel_Details = async (req, res) => {
  try {
    const data = await Fuel.find();
    res.status(200).json({
      status: "all Fuel details fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.Add_Fuel_Detail = async (req, res) => {
  const { type, Currentkm, amount, mobileNumber, fuelVolume, fuelPrice } =
    req.body;

  try {
    // const average = (parseFloat(km) / parseFloat(fuelVolume)).toFixed(2);
    const newFuelDetail = new Fuel({
      Currentkm,
      fuelPrice,
      mobileNumber,
    });

    const savedFuelDetail = await newFuelDetail.save();
    res.status(201).json({
      status: "Fuel detail added successfully",
      data: savedFuelDetail,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.Update_Fuel_Detail = async (req, res) => {
  const { id } = req.params;
  const { type, Currentkm, amount, mobileNumber, fuelVolume, fuelPrice } =
    req.body;

  try {
    const updatedFuelDetail = await Fuel.findByIdAndUpdate(
      id,
      { type, Currentkm, amount, mobileNumber, fuelVolume, fuelPrice },
      { new: true, runValidators: true }
    );

    if (!updatedFuelDetail) {
      return res.status(404).json({
        status: "error",
        message: "Fuel detail not found",
      });
    }

    res.status(200).json({
      status: "Fuel detail updated successfully",
      data: updatedFuelDetail,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.Delete_Fuel_Detail = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFuelDetail = await Fuel.findByIdAndDelete(id);

    if (!deletedFuelDetail) {
      return res.status(404).json({
        status: "error",
        message: "Fuel detail not found",
      });
    }

    res.status(200).json({
      status: "Fuel detail deleted successfully",
      data: deletedFuelDetail,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
