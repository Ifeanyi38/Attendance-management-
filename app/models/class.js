const db = require("../services/db");

class ClassModel {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM classes");
    return rows;
  }
}

module.exports = ClassModel;
