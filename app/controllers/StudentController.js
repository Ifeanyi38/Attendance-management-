const db = require("../services/db");

module.exports = {
  //  GENERAL ATTENDANCE REPORT (ALL CLASSES)

  async viewGeneralReport(req, res) {
    try {
      const studentId = req.session.studentId;
      if (!studentId) return res.redirect("/login");

      const [records] = await db.query(
        `
        SELECT 
          c.name AS moduleName,
          COUNT(*) AS totalClasses,
          SUM(CASE WHEN a.status='present' THEN 1 ELSE 0 END) AS presentCount,
          ROUND(
            (SUM(CASE WHEN a.status='present' THEN 1 ELSE 0 END) / COUNT(*)) * 100
          ) AS attendanceRate
        FROM attendance a
        JOIN classes c ON c.id = a.class_id
        WHERE a.student_id = ?
        GROUP BY c.id
        ORDER BY moduleName ASC
        `,
        [studentId]
      );

      res.render("student_general_report", {
        studentName: req.session.studentName || "Student",
        currentDate: new Date().toISOString().split("T")[0],
        records,
      });
    } catch (err) {
      console.error("❌ Error generating general report:", err);
      res.send("Error loading general attendance report");
    }
  },

  //MODULE-SPECIFIC ATTENDANCE

  async viewModuleAttendance(req, res) {
    try {
      const { moduleId } = req.params;
      const studentId = req.session.studentId;
      if (!studentId) return res.redirect("/login");

      const [details] = await db.query(
        `
        SELECT 
          a.date,
          a.status,
          c.name AS moduleName
        FROM attendance a
        JOIN classes c ON c.id = a.class_id
        WHERE a.student_id = ? AND c.id = ?
        ORDER BY a.date DESC
        `,
        [studentId, moduleId]
      );

      res.render("student_module_attendance", {
        moduleName:
          details.length > 0 ? details[0].moduleName : "Unknown Module",
        currentDate: new Date().toISOString().split("T")[0],
        records: details,
      });
    } catch (err) {
      console.error("❌ Error loading module attendance:", err);
      res.send("Error loading module attendance");
    }
  },

  // STUDENT DASHBOARD VIEW

  renderStudentDashboard(req, res) {
    if (!req.session.studentId) return res.redirect("/login");

    const today = new Date().toISOString().split("T")[0];
    res.render("students_dashboard", {
      studentName: req.session.studentName,
      currentDate: today,
    });
  },

  //  ADD STUDENT

  async addStudent(req, res) {
    try {
      const {
        firstname,
        lastname,
        dob,
        studentid,
        class: className,
        password,
      } = req.body;

      if (
        !firstname ||
        !lastname ||
        !dob ||
        !studentid ||
        !className ||
        !password
      ) {
        return res.send("Missing required fields");
      }

      await db.query(
        `
        INSERT INTO students (firstname, lastname, dob, studentid, class, password)
        VALUES (?,?,?,?,?,?)
        `,
        [firstname, lastname, dob, studentid, className, password]
      );

      res.send(`
        <h2>Student Added Successfully!</h2>
        <a href="/student/add">Add Another</a><br>
        <a href="/admin/dashboard">Back to Admin</a>
      `);
    } catch (err) {
      console.error("❌ Error adding student:", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.send("Student ID already exists");
      }

      res.send("Error adding student");
    }
  },
};
