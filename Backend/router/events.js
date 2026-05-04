const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Event = require("../model/Event");
const verifyAdmin = require("../middleware/auth");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

console.log("Event route loaded");


//Register for event
router.post("/register", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    await Event.findByIdAndUpdate(req.body.eventId, {
      $addToSet: {
        participants: {
          userId: user._id,
          name: user.name,
          username: user.username,
        },
      },
    });

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

//Unregister from event
router.post("/unregister", async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🔥 remove user from participants
    await Event.findByIdAndUpdate(req.body.eventId, {
      $pull: {
        participants: { userId: user._id },
      },
    });

    res.json({ message: "Unregistered successfully" });

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});


router.get("/all", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event" });
  }
});

router.post("/create", verifyAdmin, async (req, res) => {
  try {
    const { name, venue, date, time, description } = req.body;

    const newEvent = new Event({
      name,
      venue,
      date,
      time,
      description,
      participants: [],
    });

    await newEvent.save();

    res.json({ message: "Event created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error creating event" });
  }
});

router.delete("/delete/:id", verifyAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting event" });
  }
});

module.exports = router;