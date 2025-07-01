import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  X,
  Save,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuth from "../hooks/useAuth";

const EditEventModal = ({ isOpen, onClose, event, onEventUpdated }) => {
  const axiosInstance = useAxiosInstance();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: event?.title || "",
    dateTime: event?.dateTime || "",
    location: event?.location || "",
    description: event?.description || "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = user?.name;

    const eventData = {
      ...formData,
      name: name,
    };
    try {
      const response = await axiosInstance.put(
        `/events/${event._id}`,
        eventData
      );
      toast.success("Event updated successfully!");
      onEventUpdated(response.data.event);
      onClose();
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#075B5E]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#075B5E]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#075B5E]/8 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Calendar className="absolute top-32 right-32 w-6 h-6 text-[#075B5E]/20 animate-bounce delay-300" />
        <Clock className="absolute top-64 left-24 w-5 h-5 text-[#075B5E]/20 animate-bounce delay-700" />
        <MapPin className="absolute bottom-40 right-40 w-7 h-7 text-[#075B5E]/20 animate-bounce delay-1000" />
        <Sparkles className="absolute top-40 left-1/2 w-4 h-4 text-[#075B5E]/20 animate-bounce delay-500" />
      </div>

      {/* Modal Container with Vertical Scroll */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md border border-[#075B5E]/10 relative animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#075B5E]/10 rounded-2xl flex items-center justify-center animate-pulse">
                <Sparkles className="w-6 h-6 text-[#075B5E]" />
              </div>
              <h2 className="text-2xl font-bold text-[#075B5E] animate-slide-down">
                Edit Event
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-[#075B5E]/10 hover:bg-[#075B5E]/20 rounded-xl flex items-center justify-center transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-[#075B5E] group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-3 animate-slide-right delay-200">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Event Title
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 placeholder-[#075B5E]/40 hover:border-[#075B5E]/40"
                  placeholder="Enter your amazing event title..."
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Date and Time Fields */}
            <div className="grid grid-cols-2 gap-4 animate-slide-up delay-300">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-4 h-4 z-10" />
                  <input
                    type="date"
                    value={formData.dateTime.split("T")[0]}
                    onChange={(e) => {
                      const dateTime =
                        formData.dateTime.split("T")[1] || "00:00";
                      setFormData({
                        ...formData,
                        dateTime: `${e.target.value}T${dateTime}`,
                      });
                    }}
                    className="w-full pl-10 pr-3 py-3 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 hover:border-[#075B5E]/40 text-sm"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time
                </label>
                <div className="relative group">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-4 h-4 z-10" />
                  <input
                    type="time"
                    value={formData.dateTime.split("T")[1]}
                    onChange={(e) => {
                      const date = formData.dateTime.split("T")[0];
                      setFormData({
                        ...formData,
                        dateTime: `${date}T${e.target.value}`,
                      });
                    }}
                    className="w-full pl-10 pr-3 py-3 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 hover:border-[#075B5E]/40 text-sm"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Location Field */}
            <div className="space-y-3 animate-slide-left delay-400">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-4 h-4 z-10" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 placeholder-[#075B5E]/40 hover:border-[#075B5E]/40"
                  placeholder="Event location..."
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Description Field */}
            <div className="space-y-3 animate-slide-right delay-500">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description
              </label>
              <div className="relative group">
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 placeholder-[#075B5E]/40 resize-none hover:border-[#075B5E]/40"
                  placeholder="Tell us about your amazing event..."
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-6 animate-scale-in delay-600">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-[#075B5E]/10 text-[#075B5E] font-semibold rounded-2xl hover:bg-[#075B5E]/20 transition-all duration-300 transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#075B5E] text-white font-semibold rounded-2xl hover:bg-[#075B5E]/90 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group flex items-center gap-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-slide-right {
          animation: slide-right 0.8s ease-out forwards;
        }

        .animate-slide-left {
          animation: slide-left 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EditEventModal;
