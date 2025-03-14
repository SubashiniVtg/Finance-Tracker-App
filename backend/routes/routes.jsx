const express = require("express");
const { login, refreshToken } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refreshToken);

// Secure Routes
router.get("/admin", authMiddleware(["admin"]), (req, res) => {
  res.json({ message: "Admin access granted" });
});

router.get("/user", authMiddleware(["user", "admin"]), (req, res) => {
  res.json({ message: "User access granted" });
});

module.exports = router;
