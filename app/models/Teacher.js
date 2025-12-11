const db = require("../services/db");

class Teacher {
  // Fetch all teachers
  static async all() {
    try {
      const [rows] = await db.query("SELECT * FROM teachers");
      return rows;
    } catch (err) {
      console.error("Error loading teachers:", err);
      return [];
    }
  }
}

module.exports = Teacher;
