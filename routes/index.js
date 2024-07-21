var express = require("express");
var router = express.Router();
const userController = require("../controller/users_controller");
const authMiddleware = require("../middleware/auth");

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

// Public routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// Protected routes
router.get("/data", authMiddleware, userController.showAllData);
router.delete("/user/:id", authMiddleware, userController.deleteUser);

router.get("/showFuelDetails", Show_all_Fuel_Details);
router.post("/addFuelDetails", Add_Fuel_Detail);
router.put("/UpdateFuelDetail/:id", Update_Fuel_Detail);
router.delete("/DeleteFuelDetail/:id", Delete_Fuel_Detail);

router.get("/showAllExpenses", showAllExpenses);
router.post("/createExpense", createExpense);
router.delete("/deleteExpense/:id", deleteExpense);
router.put("/updateExpense/:id", updateExpense);

module.exports = router;
