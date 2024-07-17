const Expense = require("../model/expense_model");

// Show all expenses
exports.showAllExpenses = async (req, res) => {
  try {
    const data = await Expense.find();
    res.status(200).json({
      status: "All expense data retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { type, amount, desc, mobileNumber } = req.body;
    const newExpense = new Expense({
      type,
      amount,
      desc,
      mobileNumber,
    });
    await newExpense.save();
    res.status(201).json({
      status: "Expense created successfully",
      newExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({
      status: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, desc, mobileNumber } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { type, amount, desc, mobileNumber },
      { new: true } // return the updated document
    );
    res.status(200).json({
      status: "Expense updated successfully",
      updatedExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
