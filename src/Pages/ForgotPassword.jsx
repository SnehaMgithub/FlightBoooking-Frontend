// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../Services/api";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/users/forgot-password", { email });
//       toast.success(response.data.message);
//       setError(null);
//       navigate("/login");
//     } catch (error) {
//       setError(error.response.data.message);
//       toast.error(error.response.data.message);
//     }
//     setEmail("");
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 shadow" >
//       <h2 className="text-2xl mb-4 font-bold">Forgot Password</h2>
//         {error && (
//           <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
//             {error}
//           </div>
//         )}
//         <p>
//           <label htmlFor="email"  className="block mb-2 font-bold">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="Enter Your Email Id"
//             className="border w-full p-2 mb-4 rounded"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </p>
//         <button type="submit" className="w-full bg-blue-500 text-white rounded font-serif p-2 text-xl">Send</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/forgot-password", { email });
      toast.success(response.data.message);
      setError(null);
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send reset email";
      setError(errorMessage);
      toast.error(errorMessage);
    }
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-lg"
      >
        <h2 className="text-2xl mb-4 font-bold text-gray-800 text-center">
          Forgot Password
        </h2>

        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send Reset Link
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

export default ForgotPassword;
