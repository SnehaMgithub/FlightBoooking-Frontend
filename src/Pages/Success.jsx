import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Confetti Animation */}
      <Confetti width={windowSize.width} height={windowSize.height} />
      
      <div className="p-6 max-w-lg text-center bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          🎉 Yay! Your booking is confirmed. Check your email for the details, and stay tuned for real-time updates!
        </p>
        <button
          onClick={handleBackToHome}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
