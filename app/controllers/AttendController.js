const db = require("../services/db");
const Student = require("../models/Student");

class AttendController {
  //  LOAD ATTENDANCE FORM
  static async markAttendance(req, res) {
    try {
      const { classId } = req.params;

      // get students belonging to class
      const [students] = await db.query(
        "SELECT * FROM students WHERE class = ? ORDER BY firstname ASC",
        [`Module ${classId}`]
      );

      res.render("mark_attendance", {
        students,
        moduleName: `Module ${classId}`,
        classId,
      });
    } catch (err) {
      console.error("Error loading attendance form:", err);
      res.send("Error loading attendance form");
    }
  }

  // SAVE ATTENDANCE
  static async saveAttendance(req, res) {
    console.log("For debugging: Route activate");
    try {
      const { classId } = req.params;

      console.log("\n===== RAW FORM BODY =====");
      console.log(req.body);
      console.log("=========================\n");

      // Build attendance object from status
      const attendance = {};

      for (let key in req.body) {
        if (key.startsWith("status_")) {
          const studentId = key.split("_")[1];
          attendance[studentId] = req.body[key];
        }
      }

      console.log("\n===== PARSED ATTENDANCE =====");
      console.log(attendance);
      console.log("=================================\n");

      // If nothing passed
      if (Object.keys(attendance).length === 0) {
        console.log("❌ No attendance found from form!");
        return res.send("No attendance submitted");
      }

      const today = new Date().toISOString().split("T")[0];

      for (let studentId in attendance) {
        const status = attendance[studentId];

        console.log(`Attempting INSERT: Student ${studentId} -> ${status}`);

        await db.query(
          `INSERT INTO attendance (student_id, class_id, date, status)
         VALUES (?,?,?,?)`,
          [studentId, classId, today, status]
        );
      }

      console.log("✔ Attendance Saved Successfully");
      res.redirect(`/attend/report/${classId}`);
    } catch (err) {
      console.error("\n❌ Error saving attendance:", err, "\n");
      res.send("Error saving attendance");
    }
  }

  // VIEW REPORT
  static async viewModuleReport(req, res) {
    try {
      const { classId } = req.params;

      const [records] = await db.query(
        `SELECT s.firstname, s.lastname, a.date, a.status
         FROM attendance a
         JOIN students s ON a.student_id = s.id
         WHERE a.class_id = ?
         ORDER BY a.date DESC`,
        [classId]
      );

      res.render("attendance_report", {
        records,
        moduleName: `Module ${classId}`,
        classId,
      });
    } catch (err) {
      console.error("Error loading report:", err);
      res.send("Error loading report");
    }
  }
}

module.exports = AttendController;
