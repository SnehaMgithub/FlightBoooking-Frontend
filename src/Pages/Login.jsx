// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../Services/api";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//      const response = await api.post("/users/login", { email, password });
//       localStorage.setItem("token", response.data.token);
//       toast.success(response.data.message);
//       setError(null);
//       navigate("/");
//     } catch (error) {
//       setError(error.response.data.message);
//     toast.error(error.response.data.message);
//     }
//     setEmail("");
//     setPassword("");
//   };


//   return (
//     <div className="container mx-auto mt-8">
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-md mx-auto bg-white p-8 shadow"
//       >
//         <h2 className="text-2xl mb-4 font-bold">Login</h2>
//         {error && (
//           <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
//             {error}
//           </div>
//         )}
//         <p>
//           <label htmlFor="email" className="block mb-2 font-bold">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="Enter the Your Email Id"
//             className="border w-full p-2 mb-4 rounded"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </p>
//         <p>
//           <label htmlFor="password" className="block mb-2 font-bold">
//             Password
//           </label>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             id="password"
//             placeholder="Enter the Your Password"
//             className="border w-full p-2 mb-4 rounded"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <br></br>
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="bg-red-100 p-2 mb-4 text-red-600  font-serif rounded"
//           >
//             {showPassword ? "Hide" : "Show"} password
//           </button>
//         </p>
//         <button onClick={() => navigate("/forgot-password")} className="bg-red-100 p-2 mb-4 text-red-600  font-serif rounded">Forgot Password</button>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white rounded font-serif p-2 text-xl"
//         >
//           Login
//         </button>
//         <div className="bg-red-100 p-2 mb-4 text-red-600 mt-4 font-serif rounded">Don't have an account? <a href="/register">Register</a></div>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../Services/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      setError(null);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-lg"
      >
        <h2 className="text-2xl mb-4 font-bold text-gray-800 text-center">Login</h2>

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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="border w-full p-2 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-blue-500 hover:text-blue-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-500 hover:text-blue-700 underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>

        <div className="mt-4 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

