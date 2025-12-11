const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/AdminController");

router.use(express.urlencoded({ extended: true }));

// Test  for admin route (helps in debuging)
router.get("/test", (req, res) => {
  res.send("ADMIN ROUTER IS ACTIVE");
});

// LIST
router.get("/teachers", (req, res) => AdminController.listTeachers(req, res));
router.get("/students", (req, res) => AdminController.listStudents(req, res));

// EDIT FORMS
router.get("/teachers/edit/:id", (req, res) =>
  AdminController.editTeacherForm(req, res)
);

router.get("/students/edit/:id", (req, res) =>
  AdminController.editStudentForm(req, res)
);

//  UPDATE
router.post("/teachers/update/:id", (req, res) =>
  AdminController.updateTeacher(req, res)
);

router.post("/students/update/:id", (req, res) =>
  AdminController.updateStudent(req, res)
);

// DELETE
router.get("/teachers/delete/:id", (req, res) =>
  AdminController.deleteTeacher(req, res)
);

router.get("/students/delete/:id", (req, res) =>
  AdminController.deleteStudent(req, res)
);

module.exports = router;
