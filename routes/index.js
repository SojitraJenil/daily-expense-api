var express = require("express");
var router = express.Router();

/* GET home page. */
var express = require("express");
var router = express.Router();
const {
  Insert_user,
  Show_all_data,
} = require("../controller/users_controller");

router.post("/data_insert", Insert_user);
router.get("/", Show_all_data);

module.exports = router;

module.exports = router;
