import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/users/reset-password/${id}/${token}`, {
        password,
      });

      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to reset password";
      setError(errorMessage);
      toast.error(errorMessage);
    }
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-lg"
      >
        <h2 className="text-2xl mb-4 font-bold text-gray-800 text-center">
          Reset Password
        </h2>

        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your new password"
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mt-2 text-blue-500 hover:text-blue-700 underline"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update Password
        </button>

        <div className="mt-4 text-center text-gray-700">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
