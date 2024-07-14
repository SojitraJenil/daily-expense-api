var users = require("../model/users_model");

// 1. Get all users API
exports.Show_all_data = async (req, res) => {
  var data = await users.find();
  res.status(200).json({
    status: "data show successfully",
    data
  });
};

//  2. get single user api (ID)
exports.single_user_find_id = async (req, res) => {
  var id = req.query.id;
  var id = req.params.id;
  var data = await users.findById(id);
  res.status(200).json({
    status: "data show successfully",
    data,
  });
};

// 3. Search User API (Name)
exports.single_user_find_name = async (req, res) => {
  var firstName = req.query.firstName;
  var data = await users.find({ firstName });
  res.status(200).json({
    status: "data show successfully",
    firstName,
    data,
  });
};

// 4.Filter User API
exports.filter_users = async (req, res) => {
  var key = req.query;

  var data = await users.find(key);
  res.status(200).json({
    status: "data filter search successfully",
    data,
  });
};

// 5.skip limit user API
exports.skip_limit = async (req, res) => {
  var limit = 2;
  var total_record = await users.find().count();
  var total_page = Math.ceil(total_record / limit);

  var page_no = req.query.page_no;
  if (page_no == undefined) {
    page_no = 1;
  }
  var skip = (page_no - 1) * limit;
  var data = await users.find().limit(limit).skip(skip);
  res.status(200).json({
    status: "data skip limit successfully",
    data,
    limit,
    total_record,
    total_page,
    page_no,
  });
};

// 9. add & inset Users API
exports.Insert_user = async (req, res) => {
  var data = await users.create(req.body);
  res.status(200).json({
    status: "data insert successfully",
    data,
  });
};

// 10. Update User API
exports.update_user = async (req, res) => {
  var id = req.params.id;
  var update_data = await users.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "data update successfully",
    update_data,
  });
};

// 11. delete User API
exports.Delete_users = async (req, res) => {
  var id = req.params.id;
  var delete_data = await users.findByIdAndDelete(id, req.body);
  res.status(200).json({
    status: "data delete successfully",
    delete_data,
  });
};

