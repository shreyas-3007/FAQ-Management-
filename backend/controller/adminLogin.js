const jwt = require("jsonwebtoken");
require("dotenv").config();

// Admin credentials
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const adminLogin = (req, res) => {
  try {
    const { username, password } = req.body; // Get username and password

    console.log(username, password);

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const payload = { username: ADMIN_USERNAME, role: "admin" }; // Token data
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "2h",
      }); // Generate token

      res.cookie("token", token).json({
        data: token,
        error: false,
        success: true,
        message: "Login Successful", // Success response
      });
    } else {
      // Invalid credentials
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    // Handle errors
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = adminLogin;
