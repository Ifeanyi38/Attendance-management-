const db = require("../services/db");

class Student {
  // Fetch all students
  static async all() {
    try {
      const [rows] = await db.query("SELECT * FROM students");
      return rows;
    } catch (err) {
      console.error("Error loading students:", err);
      return [];
    }
  }
}

module.exports = Student;
