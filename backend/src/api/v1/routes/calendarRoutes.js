const express = require("express");
const router = express.Router();
const {
  createCalendar,
  getCalendarsByUser,
  getCalendarById,
  updateCalendar,
  deleteCalendar,
} = require("../controllers/calendarController");

router.post("/", createCalendar);
router.get("/user/:userId", getCalendarsByUser);
router.get("/:id", getCalendarById);
router.put("/:id", updateCalendar);
router.delete("/:id", deleteCalendar);

module.exports = router;
