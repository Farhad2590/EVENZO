import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  UserPlus,
  Upload,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    signup,
    loading: authLoading,
    error: authError,
    clearError,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const imgbbApi = "41a71049f5f8bd040846fcf2d7168ed2";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return toast.error("Name, email and password are required");
    }

    try {
      let photoUrl = "https://i.ibb.co/ScLz5b5/pic1.jpg"; // Default image

      if (photoFile) {
        const formDataImg = new FormData();
        formDataImg.append("image", photoFile);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApi}`,
          { method: "POST", body: formDataImg }
        );

        const result = await response.json();
        if (result.success) {
          photoUrl = result.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      await signup({
        name,
        email,
        password,
        photo: photoUrl,
      });

      toast.success("Account created successfully!");
      navigate("/signin");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.message || "Error creating account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE4D2] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center space-x-2 text-black hover:text-black/80"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#075B5E] rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-[#EFE4D2]" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">
              Create Account
            </h1>
            <p className="text-black/80">Join our community today</p>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-500/20 rounded-lg">
              <p className="text-red-700 text-sm">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-black/20 rounded-lg focus:ring-2 focus:ring-[#075B5E] focus:border-[#075B5E] text-black placeholder-black/50"
                  placeholder="Enter your full name"
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Profile Photo (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border border-black/20"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border border-black/20">
                      <User className="w-6 h-6 text-black/50" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="w-full cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      disabled={authLoading}
                    />
                    <div
                      className={`flex items-center justify-center px-4 py-2 border border-dashed border-black/30 rounded-lg ${
                        authLoading ? "bg-white/20" : "hover:bg-white/30"
                      }`}
                    >
                      <Upload className="w-4 h-4 mr-2 text-black" />
                      <span className="text-sm text-black">
                        {previewImage ? "Change Photo" : "Upload Photo"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/20 border border-black/20 rounded-lg focus:ring-2 focus:ring-[#075B5E] focus:border-[#075B5E] text-black placeholder-black/50"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/20 border border-black/20 rounded-lg focus:ring-2 focus:ring-[#075B5E] focus:border-[#075B5E] text-black placeholder-black/50"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black/50 hover:text-black"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-[#075B5E] text-[#EFE4D2] font-semibold rounded-lg hover:bg-[#075B5E]/90 transition-colors disabled:opacity-70"
            >
              {authLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-black">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#075B5E] hover:text-black font-semibold underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
