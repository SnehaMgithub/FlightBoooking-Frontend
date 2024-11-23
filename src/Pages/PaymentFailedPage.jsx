import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { bookingId, amount } = location.state || { bookingId: "Unknown", amount: "Unknown" };

  const handleRetryPayment = () => {
    navigate(`/checkout`, { state: { bookingId, amount } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-lg text-center bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-6">
          Unfortunately, your payment for Booking ID: <strong>{bookingId}</strong> could not be processed.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Amount: <strong>₹{amount}</strong>
        </p>
        <button
          onClick={handleRetryPayment}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Retry Payment
        </button>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
