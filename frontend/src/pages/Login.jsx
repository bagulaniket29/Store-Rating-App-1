import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { id, name, role } = res.data.user;

      localStorage.setItem("userId", id);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);

      if (role === "admin") navigate("/admin");
      else if (role === "owner") navigate("/owner");
      else if (role === "user") navigate("/user");
      else {
        setError("Unknown role. Please contact support.");
        localStorage.clear();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dfe9f3] to-[#ffffff] relative overflow-hidden">
      {/* Blurred gradient background blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-ping"></div>

      {/* Branding */}
      <div className="absolute top-6 w-full flex justify-center z-20">
  <div className="text-center">
    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text drop-shadow-xl flex items-center justify-center gap-2">
      <span className="animate-bounce"></span>
      <span>Store Rating App</span>
    </h1>
    <p className="text-sm md:text-base text-gray-700 mt-1 font-medium tracking-wide">
      Share experiences, rate smartly!
    </p>
  </div>
</div>


      {/* Login Form */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 transform hover:scale-105 transition duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome Back 👋
        </h2>

        {error && <div className="text-red-600 text-sm mb-4 text-center">{error}</div>}
        {loading && <div className="text-blue-600 text-sm mb-4 text-center">Logging in...</div>}

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1 font-medium">Email</label>
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 bg-white">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              required
              className="w-full outline-none"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1 font-medium">Password</label>
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400 bg-white">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              required
              className="w-full outline-none"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 transform hover:scale-[1.02]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
