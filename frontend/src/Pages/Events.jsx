import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronDown,
  Sparkles,
  Filter,
  Star,
} from "lucide-react";
import useAxiosInstance from "../hooks/useAxiosInstance";

const Events = () => {
  const { user, isAuthenticated } = useAuth();
  const axiosInstance = useAxiosInstance();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/events?search=${searchTerm}&filter=${filter}&page=${page}`
        );
        setEvents(response.data.events);
        setTotalPages(response.data.pages);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchTerm, filter, page]);

  const handleJoinEvent = async (eventId) => {
    if (!isAuthenticated) {
      alert("Please sign in to join events");
      return;
    }

    try {
      await axiosInstance.post(`/events/${eventId}/join`);
      setEvents(
        events.map((event) =>
          event._id === eventId
            ? {
                ...event,
                attendeeCount: event.attendeeCount + 1,
                attendees: [...event.attendees, user._id],
              }
            : event
        )
      );
    } catch (err) {
      console.error("Error joining event:", err);
    }
  };

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
        <Users className="absolute top-64 left-24 w-5 h-5 text-[#075B5E]/20 animate-bounce delay-700" />
        <Star className="absolute bottom-40 right-40 w-7 h-7 text-[#075B5E]/20 animate-bounce delay-1000" />
        <Sparkles className="absolute top-40 left-1/2 w-4 h-4 text-[#075B5E]/20 animate-bounce delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-8 h-8 text-[#075B5E]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#075B5E] animate-slide-down">
              Discover Events
            </h1>
            <div className="w-16 h-16 bg-white/50 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-8 h-8 text-[#075B5E]" />
            </div>
          </div>

          <p className="text-[#075B5E]/70 text-lg animate-fade-in delay-300">
            Join amazing events and connect with your community
          </p>
          <div className="h-1 bg-gradient-to-r from-transparent via-[#075B5E]/30 to-transparent rounded-full mx-auto w-32 mt-4 animate-pulse"></div>
        </div>
        

        {/* Search and Filter Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#075B5E]/10 p-6 mb-8 animate-scale-in delay-500">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1 space-y-2 animate-slide-right delay-700">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <Search className="w-4 h-4" />
                Search Events
              </label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-5 h-5 z-10" />
                <input
                  type="text"
                  placeholder="Search for amazing events..."
                  className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 placeholder-[#075B5E]/40 hover:border-[#075B5E]/40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="md:w-80 space-y-2 animate-slide-left delay-800">
              <label className="block text-sm font-semibold text-[#075B5E] flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter by Date
              </label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-5 h-5 z-10" />
                <select
                  className="w-full appearance-none pl-12 pr-12 py-4 bg-white/70 border-2 border-[#075B5E]/20 rounded-2xl focus:ring-2 focus:ring-[#075B5E]/50 focus:border-[#075B5E] transition-all duration-300 hover:border-[#075B5E]/40"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All Events</option>
                  <option value="today">Today</option>
                  <option value="current-week">This Week</option>
                  <option value="last-week">Last Week</option>
                  <option value="current-month">This Month</option>
                  <option value="last-month">Last Month</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#075B5E]/50 w-5 h-5 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#075B5E]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#075B5E]/10">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-[#075B5E]/20 border-t-[#075B5E] rounded-full animate-spin"></div>
                <p className="text-[#075B5E] font-medium">
                  Loading amazing events...
                </p>
              </div>
            </div>
          </div>
        ) : events?.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#075B5E]/10 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#075B5E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-[#075B5E]" />
              </div>
              <h3 className="text-2xl font-bold text-[#075B5E] mb-4">
                No Events Found
              </h3>
              <p className="text-[#075B5E]/70 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("");
                }}
                className="px-6 py-3 bg-[#075B5E] text-[#EFE4D2] font-semibold rounded-2xl hover:bg-[#075B5E]/90 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in delay-900">
            {events?.map((event, index) => (
              <div
                key={event._id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#075B5E]/10 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8 relative">
                  {/* Event Header */}
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-[#075B5E] group-hover:text-[#075B5E]/90 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </h2>
                    <div className="flex items-center bg-[#075B5E]/10 rounded-full px-3 py-2 text-sm text-[#075B5E] font-semibold">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{event.attendeeCount}</span>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center mb-4 text-sm text-[#075B5E]/70">
                    <div className="w-8 h-8 bg-[#075B5E]/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold text-[#075B5E]">
                        {(event.createdBy?.name || "Unknown")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                    <span>Created by {event.createdBy?.name || "Unknown"}</span>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-[#075B5E]/80 bg-[#075B5E]/5 rounded-xl p-3">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {new Date(event.dateTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-[#075B5E]/80 bg-[#075B5E]/5 rounded-xl p-3">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {new Date(event.dateTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-sm text-[#075B5E]/80 mb-6 bg-[#075B5E]/5 rounded-xl p-3">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-[#075B5E]/80 mb-8 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Join Button */}
                  <button
                    onClick={() => handleJoinEvent(event._id)}
                    disabled={event.attendees?.includes(user?._id)}
                    className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${
                      event.attendees?.includes(user?._id)
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-[#075B5E] text-[#EFE4D2] hover:bg-[#075B5E]/90 hover:shadow-xl transform hover:scale-[1.02] group-hover:scale-[1.02]"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {event.attendees?.includes(user?._id) ? (
                        <>
                          <Star className="w-5 h-5" />
                          Already Joined
                        </>
                      ) : (
                        <>
                          Join Event
                          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                        </>
                      )}
                    </span>
                  </button>

                  {/* Decorative Corner */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-[#075B5E]/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 animate-fade-in delay-1200">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#075B5E]/10 p-4">
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      page === i + 1
                        ? "bg-[#075B5E] text-[#EFE4D2] shadow-lg scale-110"
                        : "bg-[#075B5E]/10 text-[#075B5E] hover:bg-[#075B5E]/20 hover:scale-105"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
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

        .animate-slide-right {
          animation: slide-right 0.8s ease-out forwards;
        }

        .animate-slide-left {
          animation: slide-left 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </div>
  );
};

export default Events;
