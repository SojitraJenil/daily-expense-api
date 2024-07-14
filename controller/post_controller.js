post = require("../model/post_model");


exports.add_post = async (req, res) => {
  var data = await post.create(req.body);
  res.status(200).json({
    status: "Post add successfully",
    data,
  });
};
exports.All_data_show = async (req, res) => {
  var data = await post.find();
  res.status(200).json({
    status: "all data show successfully",
    data,
  });
};

exports.update_data = async (req, res) => {
  var id = req.query.id;
  var data = await post.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    status: "Data Is Updated successfully",
    data,
  });
};

exports.delete_data = async (req, res) => {
  var id = req.query.id;
  var data = await post.findByIdAndDelete(id);
  res.status(200).json({
    status: "data is deleted successfully",
    data,
  });
};

exports.id_search_product = async (req, res) => {
  var id = req.query.id;
  var data = await post.findById(id);
  res.status(200).json({
    status: "Data Find Successfully By Id",
    data,
  });
};

exports.Name_search_data = async (req, res) => {
  var title = req.query.title;
  var data = await post.find({ title });
  res.status(200).json({
    status: "Data Search Successfully By Title",
    data,
  });
};

//http://localhost:3000/posts/skip_limit?page_no=1
//http://localhost:3000/posts/skip_limit?page_no=2
//http://localhost:3000/posts/skip_limit?page_no=3
//http://localhost:3000/posts/skip_limit?page_no=4

exports.skip_limit = async (req, res) => {
  var limit = 3;
  var total_record = await post.find().count();
  var total_page = Math.ceil(total_record / limit);
  var page_no = req.query.page_no;
  if (page_no == undefined) {
    page_no = 1;
  }
  var skip = (page_no - 1) * limit;

  var data = await post.find().limit(limit).skip(skip);
  res.status(200).json({
    status: "Skip Limit Here",
    limit,
    total_record,
    total_page,
    data,
  });
};
