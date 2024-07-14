var express = require("express");
var router = express.Router();
const {
  Show_all_data,
  loginUser,
  registerUser,
} = require("../controller/users_controller");

router.post("/UserRegister", registerUser);
router.post("/UserLogin", loginUser);
router.get("/UserShow", Show_all_data);

module.exports = router;
