const {
  createEvent,
  getEvents,
  joinEvent,
  getUserEvents,
  updateEvent,
  deleteEvent,
} = require("../Controllers/EventController");
const { eventValidation } = require("../Middlewares/EventValidation");
const router = require("express").Router();
const authMiddleware = require("../Middlewares/AuthMiddleware");

// Apply authMiddleware to all routes
router.use(authMiddleware);

router.post("/", eventValidation, createEvent);
router.get("/", getEvents);
router.post("/:eventId/join", joinEvent);
router.get("/my-events", getUserEvents);
router.put("/:eventId", eventValidation, updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
