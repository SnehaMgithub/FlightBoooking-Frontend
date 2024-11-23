import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear user token
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-100 text-white p-4 fixed top-0 w-full shadow-md z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to={"/"} className="text-4xl font-bold hover:opacity-80 transition duration-200">
        Fʅყɱҽɾα
        </Link>

        {/* Links Section */}
        <div className="flex items-center space-x-6">
          <Link
            to={"/"}
            className="hover:underline text-xl font-bold hover:text-gray-200 transition duration-200"
          >
            Home
          </Link>
          <Link
            to={"/history"}
            className="hover:underline text-xl font-bold hover:text-gray-200 transition duration-200"
          >
            History
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-300 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to={"/login"}
                className="bg-red-300 hover:bg-red-400 font-semibold text-white px-4 py-2 rounded-3xl transition duration-200"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-red-300 hover:bg-red-400 font-semibold text-white px-4 py-2 rounded-3xl transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
