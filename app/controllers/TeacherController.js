module.exports = {
  // TEACHER DASHBOARD VIEW
  // URL: /teachers_dashboard

  renderTeacherDashboard(req, res) {
    // Prevent access without login
    if (!req.session.teacherId) {
      return res.redirect("/login");
    }

    // Format today's date
    const today = new Date().toISOString().split("T")[0];

    // Render dashboard
    res.render("teachers_dashboard", {
      teacherName: req.session.teacherName,
      currentDate: today,
    });
  },
};
