const User = require("../model/users_model");
const jwt = require("jsonwebtoken");

exports.Show_all_data = async (req, res) => {
  var data = await User.find();
  res.status(200).json({
    status: "data show successfully",
    data,
  });
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
    const { name, password, mobileNumber } = req.body;
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      password, // Storing plain text password (not recommended)
      mobileNumber,
    });
    const token = jwt.sign({ id: user._id }, "jenil", {
      expiresIn: "360h",
    });
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
    if (password !== user.password) {
      // Simple password check
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, "jenil", {
      expiresIn: "360h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//  2. get single user api (ID)
// exports.single_user_find_id = async (req, res) => {
//   var id = req.query.id;
//   var id = req.params.id;
//   var data = await users.findById(id);
//   res.status(200).json({
//     status: "data show successfully",
//     data,
//   });
// };

// // 3. Search User API (Name)
// exports.single_user_find_name = async (req, res) => {
//   var firstName = req.query.firstName;
//   var data = await users.find({ firstName });
//   res.status(200).json({
//     status: "data show successfully",
//     firstName,
//     data,
//   });
// };

// // 4.Filter User API
// exports.filter_users = async (req, res) => {
//   var key = req.query;

//   var data = await users.find(key);
//   res.status(200).json({
//     status: "data filter search successfully",
//     data,
//   });
// };

// // 5.skip limit user API
// exports.skip_limit = async (req, res) => {
//   var limit = 2;
//   var total_record = await users.find().count();
//   var total_page = Math.ceil(total_record / limit);

//   var page_no = req.query.page_no;
//   if (page_no == undefined) {
//     page_no = 1;
//   }
//   var skip = (page_no - 1) * limit;
//   var data = await users.find().limit(limit).skip(skip);
//   res.status(200).json({
//     status: "data skip limit successfully",
//     data,
//     limit,
//     total_record,
//     total_page,
//     page_no,
//   });
// };

// // 10. Update User API
// exports.update_user = async (req, res) => {
//   var id = req.params.id;
//   var update_data = await users.findByIdAndUpdate(id, req.body);
//   res.status(200).json({
//     status: "data update successfully",
//     update_data,
//   });
// };

// // 11. delete User API
// exports.Delete_users = async (req, res) => {
//   var id = req.params.id;
//   var delete_data = await users.findByIdAndDelete(id, req.body);
//   res.status(200).json({
//     status: "data delete successfully",
//     delete_data,
//   });
// };
