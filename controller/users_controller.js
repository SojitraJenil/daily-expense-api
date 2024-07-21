const User = require("../model/users_model");
const jwt = require("jsonwebtoken");

exports.showAllData = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json({
      status: "Data shown successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      status: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const EmailExisting = await User.findOne({ email });
    if (EmailExisting) {
      return res.status(400).json({ message: "email already exists" });
    }
    const user = new User({
      name,
      email,
      password,
      mobileNumber,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, "jenil", { expiresIn: "1h" });
    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ mobileNumber });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "jenil", { expiresIn: "1h" });

    res.status(200).json({
      message: "User logged in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
