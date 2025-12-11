const db = require("../services/db");

module.exports = {
  // block for the CRUD operation for students by admin

  // list students
  async listStudents(req, res) {
    try {
      const [students] = await db.query(
        "SELECT id, firstname, lastname, dob, studentid, class AS module FROM students ORDER BY id DESC"
      );

      res.render("admin_students", { students });
    } catch (err) {
      console.error("❌ Error loading students:", err);
      res.send("Error loading student list");
    }
  },

  // show add students form
  showAddStudentForm(req, res) {
    res.render("add_student");
  },

  // add students to the system
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
        "INSERT INTO students (firstname, lastname, dob, studentid, class, password) VALUES (?,?,?,?,?,?)",
        [firstname, lastname, dob, studentid, className, password]
      );

      res.redirect("/admin/students");
    } catch (err) {
      console.error("❌ Error adding student:", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.send("Student ID already exists");
      }

      res.send("Error adding student");
    }
  },

  // show edit student form
  async showEditStudentForm(req, res) {
    try {
      const { id } = req.params;
      const [[student]] = await db.query(
        "SELECT * FROM students WHERE id = ?",
        [id]
      );

      if (!student) {
        return res.send("Student not found");
      }

      res.render("edit_student", { student });
    } catch (err) {
      console.error("❌ Error loading student for edit:", err);
      res.send("Error loading student data");
    }
  },

  // update/edit student informations
  async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { firstname, lastname, dob, class: className, password } = req.body;

      await db.query(
        "UPDATE students SET firstname=?, lastname=?, dob=?, class=?, password=? WHERE id=?",
        [firstname, lastname, dob, className, password, id]
      );

      res.redirect("/admin/students");
    } catch (err) {
      console.error("❌ Error updating student:", err);
      res.send("Error updating student");
    }
  },

  // delete student profile from the system
  async deleteStudent(req, res) {
    try {
      const { id } = req.params;

      await db.query("DELETE FROM students WHERE id = ?", [id]);

      res.redirect("/admin/students");
    } catch (err) {
      console.error("❌ Error deleting student:", err);
      res.send("Error deleting student");
    }
  },

  // block code for the teachers  CRUD operations by the admin

  // list teachers
  async listTeachers(req, res) {
    try {
      const [teachers] = await db.query(
        "SELECT * FROM teachers ORDER BY id DESC"
      );

      res.render("admin_teachers", { teachers });
    } catch (err) {
      console.error("❌ Error loading teachers:", err);
      res.send("Error loading teacher list");
    }
  },

  // show techers form
  showAddTeacherForm(req, res) {
    res.render("add_teacher");
  },

  // add teachers
  async addTeacher(req, res) {
    try {
      const { firstname, lastname, dob, teacherid, password } = req.body;

      if (!firstname || !lastname || !dob || !teacherid || !password) {
        return res.send("Missing required fields");
      }

      await db.query(
        "INSERT INTO teachers (firstname, lastname, dob, teacherid, password) VALUES (?,?,?,?,?)",
        [firstname, lastname, dob, teacherid, password]
      );

      res.redirect("/admin/teachers");
    } catch (err) {
      console.error("❌ Error adding teacher:", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.send("Teacher ID already exists");
      }

      res.send("Error adding teacher");
    }
  },

  // SHOW EDIT TEACHER FORM
  async showEditTeacherForm(req, res) {
    try {
      const { id } = req.params;
      const [[teacher]] = await db.query(
        "SELECT * FROM teachers WHERE id = ?",
        [id]
      );

      if (!teacher) {
        return res.send("Teacher not found");
      }

      res.render("edit_teacher", { teacher });
    } catch (err) {
      console.error("❌ Error loading teacher edit form:", err);
      res.send("Error loading teacher data");
    }
  },

  // UPDATE TEACHER
  async updateTeacher(req, res) {
    try {
      const { id } = req.params;
      const { firstname, lastname, dob, password } = req.body;

      await db.query(
        "UPDATE teachers SET firstname=?, lastname=?, dob=?, password=? WHERE id=?",
        [firstname, lastname, dob, password, id]
      );

      res.redirect("/admin/teachers");
    } catch (err) {
      console.error("❌ Error updating teacher:", err);
      res.send("Error updating teacher");
    }
  },

  // DELETE TEACHER
  async deleteTeacher(req, res) {
    try {
      const { id } = req.params;
      await db.query("DELETE FROM teachers WHERE id = ?", [id]);
      res.redirect("/admin/teachers");
    } catch (err) {
      console.error("❌ Error deleting teacher:", err);
      res.send("Error deleting teacher");
    }
  },
};
