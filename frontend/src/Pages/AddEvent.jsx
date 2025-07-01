import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosInstance from "../hooks/useAxiosInstance";
import useAuth from "../hooks/useAuth";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  User,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";

const AddEvent = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    // name: "",
    dateTime: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to create an event");
      return;
    }
    const name = user?.name;

    const eventData = {
      ...formData,
      name: name,
    };

    setLoading(true);

    try {
      await axiosInstance.post("/events", eventData);
      toast.success("Event created successfully!");
      navigate("/events");
    } catch (err) {
      console.error("Error creating event:", err);
      toast.error(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#EFE4D2] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#075B5E]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#075B5E]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-[#075B5E]/10 transform animate-scale-in relative z-10 max-w-md mx-auto">
          <div className="mb-6 animate-bounce">
            <div className="w-16 h-16 bg-[#075B5E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-[#075B5E]" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#075B5E] mb-4 animate-fade-in">
            Authentication Required
          </h2>
          <p className="text-[#075B5E]/70 mb-8 animate-fade-in delay-300">
            Please login to create amazing events and connect with your
            community
          </p>

          <button
            onClick={() => navigate("/signin")}
            className="group px-8 py-4 bg-[#075B5E] text-[#EFE4D2] font-semibold rounded-2xl hover:bg-[#075B5E]/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in delay-500"
          >
            <span className="flex items-center justify-center gap-2">
              Go to Login
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </div>
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE4D2] p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#075B5E]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#075B5E]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#075B5E]/4 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Calendar className="absolute top-32 right-32 w-6 h-6 text-[#075B5E]/20 animate-bounce delay-300" />
        <Clock className="absolute top-64 left-24 w-5 h-5 text-[#075B5E]/20 animate-bounce delay-700" />
        <MapPin className="absolute bottom-40 right-40 w-7 h-7 text-[#075B5E]/20 animate-bounce delay-1000" />
        <Sparkles className="absolute top-40 left-1/2 w-4 h-4 text-[#075B5E]/20 animate-bounce delay-500" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-8 h-8 text-[#075B5E]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#075B5E] animate-slide-down">
              Create New Event
            </h1>
            <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-8 h-8 text-[#075B5E]" />
            </div>
          </div>

          <p className="text-[#075B5E]/70 text-lg animate-fade-in delay-300">
            Share your amazing event with the community
          </p>
          <div className="h-1 bg-gradient-to-r from-transparent via-[#075B5E]/30 to-transparent rounded-full mx-auto w-32 mt-4 animate-pulse"></div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#075B5E]/10 p-8 md:p-10 animate-scale-in delay-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Event Title */}
            <div className="space-y-3 animate-slide-right delay-700">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Event Title
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 placeholder-[#075B5E]/40 hover:border-[#075B5E]/40"
                  placeholder="Enter your amazing event title..."
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Organizer Name */}
            {/* <div className="space-y-3 animate-slide-left delay-800">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <User className="w-4 h-4" />
                Organizer Name
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 placeholder-[#075B5E]/40 hover:border-[#075B5E]/40"
                  placeholder="Your name..."
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div> */}

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up delay-900">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-5 h-5 z-10" />
                  <input
                    type="date"
                    name="date"
                    value={formData.dateTime.split("T")[0]}
                    onChange={(e) => {
                      const time = formData.dateTime.split("T")[1] || "";
                      setFormData((prev) => ({
                        ...prev,
                        dateTime: `${e.target.value}T${time}`,
                      }));
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 hover:border-[#075B5E]/40"
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
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-5 h-5 z-10" />
                  <input
                    type="time"
                    name="time"
                    value={formData.dateTime.split("T")[1]}
                    onChange={(e) => {
                      const date = formData.dateTime.split("T")[0] || "";
                      setFormData((prev) => ({
                        ...prev,
                        dateTime: `${date}T${e.target.value}`,
                      }));
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 hover:border-[#075B5E]/40"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3 animate-slide-right delay-1000">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-5 h-5 z-10" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 placeholder-[#075B5E]/40 hover:border-[#075B5E]/40"
                  placeholder="Event location..."
                  required
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 animate-slide-left delay-1100">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description
              </label>
              <div className="relative group">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 placeholder-[#075B5E]/40 resize-none hover:border-[#075B5E]/40"
                  placeholder="Tell us about your amazing event..."
                  required
                ></textarea>
                <div className="absolute inset-0 bg-gradient-to-l from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 animate-scale-in delay-1200">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-[#075B5E] text-[#EFE4D2] font-semibold rounded-2xl hover:bg-[#075B5E]/90 focus:ring-4 focus:ring-[#075B5E]/20 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-2 border-[#EFE4D2]/30 border-t-[#EFE4D2] rounded-full animate-spin"></div>
                    <span>Creating Your Amazing Event...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Event
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* User Info */}
        {user && (
          <div className="mt-8 text-center animate-fade-in delay-1300">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#075B5E]/10">
              <p className="text-[#075B5E]/70 text-sm">
                Creating event as{" "}
                <span className="font-semibold text-[#075B5E]">
                  {user.name}
                </span>
              </p>
            </div>
          </div>
        )}
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

export default AddEvent;
