// components/Navbar.js
import React from "react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { ChevronDown, LogOut } from "lucide-react";
import logo from "../../assets/Logo.png"

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  // console.log(user.id);
  
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <nav className="bg-[#075B5E] text-[#EFE4D2] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Website Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="CarShare Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#075B5E]/80"
              >
                Home
              </Link>
              <Link
                to="/events"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#075B5E]/80"
              >
                Events
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/add-event"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#075B5E]/80"
                  >
                    Add Event
                  </Link>
                  <Link
                    to="/my-events"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#075B5E]/80"
                  >
                    My Events
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="ml-4 flex items-center md:ml-6">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user?.photo || "https://i.ibb.co/ScLz5b5/pic1.jpg"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown className="w-4 h-4" />
                </button>

                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-[#075B5E] z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm border-b">
                        <p className="font-medium">{user?.name}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 rounded-md text-sm font-medium bg-[#EFE4D2] text-[#075B5E] hover:bg-[#EFE4D2]/90"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
