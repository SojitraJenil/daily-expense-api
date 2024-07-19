var express = require("express");
var router = express.Router();
const {
  Show_all_data,
  loginUser,
  registerUser,
  deleteUser,
} = require("../controller/users_controller");
const {
  showAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} = require("../controller/expense_controller");
const {
  Show_all_Fuel_Details,
  Add_Fuel_Detail,
  Delete_Fuel_Detail,
  Update_Fuel_Detail,
} = require("../controller/fuel_controller");

router.post("/UserRegister", registerUser);
router.post("/UserLogin", loginUser);
router.get("/UserShow", Show_all_data);
router.delete("/deleteUser/:id", deleteUser);

router.get("/showFuelDetails", Show_all_Fuel_Details);
router.post("/addFuelDetails", Add_Fuel_Detail);
router.put("/UpdateFuelDetail/:id", Update_Fuel_Detail);
router.delete("/DeleteFuelDetail/:id", Delete_Fuel_Detail);

router.get("/showAllExpenses", showAllExpenses);
router.post("/createExpense", createExpense);
router.delete("/deleteExpense/:id", deleteExpense);
router.put("/updateExpense/:id", updateExpense);

module.exports = router;
