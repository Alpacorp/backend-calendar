const { response } = require("express");
const Event = require("../models/Event-model");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventSaved = await event.save();
    res.status(201).json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    } else if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have permission to edit this event",
      });
    } else {
      const newEvent = {
        ...req.body,
        user: uid,
      };

      const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
        new: true,
      });

      res.json({
        ok: true,
        event: eventUpdated,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event not found",
      });
    } else if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have permission to delete this event",
      });
    } else {
      await Event.findByIdAndDelete(eventId);

      res.json({
        ok: true,
        msg: "Event deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact the administrator",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
