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

exports.showExpensesByMobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.params; // or req.query depending on how you pass the mobile number
    const data = await Expense.find({ mobileNumber }); // Filter by mobile number
    if (data.length === 0) {
      return res.status(404).json({
        status: "No expenses found for this mobile number",
      });
    }
    res.status(200).json({
      status: "Expenses retrieved successfully",
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

exports.searchExpenses = async (req, res) => {
  try {
    const { mobileNumber, searchTerm } = req.params;

    const sanitizedSearchTerm = searchTerm.trim();
    if (sanitizedSearchTerm === "") {
      return res.status(400).json({
        status: "Search term is required",
      });
    }
    const filter = {
      mobileNumber,
      $or: [
        { type: { $regex: sanitizedSearchTerm, $options: "i" } },
        { desc: { $regex: sanitizedSearchTerm, $options: "i" } },
        { amount: sanitizedSearchTerm }, // Exact match for amount
      ],
    };

    const data = await Expense.find(filter);

    if (data.length === 0) {
      return res.status(404).json({
        status: "No matching expenses found",
      });
    }

    res.status(200).json({
      status: "Expenses retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
