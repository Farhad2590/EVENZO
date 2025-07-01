import React from "react";
import {
  Calendar,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
  Star,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#EFE4D2] overflow-hidden ">
      {/* Animated Background Elements */}

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 animate-bounce delay-300">
          <Calendar className="w-8 h-8 text-[#075B5E]/30" />
        </div>
        <div className="absolute top-40 right-32 animate-bounce delay-700">
          <Users className="w-6 h-6 text-[#075B5E]/30" />
        </div>
        <div className="absolute bottom-40 left-16 animate-bounce delay-1000">
          <MapPin className="w-7 h-7 text-[#075B5E]/30" />
        </div>
        <div className="absolute top-60 left-1/2 animate-bounce delay-500">
          <Sparkles className="w-5 h-5 text-[#075B5E]/30" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className="mb-8 transform transition-all duration-1000 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-[#075B5E] mb-4 relative">
              <span className="inline-block animate-pulse">Even</span>
              <span className="inline-block animate-pulse delay-300">Zo</span>
              <div className="absolute -top-4 -right-4 animate-spin-slow">
                <Star className="w-12 h-12 text-[#075B5E]/50" />
              </div>
            </h1>
            <div className="h-2 bg-gradient-to-r from-transparent via-[#075B5E]/50 to-transparent rounded-full mx-auto w-64 animate-pulse"></div>
          </div>

          {/* Animated Subtitle */}
          <div className="mb-12 transform transition-all duration-1000 delay-500 animate-slide-up">
            <p className="text-xl md:text-2xl text-[#075B5E]/80 mb-6 leading-relaxed">
              Discover amazing events, connect with like-minded people, and
              create unforgettable memories
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-[#075B5E]/60">
              <div className="flex items-center gap-2 animate-fade-in delay-700">
                <Calendar className="w-5 h-5" />
                <span>Plan Events</span>
              </div>
              <div className="flex items-center gap-2 animate-fade-in delay-900">
                <Users className="w-5 h-5" />
                <span>Meet People</span>
              </div>
              <div className="flex items-center gap-2 animate-fade-in delay-1100">
                <Sparkles className="w-5 h-5" />
                <span>Create Memories</span>
              </div>
            </div>
          </div>

          {/* Animated CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-1000 animate-slide-up">
            <button className="group relative px-8 py-4 bg-[#075B5E] text-[#EFE4D2] rounded-2xl font-semibold text-lg hover:bg-[#075B5E]/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="flex items-center gap-2">
                Explore Events
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group relative px-8 py-4 bg-transparent border-2 border-[#075B5E] text-[#075B5E] rounded-2xl font-semibold text-lg hover:bg-[#075B5E] hover:text-[#EFE4D2] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="flex items-center gap-2">
                Create Event
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Animated Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transform transition-all duration-1000 delay-1500 animate-fade-in">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-[#075B5E] mb-2 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-[#075B5E]/70">Events Created</div>
            </div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-[#075B5E] mb-2 group-hover:scale-110 transition-transform duration-300">
                2.5K+
              </div>
              <div className="text-[#075B5E]/70">Active Users</div>
            </div>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-[#075B5E] mb-2 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-[#075B5E]/70">Cities</div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#075B5E]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#075B5E]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#075B5E]/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
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

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;
