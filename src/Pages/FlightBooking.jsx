import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBookingDetails } from "../Redux/Slices/FlightSlice.jsx";
import api from "../Services/api";

const FlightBooking = () => {
  const selectedFlight = useSelector((state) => state.flight.selectedFlight);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passengerDetails, setPassengerDetails] = useState([
    {
      firstName: "",
      lastName: "",
      gender: "Male",
      countryCode: "India(91)",
      mobileNo: "",
      email: "",
      requiresWheelchair: false,
      seatType: "Window",
      seatClass: "Economy",
      meal: "Standard",
    },
  ]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFlight) {
      setErrorMessage("No flight selected. Redirecting to search...");
      setTimeout(() => {
        navigate("/flights");
      }, 3000);
    }
  }, [selectedFlight, navigate]);

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengerDetails];
    updatedPassengers[index][field] = value;
    setPassengerDetails(updatedPassengers);
  };

  const handleAddPassenger = () => {
    setPassengerDetails([
      ...passengerDetails,
      {
        firstName: "",
        lastName: "",
        gender: "Male",
        countryCode: "India(91)",
        mobileNo: "",
        email: "",
        requiresWheelchair: false,
        seatType: "Window",
        seatClass: "Economy",
        meal: "Standard",
      },
    ]);
  };

  const handleRemovePassenger = (index) => {
    setPassengerDetails(passengerDetails.filter((_, i) => i !== index));
  };

  const validatePassengerDetails = () => {
    return passengerDetails.every(
      (p) => p.firstName && p.lastName && p.mobileNo && p.email
    );
  };

  const calculateTotalPrice = () => {
    if (!passengerDetails.length) return "0.00";

    let totalPrice = 0;

    passengerDetails.forEach((passenger) => {
      let price = parseFloat(selectedFlight.price) || 0;

      // Adjust for seat class
      if (passenger.seatClass === "Business") {
        price += price * 0.3; // 30% increase
      } else if (passenger.seatClass === "First Class") {
        price += price * 0.5; // 50% increase
      }

      // Adjust for seat type
      if (passenger.seatType === "Window") {
        price += 200; // ₹200 extra for Window seats
      } else if (passenger.seatType === "Aisle") {
        price += 100; // ₹100 extra for Aisle seats
      }

      // Add for meal type
      if (passenger.meal === "Vegetarian") {
        price += 500;
      } else if (passenger.meal === "Kids") {
        price += 300;
      }

      totalPrice += price;
    });

    return totalPrice.toFixed(2);
  };

  const handleBooking = async () => {
    if (!validatePassengerDetails()) {
      setErrorMessage("Please fill in all required passenger details.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You are not logged in. Please log in to continue.");
      navigate("/login");
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const bookingPayload = {
        flight: selectedFlight,
        passengerDetails,
        totalPrice: calculateTotalPrice(),
      };

      console.log("Booking Payload:", bookingPayload);

      const response = await api.post("/flights/book", bookingPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data);

      const { bookingId, status } = response.data || {};
      if (!bookingId || (status && status !== "Confirmed")) {
        throw new Error("Booking confirmation failed.");
      }

      dispatch(
        setBookingDetails({
          bookingId,
          amount: calculateTotalPrice(),
        })
      );

      navigate("/payment", { state: { bookingId } });
    } catch (error) {
      if (error.response) {
        console.error("Backend Error Response:", error.response.data);
        setErrorMessage(error.response.data.error || "Failed to book the flight.");
      } else {
        console.error("Booking Error:", error.message);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">Book Flight</h3>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {selectedFlight ? (
        <>
          {/* Flight Details Section */}
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow">
            <h4 className="text-xl font-semibold text-gray-700 mb-3">
              Flight Details
            </h4>
            <p className="text-lg">
              <span className="font-semibold">Route:</span>{" "}
              {selectedFlight.departureCity} to {selectedFlight.arrivalCity}
            </p>
            <p>
              <span className="font-semibold">Airline:</span>{" "}
              {selectedFlight.airlineName}
            </p>
            <p>
              <span className="font-semibold">Departure:</span>{" "}
              {new Date(selectedFlight.departureTime).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Arrival:</span>{" "}
              {new Date(selectedFlight.arrivalTime).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Duration:</span>{" "}
              {selectedFlight.duration}
            </p>
            <p>
              <span className="font-semibold">Stops:</span>{" "}
              {selectedFlight.stopType}
            </p>
            <p className="text-green-600 font-bold text-lg">
              <span className="font-semibold">Price:</span> ₹
              {selectedFlight.price}
            </p>
          </div>

          {/* Passenger Details Section */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Passenger Details
          </h3>
          {passengerDetails.map((passenger, index) => (
            <div
              key={index}
              className={`mb-4 p-4 rounded-lg shadow border ${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
              }`}
            >
              <h4 className="font-medium mb-2 text-blue-600">
                Passenger {index + 1}
              </h4>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 border rounded"
                  value={passenger.firstName}
                  onChange={(e) =>
                    handlePassengerChange(index, "firstName", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 border rounded"
                  value={passenger.lastName}
                  onChange={(e) =>
                    handlePassengerChange(index, "lastName", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Mobile No"
                  className="w-full p-2 border rounded"
                  value={passenger.mobileNo}
                  onChange={(e) =>
                    handlePassengerChange(index, "mobileNo", e.target.value)
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  value={passenger.email}
                  onChange={(e) =>
                    handlePassengerChange(index, "email", e.target.value)
                  }
                />
              </div>

              {/* Gender Selection */}
              <div className="flex space-x-4 mt-4">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    className="mr-2"
                    value="Male"
                    checked={passenger.gender === "Male"}
                    onChange={(e) =>
                      handlePassengerChange(index, "gender", e.target.value)
                    }
                  />
                  Male
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    className="mr-2"
                    value="Female"
                    checked={passenger.gender === "Female"}
                    onChange={(e) =>
                      handlePassengerChange(index, "gender", e.target.value)
                    }
                  />
                  Female
                </label>
              </div>

              {/* Seat Type */}
              <div className="mt-4">
                <label className="font-medium block mb-1">Seat Type</label>
                <select
                  className="w-full p-2 border rounded"
                  value={passenger.seatType}
                  onChange={(e) =>
                    handlePassengerChange(index, "seatType", e.target.value)
                  }
                >
                  <option value="Window">Window</option>
                  <option value="Middle">Middle</option>
                  <option value="Aisle">Aisle</option>
                </select>
              </div>

              {/* Seat Class */}
              <div className="mt-4">
                <label className="font-medium block mb-1">Seat Class</label>
                <select
                  className="w-full p-2 border rounded"
                  value={passenger.seatClass}
                  onChange={(e) =>
                    handlePassengerChange(index, "seatClass", e.target.value)
                  }
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
              </div>

              {/* Meal Options */}
              <div className="mt-4">
                <label className="font-medium block mb-1">Meal Option</label>
                <select
                  className="w-full p-2 border rounded"
                  value={passenger.meal}
                  onChange={(e) =>
                    handlePassengerChange(index, "meal", e.target.value)
                  }
                >
                  <option value="Standard">Standard Meal</option>
                  <option value="Vegetarian">Vegetarian Meal</option>
                  <option value="Kids">Kids Meal</option>
                </select>
              </div>

              {/* Remove Passenger Button */}
              {index > 0 && (
                <button
                  onClick={() => handleRemovePassenger(index)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove Passenger
                </button>
              )}
            </div>
          ))}

          {/* Add New Passenger Button */}
          <button
            onClick={handleAddPassenger}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
          >
            + Add New Passenger
          </button>

          {/* Total Price and Confirm Button */}
          <p className="mt-6 text-lg font-semibold text-gray-800">
            Total Price: ₹{calculateTotalPrice()}
          </p>
          <button
            onClick={handleBooking}
            className={`bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-600 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm Booking"}
          </button>
        </>
      ) : (
        <p className="text-red-500">No flight selected. Redirecting...</p>
      )}
    </div>
  );
};

export default FlightBooking;
