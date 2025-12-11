const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

// General attendance overview
router.get("/student/attendance/report", StudentController.viewGeneralReport);
router.get("/student/dashboard", StudentController.renderStudentDashboard);
// Add student form
router.get("/student/add", (req, res) => {
  res.render("add_student");
});

// Save student
router.post("/student/add", StudentController.addStudent);

// Per-module attendance
router.get(
  "/student/attendance/:moduleId",
  StudentController.viewModuleAttendance
);

module.exports = router;
