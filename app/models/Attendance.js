const db = require("../services/db");
// marking attendance with status and inserting to database
class Attendance {
  static async mark(student_id, class_id, status, date) {
    const sql = `
      INSERT INTO attendance (student_id, class_id, status, date)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(sql, [student_id, class_id, status, date]);
  }

  static async getByStudent(student_id) {
    const sql = `
      SELECT a.date, a.status, c.name as className
      FROM attendance a
      JOIN classes c ON a.class_id = c.id
      WHERE a.student_id = ?
    `;
    const [rows] = await db.query(sql, [student_id]);
    return rows;
  }
}

module.exports = Attendance;
