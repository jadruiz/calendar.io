const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    calendar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calendar",
      required: true,
    },
  },
  { timestaps: true }
);

module.exports = mongoose.model("Event", eventSchema);
