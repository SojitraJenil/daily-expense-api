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

exports.Show_Fuel_Details_By_MobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.params; // or req.query depending on how you pass the mobile number
    // Find fuel details by mobile number
    const data = await Fuel.find({ mobileNumber });

    if (data.length === 0) {
      return res.status(404).json({
        status: "No fuel details found for this mobile number",
      });
    }

    res.status(200).json({
      status: "Fuel details retrieved successfully",
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
  const { Currentkm, amount, mobileNumber, fuelVolume, fuelPrice } = req.body;

  try {
    // Calculate price per liter
    const pricePerLiter = (parseFloat(amount) / parseFloat(fuelVolume)).toFixed(
      2
    );

    // Calculate the current average fuel consumption
    const currentAvg = (parseFloat(Currentkm) / parseFloat(fuelVolume)).toFixed(
      2
    );

    // Find all fuel details for the given mobile number (bike)
    const allFuelDetails = await Fuel.find({ mobileNumber });

    // Calculate the total amount spent on fuel
    const totalAmountSpent =
      allFuelDetails.reduce(
        (total, detail) => total + parseFloat(detail.amount),
        0
      ) + parseFloat(amount);

    const newFuelDetail = new Fuel({
      Currentkm,
      fuelPrice,
      fuelVolume,
      amount,
      mobileNumber,
      pricePerLiter,
      currentAvg,
    });

    const savedFuelDetail = await newFuelDetail.save();

    res.status(201).json({
      status: "Fuel detail added successfully",
      data: {
        fuelDetail: savedFuelDetail,
        totalAmountSpent: totalAmountSpent,
        pricePerLiter: pricePerLiter,
        currentAvg: currentAvg,
      },
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
