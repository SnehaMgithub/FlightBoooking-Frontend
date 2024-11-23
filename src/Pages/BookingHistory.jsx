import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookingHistory } from "../Redux/Slices/FlightSlice";
import api from "../Services/api";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const bookingHistory = useSelector((state) => state.flight.bookingHistory);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await api.get("/flights/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Booking History Response:", response.data);
        dispatch(setBookingHistory(response.data));
      } catch (error) {
        console.error("Error fetching booking history:", error.message);
      }
    };

    fetchBookingHistory();
  }, [dispatch]);

  if (!Array.isArray(bookingHistory)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">Invalid booking history data.</p>
      </div>
    );
  }
  
  if (bookingHistory.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-center text-gray-500">No booking history available.</p>
      </div>
    );
  }

  
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }

    try {
      const response = await api.put(`/flights/cancel/${bookingId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Update booking status in Redux state
      const updatedHistory = bookingHistory.map((booking) =>
        booking.bookingId === bookingId ? { ...booking, status: "Cancelled" } : booking
      );
      dispatch(setBookingHistory(updatedHistory));

      alert(response.data.message || "Reservation cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling reservation:", error.message);
      alert("Failed to cancel reservation. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Booking History</h2>
      {bookingHistory.map((booking, index) => (
        <div
          key={index}
          className="p-4 mb-4 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <p>
            <strong>Booking ID:</strong> {booking.bookingId}
          </p>
          <p>
            <strong>Airline Name:</strong> {booking.airlineName}
          </p>
          <p>
            <strong>Flight:</strong> {booking.departureCity} to {booking.arrivalCity}
          </p>
          <p>
            <strong>Departure:</strong> {new Date(booking.departureTime).toLocaleString()}
          </p>
          <p>
            <strong>Arrival:</strong> {new Date(booking.arrivalTime).toLocaleString()}
          </p>
          <p>
            <strong>Duration:</strong> {booking.duration}
          </p>
          <p>
            <strong>Stop Type:</strong> {booking.stopType}
          </p>
          <p>
            <strong>Passengers:</strong> {booking.passengers?.length || 0} {/* Fixed passenger count */}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{booking.price}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`${
                booking.status === "Cancelled"
                  ? "text-red-500"
                  : "text-green-500"
              } font-semibold`}
            >
              {booking.status}
            </span>
          </p>

          {/* Cancel Reservation Button */}
          {booking.status !== "Cancelled" && (
            <button
              onClick={() => handleCancel(booking.bookingId)}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
            >
              Cancel Reservation
            </button>
          )}
        </div>
      ))}
    </div>
  );

};
  // Cancel Reservation Function
export default BookingHistory;