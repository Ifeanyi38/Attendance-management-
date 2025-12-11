const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/TeacherController");

// Teacher Dashboard Route
router.get("/teachers_dashboard", TeacherController.renderTeacherDashboard);

module.exports = router;
