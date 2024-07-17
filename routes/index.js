var express = require("express");
var router = express.Router();
const {
  Show_all_data,
  loginUser,
  registerUser,
} = require("../controller/users_controller");
const {
  showAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} = require("../controller/expense_controller");

router.post("/UserRegister", registerUser);
router.post("/UserLogin", loginUser);
router.get("/UserShow", Show_all_data);

router.get("/showAllExpenses", showAllExpenses);
router.post("/createExpense", createExpense);
router.delete("/deleteExpense/:id", deleteExpense);
router.put("/updateExpense/:id", updateExpense);

module.exports = router;
