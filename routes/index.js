var express = require("express");
var router = express.Router();
const userController = require("../controller/users_controller");
const authMiddleware = require("../middleware/auth");
const mail = require("../controller/mail");

const {
  showAllExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
  searchExpenses,
  showExpensesByMobileNumber,
} = require("../controller/expense_controller");
const {
  Show_all_Fuel_Details,
  Add_Fuel_Detail,
  Show_Fuel_Details_By_MobileNumber,
  Delete_Fuel_Detail,
  Update_Fuel_Detail,
} = require("../controller/fuel_controller");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/user/profile/:id", userController.getUserProfile);

router.post("/password-reset-request", mail.requestPasswordReset);
router.post("/reset-password", userController.resetPassword);

router.delete("/user/:id", authMiddleware, userController.deleteUser);

router.get("/showFuelDetails", Show_all_Fuel_Details);
router.get("/showFuelDetails/:mobileNumber", Show_Fuel_Details_By_MobileNumber);
router.post("/addFuelDetails", Add_Fuel_Detail);
router.put("/UpdateFuelDetail/:id", Update_Fuel_Detail);
router.delete("/DeleteFuelDetail/:id", Delete_Fuel_Detail);

router.get("/search/:mobileNumber/:searchTerm", searchExpenses);

router.get("/showAllExpenses", showAllExpenses);
router.get("/showAllExpenses/:mobileNumber", showExpensesByMobileNumber);
router.post("/createExpense", createExpense);
router.delete("/deleteExpense/:id", deleteExpense);
router.put("/updateExpense/:id", updateExpense);

module.exports = router;
