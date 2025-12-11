const express = require("express");
const router = express.Router();
const AdminCRUDController = require("../controllers/AdminCRUDController");

// STUDENT CRUD

// List students
router.get("/admin/students", AdminCRUDController.listStudents);

// Add student form
router.get("/admin/students/add", AdminCRUDController.showAddStudentForm);

// Add student submit
router.post("/admin/students/add", AdminCRUDController.addStudent);

// Edit student form
router.get("/admin/students/edit/:id", AdminCRUDController.showEditStudentForm);

// Update student
router.post("/admin/students/edit/:id", AdminCRUDController.updateStudent);

// Delete student
router.post("/admin/students/delete/:id", AdminCRUDController.deleteStudent);

// TEACHER CRUD

// List teachers
router.get("/admin/teachers", AdminCRUDController.listTeachers);

// Add teacher form
router.get("/admin/teachers/add", AdminCRUDController.showAddTeacherForm);

// Add teacher submit
router.post("/admin/teachers/add", AdminCRUDController.addTeacher);

// Edit teacher form
router.get("/admin/teachers/edit/:id", AdminCRUDController.showEditTeacherForm);

// Update teacher
router.post("/admin/teachers/edit/:id", AdminCRUDController.updateTeacher);

// Delete teacher
router.post("/admin/teachers/delete/:id", AdminCRUDController.deleteTeacher);

module.exports = router;
