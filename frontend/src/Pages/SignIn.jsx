import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router";
import useAuth from "../hooks/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    signin,
    loading: authLoading,
    error: authError,
    clearError,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    clearError();
    
    if (!formData.email || !formData.password) {
      return toast.error("Email and password are required");
    }

    try {
      await signin(formData);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      console.error("Signin error:", err);
      toast.error(err.message || "Error signing in. Please try again.");
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
              <Lock className="w-8 h-8 text-[#EFE4D2]" />
            </div>
            <h1 className="text-2xl font-bold text-black mb-2">
              Welcome Back
            </h1>
            <p className="text-black/80">Sign in to your account</p>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-500/20 rounded-lg">
              <p className="text-red-700 text-sm">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSignin} className="space-y-6">
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
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center text-black/70">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 h-4 w-4 text-[#075B5E] focus:ring-[#075B5E] border-black/20 rounded"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#075B5E] hover:text-black/80"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 bg-[#075B5E] text-[#EFE4D2] font-semibold rounded-lg hover:bg-[#075B5E]/90 transition-colors disabled:opacity-70"
            >
              {authLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-black">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#075B5E] hover:text-black font-semibold underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;