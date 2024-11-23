
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setSelectedFlight } from "../Redux/Slices/FlightSlice";
import api from "../Services/api";

const FlightSearchResults = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [compareFlights, setCompareFlights] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filters, setFilters] = useState({
    airline: [],
    priceRange: "all",
    nonStop: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { origin, destination, departureDate, passengers } = location.state || {};

  // Fetch flights based on search criteria
  useEffect(() => {
    if (!origin || !destination || !departureDate) {
      setErrorMessage("Missing search parameters. Please go back and try again.");
      return;
    }
    fetchFlights();
  }, [origin, destination, departureDate, passengers]);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await api.get("/flights/search", {
        params: { origin, destination, departureDate, passengers },
      });
      setFlights(response.data.flights || []);
    } catch (error) {
      console.error("Error fetching flight data:", error.message);
      setErrorMessage("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (flight) => {
    if (compareFlights.length >= 3) {
      setErrorMessage("You can compare up to 3 flights only.");
      return;
    }
    if (compareFlights.some((f) => f.uniqueKey === flight.uniqueKey)) {
      setErrorMessage("Flight already added for comparison.");
      return;
    }
    setCompareFlights([...compareFlights, flight]);
  };

  const handleRemoveCompare = (uniqueKey) => {
    setCompareFlights(compareFlights.filter((f) => f.uniqueKey !== uniqueKey));
  };

  const handleBooking = (flight) => {
    dispatch(setSelectedFlight(flight));
    navigate("/book");
  };

  const filteredFlights = flights.filter((flight) => {
    const matchesAirline =
      filters.airline.length === 0 || filters.airline.includes(flight.airlineName);
    const matchesPrice =
      filters.priceRange === "all" ||
      (filters.priceRange === "low" && flight.price <= 5000) ||
      (filters.priceRange === "medium" && flight.price > 5000 && flight.price <= 10000) ||
      (filters.priceRange === "high" && flight.price > 10000);
    const matchesNonStop = !filters.nonStop || flight.stopType === "Non-stop";

    return matchesAirline && matchesPrice && matchesNonStop;
  });

  return (
    // <div className="p-6 max-w-6xl mx-auto bg-gray-100">
    //   <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
    //     Flight Search Results
    //   </h2>

    //   {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}

    //   {/* Filters Section */}
    //   <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
    //     <h3 className="text-xl font-bold mb-4">Filters</h3>
    //     <div className="flex flex-wrap gap-6">
    //       <div className="flex-1">
    //         <h4 className="font-medium mb-2">Airline</h4>
    //         {Array.from(new Set(flights.map((flight) => flight.airlineName))).map((airline) => (
    //           <label key={airline} className="flex items-center mb-2 space-x-2">
    //             <input
    //               type="checkbox"
    //               checked={filters.airline.includes(airline)}
    //               onChange={() =>
    //                 setFilters((prev) => ({
    //                   ...prev,
    //                   airline: prev.airline.includes(airline)
    //                     ? prev.airline.filter((a) => a !== airline)
    //                     : [...prev.airline, airline],
    //                 }))
    //               }
    //               className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    //             />
    //             <span>{airline}</span>
    //           </label>
    //         ))}
    //       </div>

    //       <div className="flex-1">
    //         <h4 className="font-medium mb-2">Price Range</h4>
    //         {["all", "low", "medium", "high"].map((range) => (
    //           <label key={range} className="flex items-center mb-2 space-x-2">
    //             <input
    //               type="radio"
    //               name="priceRange"
    //               checked={filters.priceRange === range}
    //               onChange={() => setFilters((prev) => ({ ...prev, priceRange: range }))}
    //               className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    //             />
    //             <span>
    //               {range === "all"
    //                 ? "All"
    //                 : range === "low"
    //                 ? "≤ ₹5000"
    //                 : range === "medium"
    //                 ? "₹5001 - ₹10000"
    //                 : "₹10000+"}
    //             </span>
    //           </label>
    //         ))}
    //       </div>

    //       <div>
    //         <h4 className="font-medium mb-2">Stops</h4>
    //         <label className="flex items-center mb-2 space-x-2">
    //           <input
    //             type="checkbox"
    //             checked={filters.nonStop}
    //             onChange={() => setFilters((prev) => ({ ...prev, nonStop: !prev.nonStop }))}
    //             className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
    //           />
    //           <span>Non-Stop Flights Only</span>
    //         </label>
    //       </div>
    //     </div>
    //   </div>

    //   {loading ? (
    //     <p className="text-center">Loading flights...</p>
    //   ) : filteredFlights.length > 0 ? (
    //     <>
    //       {/* Flight Results */}
    //       <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //         {filteredFlights.map((flight, index) => {
    //           const flightWithKey = { ...flight, uniqueKey: `${flight.id}-${index}` };
    //           return (
    //             <li key={flightWithKey.uniqueKey} className="p-6 border bg-white shadow-md rounded-lg">
    //               <strong className="text-lg font-bold">
    //                 {flight.departureCity} to {flight.arrivalCity}
    //               </strong>
    //               <p className="text-gray-700">Airline: {flight.airlineName}</p>
    //               <p className="text-gray-700">Departure: {new Date(flight.departureTime).toLocaleString()}</p>
    //               <p className="text-gray-700">Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
    //               <p className="text-gray-700">Duration: {flight.duration}</p>
    //               <p className="text-gray-700">Stops: {flight.stopType}</p>
    //               <p className="text-blue-600 font-semibold">Price: ₹{flight.price}</p>
    //               <div className="mt-4 space-x-2">
    //                 <button
    //                   onClick={() => handleBooking(flight)}
    //                   className="bg-blue-500 text-white px-4 py-2 rounded"
    //                 >
    //                   Book Now
    //                 </button>
    //                 <button
    //                   onClick={() => handleCompare(flightWithKey)}
    //                   className="bg-yellow-500 text-white px-4 py-2 rounded"
    //                   disabled={compareFlights.some((f) => f.uniqueKey === flightWithKey.uniqueKey) || compareFlights.length >= 3}
    //                 >
    //                   Compare
    //                 </button>
    //               </div>
    //             </li>
    //           );
    //         })}
    //       </ul>

    //       {/* Comparison Section */}
    //       {compareFlights.length > 0 && (
    //         <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
    //           <h3 className="text-xl font-bold mb-4">Compare Flights</h3>
    //           <table className="table-auto w-full border-collapse border border-gray-200">
    //             <thead>
    //               <tr>
    //                 <th className="border px-4 py-2">Airline</th>
    //                 <th className="border px-4 py-2">Departure</th>
    //                 <th className="border px-4 py-2">Arrival</th>
    //                 <th className="border px-4 py-2">Duration</th>
    //                 <th className="border px-4 py-2">Stops</th>
    //                 <th className="border px-4 py-2">Price</th>
    //                 <th className="border px-4 py-2">Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {compareFlights.map((flight) => (
    //                 <tr key={flight.uniqueKey}>
    //                   <td className="border px-4 py-2">{flight.airlineName}</td>
    //                   <td className="border px-4 py-2">{new Date(flight.departureTime).toLocaleString()}</td>
    //                   <td className="border px-4 py-2">{new Date(flight.arrivalTime).toLocaleString()}</td>
    //                   <td className="border px-4 py-2">{flight.duration}</td>
    //                   <td className="border px-4 py-2">{flight.stopType}</td>
    //                   <td className="border px-4 py-2">₹{flight.price}</td>
    //                   <td className="border px-4 py-2">
    //                     <button
    //                       onClick={() => handleRemoveCompare(flight.uniqueKey)}
    //                       className="bg-red-500 text-white px-4 py-2 rounded"
    //                     >
    //                       Remove
    //                     </button>
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </table>
    //         </div>
    //       )}
    //     </>
    //   ) : (
    //     <p className="text-center">No flights found</p>
    //   )}
    // </div>
    <div className="p-6 max-w-6xl mx-auto bg-gray-100">
    <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
      Flight Search Results
    </h2>
  
    {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
  
    {/* Filters Section */}
    <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
      <h3 className="text-xl font-bold mb-4">Filters</h3>
      <div className="flex flex-wrap gap-6">
        <div className="flex-1">
          <h4 className="font-medium mb-2">Airline</h4>
          {Array.from(new Set(flights.map((flight) => flight.airlineName))).map(
            (airline) => (
              <label key={airline} className="flex items-center mb-2 space-x-2">
                <input
                  type="checkbox"
                  checked={filters.airline.includes(airline)}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      airline: prev.airline.includes(airline)
                        ? prev.airline.filter((a) => a !== airline)
                        : [...prev.airline, airline],
                    }))
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span>{airline}</span>
              </label>
            )
          )}
        </div>
  
        <div className="flex-1">
          <h4 className="font-medium mb-2">Price Range</h4>
          {["all", "low", "medium", "high"].map((range) => (
            <label key={range} className="flex items-center mb-2 space-x-2">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range}
                onChange={() =>
                  setFilters((prev) => ({ ...prev, priceRange: range }))
                }
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span >
                {range === "all"
                  ? "All"
                  : range === "low"
                  ? "≤ ₹5000"
                  : range === "medium"
                  ? "₹5001 - ₹10000"
                  : "₹10000+"}
              </span>
            </label>
          ))}
        </div>
  
        <div>
          <h4 className="font-medium mb-2">Stops</h4>
          <label className="flex items-center mb-2 space-x-2">
            <input
              type="checkbox"
              checked={filters.nonStop}
              onChange={() =>
                setFilters((prev) => ({ ...prev, nonStop: !prev.nonStop }))
              }
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>Non-Stop Flights Only</span>
          </label>
        </div>
      </div>
    </div>
  
    {loading ? (
      <p className="text-center">Loading flights...</p>
    ) : filteredFlights.length > 0 ? (
      <>
        {/* Flight Results */}
        <ul className="space-y-6">
          {filteredFlights.map((flight, index) => {
            const flightWithKey = { ...flight, uniqueKey: `${flight.id}-${index}` };
            return (
              <li
                key={flightWithKey.uniqueKey}
                className="p-6 bg-white shadow-lg rounded-lg flex justify-between items-center"
              >
                {/* Left Section */}
                <div className="flex items-center gap-4">
                  
                  {/* Airline Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {flight.airlineName}
                    </h3>
                    <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                    <div className="mt-2 text-sm text-gray-500">
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleCompare(flightWithKey);
      }}
      className={`text-yellow-500 underline ${
        compareFlights.some((f) => f.uniqueKey === flightWithKey.uniqueKey) || compareFlights.length >= 3
          ? "opacity-50 cursor-not-allowed pointer-events-none"
          : "hover:text-yellow-600"
      }`}
    >
      Compare
    </a>
  </div>

                  </div>
                </div>
  
 {/* Center Section */}
<div className="flex-1 flex flex-col items-center">
  <div className="flex items-center gap-10">
    {/* Departure Time */}
    <div className="text-center lg:pr-20">
      <p className="text-xl font-bold text-gray-800">
        {new Date(flight.departureTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-sm text-gray-500">{flight.departureCity}</p>
    </div>

    {/* Flight Duration with Line */}
    <div className="flex items-center text-center relative">
      {/* Line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300 z-0"></div>

      {/* Duration */}
      <div className="bg-white px-2 z-10">
        <p className="text-sm text-gray-600 font-medium">{flight.duration}</p>
      </div>

      {/* Stops */}
      <div className="ml-2 bg-white px-2 z-10">
        <p className="text-xs text-green-500">{flight.stopType}</p>
      </div>
    </div>

    {/* Arrival Time */}
    <div className="text-center lg:pl-20">
      <p className="text-xl font-bold text-gray-800">
        {new Date(flight.arrivalTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-sm text-gray-500">{flight.arrivalCity}</p>
    </div>
  </div>
</div>

  
                {/* Right Section */}
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600">
                    ₹{flight.price}
                  </p>
                  <p className="text-sm text-gray-500">per adult</p>
                  
                  <button
                      onClick={() => handleBooking(flight)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Book Now
                    </button>
                </div>
              </li>
            );
          })}
        </ul>
  
        {/* Comparison Section */}
        {compareFlights.length > 0 && (
          <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-4">Compare Flights</h3>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Airline</th>
                  <th className="border px-4 py-2">Departure</th>
                  <th className="border px-4 py-2">Arrival</th>
                  <th className="border px-4 py-2">Duration</th>
                  <th className="border px-4 py-2">Stops</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {compareFlights.map((flight) => (
                  <tr key={flight.uniqueKey}>
                    <td className="border px-4 py-2">{flight.airlineName}</td>
                    <td className="border px-4 py-2">
                      {new Date(flight.departureTime).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(flight.arrivalTime).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">{flight.duration}</td>
                    <td className="border px-4 py-2">{flight.stopType}</td>
                    <td className="border px-4 py-2">₹{flight.price}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleRemoveCompare(flight.uniqueKey)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    ) : (
      <p className="text-center">No flights found</p>
    )}
  </div>
  
  
  
  

  );
};

export default FlightSearchResults;
