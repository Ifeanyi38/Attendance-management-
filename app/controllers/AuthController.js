const db = require("../services/db");

class AuthController {
  // Show login page
  static getLogin(req, res) {
    res.render("login");
  }

  // Login handler using studentid / teacherid
  static async postLogin(req, res) {
    try {
      const { userId, password, role } = req.body;

      if (!userId || !password || !role) {
        return res.send("Missing login fields");
      }

      // ROLE: STUDENT
      if (role === "student") {
        const [rows] = await db.query(
          "SELECT * FROM students WHERE studentid = ? AND password = ?",
          [userId, password]
        );

        if (rows.length === 0) {
          return res.send("Invalid Student ID or Password");
        }

        const student = rows[0];

        req.session.studentId = student.id;
        req.session.studentName = student.firstname + " " + student.lastname;

        return res.redirect("/student/dashboard");
      }

      // ROLE: TEACHER
      if (role === "teacher") {
        const [rows] = await db.query(
          "SELECT * FROM teachers WHERE teacherid = ? AND password = ?",
          [userId, password]
        );

        if (rows.length === 0) {
          return res.send("Invalid Teacher ID or Password");
        }

        const teacher = rows[0];

        req.session.teacherId = teacher.id;
        req.session.teacherName = teacher.firstname + " " + teacher.lastname;

        return res.redirect("/teachers_dashboard");
      }

      // ROLE: ADMIN
      if (role === "admin") {
        return res.redirect("/admin/dashboard");
      }

      return res.send("Invalid role selected");
    } catch (err) {
      console.error("❌ Login Error:", err);
      res.send("An error occurred during login");
    }
  }
}

module.exports = AuthController;
