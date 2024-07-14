var comment = require("../model/comment_model");

exports.add_comment = async (req, res) => {
  var data = await comment.create(req.body);
  res.status(200).json({
    status: "data Add Successfully",
    data,
  });
};

exports.show_add = async (req, res) => {
  var data = await comment.find();
  res.status(200).json({
    status: "data show Successfully",
    data,
  });
};
 