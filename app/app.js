// Import express
const express = require("express");
const app = express();
const session = require("express-session");
app.use(
  session({
    secret: "attendance_system_secret", // can be any string
    resave: false,
    saveUninitialized: true,
  })
);
const teacherRoutes = require("./routes/TeacherRoutes");
const teacherManageRoutes = require("./routes/TeacherManageRoutes");
const adminCRUDRoutes = require("./routes/AdminCRUDRoutes");

// Static assets
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.use("/", adminCRUDRoutes);

app.use("/", teacherRoutes);
app.use("/", teacherManageRoutes);

console.log(">>> APP.JS EXECUTED ✔️");

// DB connection
const db = require("./services/db");

// Test DB connection
db.query("SELECT DATABASE()").then(([rows]) =>
  console.log("Connected to DB:", rows[0]["DATABASE()"])
);

// PUG CONFIGuRATION
app.set("view engine", "pug");
app.set("views", "./app/views");

// BASIC VIEW ROUTES

// Home Page
app.get("/", (req, res) => res.render("main"));

// Login Page
app.get("/login", (req, res) => res.render("login"));

// Admin Dashboard
app.get("/admin/dashboard", (req, res) => res.render("admins_dashboard"));

// Attendance Routes
console.log(">>> Loading Attend Routes...");
const attendRoutes = require("./routes/attendance");
app.use("/attend", attendRoutes);

const studentRoutes = require("./routes/StudentRoutes");
app.use("/", studentRoutes);

// USER INTERFACE FORMS ONLY
app.get("/teachers_form", (req, res) => res.render("teachers_form"));
app.get("/students_form", (req, res) => res.render("students_form"));

// REGISTER ROUTE GROUPS

console.log(">>> Loading Admin Routes...");
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

console.log(">>> Loading Auth Routes...");
const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

// START SERVER

app.listen(3000, () => {
  console.log(`Server running at http://127.0.0.1:3000/`);
});
