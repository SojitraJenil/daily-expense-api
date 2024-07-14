var catagory = require("../model/catagory_model");

exports.Insert_catagory = async (req, res) => {
  var data = await catagory.create(req.body);

  res.status(200).json({
    status: "Data Added Successfully",
    data,
  });
};


exports.show_catagory = async (req, res) => {
  var data = await catagory.find();

  res.status(200).json({
    status: "Data show Successfully",
    data
  });

//   res.status(200).send({ message: `Your data successfully inserted });

};

exports.Update_catagory = async (req, res) => {
  var id = req.params.id;
  var data = await catagory.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    status: "Data Update Successfully",
    data,
  });
};

exports.Delete_catagory = async (req, res) => {
  var id = req.params.id;
  await catagory.findByIdAndDelete(id);

  res.status(200).json({
    status: "Data Delete Successfully",
  });
};
