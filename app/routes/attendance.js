const express = require("express");
const router = express.Router();

const AttendController = require("../controllers/AttendController");

//  GET FORM TO MARK ATTENDANCE
router.get("/mark/:classId", AttendController.markAttendance);

//  SAVE ATTENDANCE
router.post("/mark/:classId", AttendController.saveAttendance);

// VIEW MODULE REPORT
router.get("/report/:classId", AttendController.viewModuleReport);

module.exports = router;
