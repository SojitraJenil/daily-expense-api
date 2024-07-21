const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../model/users_model");

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email (use a real email service in production)
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "jeniltech18@gmail.com",
        pass: "czni urlo oeyu &vmoy",
      },
    });

    const mailOptions = {
      to: email,
      from: "jeniltech18@gmail.com",
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      https://daily-expense-api.onrender.com/reset?token=${resetToken}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
