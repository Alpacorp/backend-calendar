/*
  Events routes
  host + /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateInputs } = require("../middlewares/validate-inputs");
const { isDate } = require("../helpers/isDate");
const router = Router();

router.use(validateJWT);

// All routes are protected by the middleware JWT

// Obtain events
router.get("/", getEvents);

// Create new event
router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    check("start", "start date is required").custom(isDate),
    check("end", "end date is required").custom(isDate),
    validateInputs,
  ],
  createEvent
);

// Update event
router.put("/:id", updateEvent);

// Delete event
router.delete("/:id", deleteEvent);

module.exports = router;
