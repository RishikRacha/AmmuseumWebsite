const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {type: String, required: true},
  venue: {type: String, required: true},
  location: {type: String},
  day: {type: String},
  date: {type: String, required: true},
  time: {type: String, required: true},
  description: {type: String, required: true},
  participants: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
      username: String,
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);