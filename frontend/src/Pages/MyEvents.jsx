import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Calendar, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react";
import Loader from "../Components/Loader/Loader";
import useAxiosInstance from "../hooks/useAxiosInstance";
import EditEventModal from "./EditEventModal"

const MyEvents = () => {
  const axiosInstance = useAxiosInstance();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/events/my-events");
        setEvents(response.data.events);
      } catch (err) {
        console.error("Error fetching my events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      setDeleteId(eventId);
      await axiosInstance.delete(`/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (err) {
      console.error("Error deleting event:", err);
    } finally {
      setDeleteId(null);
    }
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#EFE4D2] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#075B5E]">My Events</h1>
          <Link
            to="/add-event"
            className="px-4 py-2 bg-[#075B5E] text-[#EFE4D2] rounded-lg hover:bg-[#075B5E]/90"
          >
            Add New Event
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-[#075B5E]/80">
              You haven't created any events yet
            </p>
            <Link
              to="/add-event"
              className="mt-4 inline-block px-4 py-2 bg-[#075B5E] text-[#EFE4D2] rounded-lg hover:bg-[#075B5E]/90"
            >
              Create Your First Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-[#075B5E]">
                      {event.title}
                    </h2>
                    <div className="flex items-center text-sm text-[#075B5E]/80">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{event.attendeeCount}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-[#075B5E]/80 mb-2">
                    <span>Posted by: {event.createdBy?.name || "You"}</span>
                  </div>

                  <div className="flex items-center text-sm text-[#075B5E]/80 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(event.dateTime).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 ml-3 mr-2" />
                    <span>
                      {new Date(event.dateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-[#075B5E]/80 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>

                  <p className="text-[#075B5E] mb-6">{event.description}</p>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      disabled={deleteId === event._id}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {deleteId === event._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {editingEvent && (
          <EditEventModal
            isOpen={!!editingEvent}
            onClose={() => setEditingEvent(null)}
            event={editingEvent}
            onEventUpdated={handleEventUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default MyEvents;
