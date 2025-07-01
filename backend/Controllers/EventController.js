const EventModel = require("../Models/Event");
const UserModel = require("../Models/User");

const createEvent = async (req, res) => {
  try {
    const { title, name, dateTime, location, description } = req.body;
    const createdBy = req.user._id;

    const event = new EventModel({
      title,
      name,
      dateTime,
      location,
      description,
      createdBy,
    });

    await event.save();
    res.status(201).json({
      message: "Event created successfully",
      success: true,
      event,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const { search, filter } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (filter) {
      const now = new Date();
      switch (filter) {
        case "today":
          query.dateTime = {
            $gte: new Date(now.setHours(0, 0, 0, 0)),
            $lt: new Date(now.setHours(23, 59, 59, 999)),
          };
          break;
        case "current-week":
          const startOfWeek = new Date(
            now.setDate(now.getDate() - now.getDay())
          );
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(endOfWeek.getDate() + 6);
          query.dateTime = { $gte: startOfWeek, $lte: endOfWeek };
          break;
        case "last-week":
          const startOfLastWeek = new Date(
            now.setDate(now.getDate() - now.getDay() - 7)
          );
          const endOfLastWeek = new Date(startOfLastWeek);
          endOfLastWeek.setDate(endOfLastWeek.getDate() + 6);
          query.dateTime = { $gte: startOfLastWeek, $lte: endOfLastWeek };
          break;
        case "current-month":
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          query.dateTime = { $gte: startOfMonth, $lte: endOfMonth };
          break;
        case "last-month":
          const startOfLastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
          );
          const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
          query.dateTime = { $gte: startOfLastMonth, $lte: endOfLastMonth };
          break;
      }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const events = await EventModel.find(query)
      .sort({ dateTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name photo");

    const total = await EventModel.countDocuments(query);
    res.status(200).json({
      message: "Events fetched successfully",
      success: true,
      events,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const joinEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await EventModel.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }

    if (event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Already joined this event", success: false });
    }

    event.attendees.push(userId);
    event.attendeeCount += 1;
    await event.save();

    res.status(200).json({
      message: "Successfully joined the event",
      success: true,
      event,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const getUserEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const events = await EventModel.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "User events fetched successfully",
      success: true,
      events,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;
    const updateData = req.body;

    const event = await EventModel.findOne({ _id: eventId, createdBy: userId });
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found or not authorized", success: false });
    }

    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Event updated successfully",
      success: true,
      event: updatedEvent,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await EventModel.findOne({ _id: eventId, createdBy: userId });
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found or not authorized", success: false });
    }

    await EventModel.findByIdAndDelete(eventId);

    res.status(200).json({
      message: "Event deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await EventModel.findById(eventId)
      .populate("createdBy", "name photo")
      .populate("attendees", "name photo");

    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }

    res.status(200).json({
      message: "Event fetched successfully",
      success: true,
      event,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  joinEvent,
  getUserEvents,
  updateEvent,
  deleteEvent,
};
