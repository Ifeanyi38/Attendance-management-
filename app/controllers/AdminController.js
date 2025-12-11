const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

class AdminController {
  //  list teachers
  static async listTeachers(req, res) {
    try {
      const teachers = await Teacher.all();
      console.log("Teachers from DB => ", teachers); // Debugging
      res.render("teachers_list", { teachers });
    } catch (err) {
      console.error("listTeachers Error:", err);
      res.send("Error loading teacher list");
    }
  }

  //  list students
  static async listStudents(req, res) {
    try {
      const students = await Student.all();
      console.log("Students from DB => ", students); // Debugging
      res.render("students_list", { students });
    } catch (err) {
      console.error("listStudents Error:", err);
      res.send("Error loading student list");
    }
  }
}

module.exports = AdminController;
