const db = require("../services/db");

module.exports = {
  async addTeacher(req, res) {
    try {
      const { firstname, lastname, dob, teacherid, password } = req.body;

      if (!firstname || !lastname || !dob || !teacherid || !password) {
        return res.send("Missing required fields");
      }

      await db.query(
        `
        INSERT INTO teachers (firstname, lastname, dob, teacherid, password)
        VALUES (?,?,?,?,?)
        `,
        [firstname, lastname, dob, teacherid, password]
      );

      res.send(`
        <h2>Teacher Added Successfully!</h2>
        <a href="/teacher/add">Add Another Teacher</a><br>
        <a href="/admin/dashboard">Back to Admin</a>
      `);
    } catch (err) {
      console.error("❌ Error adding teacher:", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.send("Teacher ID already exists!");
      }

      res.send("Error adding teacher");
    }
  },
};
