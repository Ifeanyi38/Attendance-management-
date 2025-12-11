const express = require("express");
const router = express.Router();
const TeacherManageController = require("../controllers/TeacherManageController");

// Show add teacher form
router.get("/teacher/add", (req, res) => {
  res.render("add_teacher");
});

// Handle form submission
router.post("/teacher/add", TeacherManageController.addTeacher);

module.exports = router;
