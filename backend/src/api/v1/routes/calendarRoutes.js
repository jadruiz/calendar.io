const express = require("express");
const router = express.Router();
const {
  createCalendar,
  getCalendarsByUser,
  getCalendarById,
  updateCalendar,
  deleteCalendar,
  addEventToCalendar,
  getEventsForCalendar,
  updateEventInCalendar,
  removeEventFromCalendar,
} = require("../controllers/calendarController");

router.post("/", createCalendar);
router.get("/user/:userId", getCalendarsByUser);
router.get("/:id", getCalendarById);
router.put("/:id", updateCalendar);
router.delete("/:id", deleteCalendar);

router.post("/:calendarId/events", addEventToCalendar);
router.get("/:calendarId/events", getEventsForCalendar);
router.put("/:calendarId/events/:eventId", updateEventInCalendar);
router.delete("/:calendarId/events/:eventId", removeEventFromCalendar);

module.exports = router;
