const Calendar = require("../models/calendarModel");
const User = require("../models/userModel");
const Event = require("../models/eventModel");

// Create a new calendar
exports.createCalendar = async (req, res) => {
  try {
    const { title, userId } = req.body;

    // Optionally, verify the user exists before creating a calendar
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "No se encontró el usuario." });
    }

    const newCalendar = new Calendar({ title, userId });
    await newCalendar.save();

    res.status(201).json({ success: true, data: newCalendar });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all calendars for a user
exports.getCalendarsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const calendars = await Calendar.find({ userId }).populate("eventsIds");
    res.status(200).json({ success: true, data: calendars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single calendar by ID
exports.getCalendarById = async (req, res) => {
  try {
    const { id } = req.params;
    const calendar = await Calendar.findById(id).populate("eventsIds");
    if (!calendar) {
      return res.status(404).json({
        success: false,
        message: "No se encontró el calendario seleccionado.",
      });
    }
    res.status(200).json({ success: true, data: calendar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a calendar
exports.updateCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCalendar = await Calendar.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedCalendar });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a calendar and its associated events
exports.deleteCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Calendar.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Calendario no encontrado" });
    }
    await Event.deleteMany({ calendarId: id });
    res.status(200).json({
      success: true,
      message: "Calendario y los eventos asociados fueron eliminados",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addEventToCalendar = async (req, res) => {
  try {
    const { calendarId } = req.params;
    const { title, description, start, end } = req.body;
    const newEvent = await Event.create({
      title,
      description,
      start,
      end,
      calendarId,
    });
    await Calendar.findByIdAndUpdate(calendarId, {
      $push: { eventsIds: newEvent._id },
    });
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEventsForCalendar = async (req, res) => {
  try {
    const { calendarId } = req.params;
    const calendar = await Calendar.findById(calendarId);
    if (!calendar) {
      return res
        .status(404)
        .json({ success: false, message: "Calendario no encontrado" });
    }
    const events = await Event.find({ calendarId: calendar._id });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeEventFromCalendar = async (req, res) => {
  try {
    const { calendarId, eventId } = req.params;
    await Event.findByIdAndDelete(eventId);
    await Calendar.findByIdAndUpdate(calendarId, {
      $pull: { eventsIds: eventId },
    });
    res
      .status(200)
      .json({ success: true, message: "Evento eliminado del calendario" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateEventInCalendar = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { title, description, start, end } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, start, end },
      { new: true }
    );
    if (!updatedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Evento no encontrado" });
    }
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
