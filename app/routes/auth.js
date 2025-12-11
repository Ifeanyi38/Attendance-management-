const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

// allow reading form input
router.use(express.urlencoded({ extended: true }));

// login submit route
router.post("/login", (req, res) => {
  AuthController.postLogin(req, res); // <-- Correct method name
});

module.exports = router;
