// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import video from "../assets/video.mp4";
// import image from "../assets/aeroplane.png";
// import windowImage1 from "../assets/1.jpg";
// import windowImage2 from "../assets/2.jpg";
// import windowImage3 from "../assets/3.jpg";
// import windowImage4 from "../assets/4.jpg";
// import windowImage5 from "../assets/5.jpg";
// import windowImage6 from "../assets/6.jpg";
// import windowImage7 from "../assets/7.jpg";
// import windowImage8 from "../assets/8.jpg";

// const HomePage = () => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [departureDate, setDepartureDate] = useState("");
//   const [passengers, setPassengers] = useState(1);
//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   const checkTokenAndRedirect = () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/register");
//     }
//   };

//   useEffect(() => {
//     const handleWindowClick = () => {
//       checkTokenAndRedirect();
//     };

//     window.addEventListener("click", handleWindowClick);

//     return () => {
//       window.removeEventListener("click", handleWindowClick);
//     };
//   }, []);

//   const handleSearch = () => {
//     if (!origin || !destination || !departureDate) {
//       setErrorMessage("Please fill in all required fields.");
//       return;
//     }
//     navigate("/search", {
//       state: { origin, destination, departureDate, passengers },
//     });
//   };

//   const travelers = [
//     { img: windowImage5, name: "John Doe" },
//     { img: windowImage6, name: "Jane Smith" },
//     { img: windowImage7, name: "Michael Lee" },
//     { img: windowImage8, name: "Emily Johnson" },
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen py-16 overflow-x-hidden">
//       {/* Header Section */}
//       <div className="text-center text-black py-10">
//         <h1 className="text-4xl font-bold">
//           Create Ever-Lasting Memories With Us
//         </h1>
//         <p className="text-lg mt-2">
//           Find the best flights and make unforgettable moments.
//         </p>
//       </div>

//       {/* Video and Airplane Section */}
//       <div className="relative flex justify-center items-center py-10">
//         <div className="relative w-full max-w-lg overflow-hidden rounded-full aspect-video shadow-lg">
//           <video
//             src={video}
//             autoPlay
//             loop
//             muted
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <img
//           src={image}
//           alt="Airplane"
//           className="absolute w-3/4 lg:w-1/3 top-2/3 transform -translate-y-80"
//         />
//       </div>

//       {/* Flight Search Section */}
//       <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10">
//         <h2 className="text-2xl font-bold mb-4">Search Flights</h2>
//         {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//         <div className="flex items-center gap-4">
//           {/* Origin Input */}
//           <div className="flex-1">
//             <label className="block mb-1 font-medium">Origin</label>
//             <input
//               type="text"
//               placeholder="(IATA code) eg.,MAA"
//               className="w-full p-2 border rounded"
//               value={origin}
//               onChange={(e) => setOrigin(e.target.value.toUpperCase())}
//             />
//           </div>

//           {/* Destination Input */}
//           <div className="flex-1">
//             <label className="block mb-1 font-medium">Destination</label>
//             <input
//               type="text"
//               placeholder="(IATA code) eg.,CJB"
//               className="w-full p-2 border rounded"
//               value={destination}
//               onChange={(e) => setDestination(e.target.value.toUpperCase())}
//             />
//           </div>

//           {/* Departure Date Input */}
//           <div className="flex-1">
//             <label className="block mb-1 font-medium">Departure Date</label>
//             <input
//               type="date"
//               className="w-full p-2 border rounded"
//               value={departureDate}
//               onChange={(e) => setDepartureDate(e.target.value)}
//             />
//           </div>

//           {/* Passengers Input */}
//           <div className="flex-1">
//             <label className="block mb-1 font-medium">Passengers</label>
//             <input
//               type="number"
//               min="1"
//               className="w-full p-2 border rounded"
//               value={passengers}
//               onChange={(e) => setPassengers(Number(e.target.value))}
//             />
//           </div>

//           {/* Search Button */}
//           <div className="flex-none">
//             <button
//               onClick={handleSearch}
//               className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all lg:mt-6"
//             >
//               Search Flights
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Travel Support Section */}
//       <div className="flex flex-col items-center text-center gap-4 p-6 mt-5 lg:mt-24">
//         <div className="text-lg font-bold">Travel Support</div>
//         <h2 className="text-3xl font-semibold">Plan your travels with confidence</h2>
//         <p className="text-gray-600 max-w-md">
//           Find help with booking and travel plans, see what to expect along the journey!
//         </p>
//       </div>


//        <div className="flex w-full items-center gap-8 p-6 lg:ml-32 md:ml-20 lg:mt-10">

//    {/* Text Content Section */}
//    <div className="flex flex-col gap-6 max-w-lg">
//      {/* Card 01 */}
//      <div>
//        <span className="text-blue-500 text-2xl font-bold">01</span>
//        <h4 className="text-xl font-semibold mt-2">Travel Requirements for Dubai</h4>
//        <p className="text-gray-600">
//        Plan your Dubai adventure with ease by understanding visa, and entry regulations. Ensure smooth travel with up-to-date guidelines for a hassle-free trip.
//        </p>
//      </div>

//      {/* Card 02 */}
//           <div>
//        <span className="text-blue-500 text-2xl font-bold">02</span>
//        <h4 className="text-xl font-semibold mt-2">Multi-risk travel insurance</h4>
//        <p className="text-gray-600">
//        Secure your journey with comprehensive multi-risk travel insurance. Stay protected against unexpected events, including medical emergencies, trip cancellations, and lost baggage.
//        </p>
//      </div>

//      {/* Card 03 */}
//      <div>
//        <span className="text-blue-500 text-2xl font-bold">03</span>
//        <h4 className="text-xl font-semibold mt-2">Chauffeur services at your arrival</h4>
//        <p className="text-gray-600">
//        Experience comfort and convenience with our chauffeur services upon arrival. Enjoy seamless transfers to your destination with professional drivers at your service.
//        </p>
//      </div>
//    </div>

//    {/* Image Section */}
//    <div className="flex gap-4">
//      <img
//       src={windowImage1}
//       alt="window"
//       className="w-32 h-52 rounded-[30px] shadow-lg object-cover"
//     />
//     <img
//       src={windowImage2}
//       alt="window"
//       className="w-32 h-48 rounded-[30px] shadow-lg object-cover"
//     />
//     <img
//       src={windowImage3}
//       alt="window"
//       className="w-32 h-44 rounded-[30px] shadow-lg object-cover"
//     />
//     <img
//       src={windowImage4}
//       alt="window"
//       className="w-32 h-40 rounded-[30px] shadow-lg object-cover"
//     />
//   </div>
// </div>


//       {/* Traveler Cards Section */}
//       <div className="text-center py-8 lg:mt-5">
//         <h4 className="text-2xl font-bold mb-6">Top Travelers Of This Month!</h4>
//         <div className="flex justify-center gap-4">
//           {travelers.map((traveler, index) => (
//             <div key={index} className="relative group">
//               <img
//                 src={traveler.img}
//                 alt="traveler"
//                 className="w-44 h-52 rounded-[30px] shadow-lg object-cover transform transition-transform duration-300 group-hover:scale-110"
//               />
//               <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white p-1 rounded-lg shadow-md">
//                 <p className="text-sm font-semibold">{traveler.name}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
import image from "../assets/aeroplane.png";
import windowImage1 from "../assets/1.jpg";
import windowImage2 from "../assets/2.jpg";
import windowImage3 from "../assets/3.jpg";
import windowImage4 from "../assets/4.jpg";
import windowImage5 from "../assets/5.jpg";
import windowImage6 from "../assets/6.jpg";
import windowImage7 from "../assets/7.jpg";
import windowImage8 from "../assets/8.jpg";
import api from "../Services/api"; // Assuming API service setup

const HomePage = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/register");
  }, [navigate]);

  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await api.get(`/flights/locations?keyword=${query}`);
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleOriginChange = (e) => {
    const value = e.target.value.toUpperCase();
    setOrigin(value);
    fetchSuggestions(value, setOriginSuggestions);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value.toUpperCase();
    setDestination(value);
    fetchSuggestions(value, setDestinationSuggestions);
  };

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    navigate("/search", { state: { origin, destination, departureDate, passengers } });
  };

  const travelers = [
    { img: windowImage5, name: "John Doe" },
    { img: windowImage6, name: "Jane Smith" },
    { img: windowImage7, name: "Michael Lee" },
    { img: windowImage8, name: "Emily Johnson" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-16 overflow-x-hidden">
      {/* Header Section */}
      <div className="text-center text-black py-10">
        <h1 className="text-4xl font-bold">Create Ever-Lasting Memories With Us</h1>
        <p className="text-lg mt-2">Find the best flights and make unforgettable moments.</p>
      </div>

      {/* Video and Airplane Section */}
      <div className="relative flex justify-center items-center py-10">
        <div className="relative w-full max-w-lg overflow-hidden rounded-full aspect-video shadow-lg">
          <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
        </div>
        <img
          src={image}
          alt="Airplane"
          className="absolute w-3/4 lg:w-1/3 top-2/3 transform -translate-y-80"
        />
      </div>

      {/* Flight Search Section */}
  <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10">
  <h2 className="text-2xl font-bold mb-4">Search Flights</h2>
  {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
    {/* Origin Input */}
    <div className="relative col-span-2">
      <label className="block text-sm font-medium">Origin</label>
      <input
        type="text"
        placeholder="Enter origin"
        value={origin}
        onChange={handleOriginChange}
        className="w-full mt-1 p-2 border rounded"
      />
      {originSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded shadow-lg max-h-40 overflow-auto w-full mt-2">
          {originSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setOrigin(suggestion.iataCode);
                setOriginSuggestions([]);
              }}
            >
              {suggestion.name} ({suggestion.iataCode})
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Destination Input */}
    <div className="relative col-span-2">
      <label className="block text-sm font-medium">Destination</label>
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={handleDestinationChange}
        className="w-full mt-1 p-2 border rounded"
      />
      {destinationSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded shadow-lg max-h-40 overflow-auto w-full mt-2">
          {destinationSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setDestination(suggestion.iataCode);
                setDestinationSuggestions([]);
              }}
            >
              {suggestion.name} ({suggestion.iataCode})
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Departure Date Input */}
    <div className="col-span-1">
      <label className="block text-sm font-medium">Departure Date</label>
      <input
        type="date"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        className="w-full mt-1 p-2 border rounded"
      />
    </div>

    {/* Passengers Input */}
    <div className="col-span-1">
      <label className="block text-sm font-medium">Passengers</label>
      <input
        type="number"
        min="1"
        value={passengers}
        onChange={(e) => setPassengers(Number(e.target.value))}
        className="w-full mt-1 p-2 border rounded"
      />
    </div>

    {/* Search Button */}
    <div className="col-span-1 w-64 flex justify-center items-end lg:ml-72">
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-all"
      >
        Search Flights
      </button>
    </div>
  </div>
</div>



      {/* Travel Support Section */}
      <div className="flex flex-col items-center text-center gap-4 p-6 mt-5 lg:mt-24">
        <div className="text-lg font-bold">Travel Support</div>
        <h2 className="text-3xl font-semibold">Plan your travels with confidence</h2>
        <p className="text-gray-600 max-w-md">
          Find help with booking and travel plans, see what to expect along the journey!
        </p>
      </div>

    <div className="flex w-full items-center gap-8 p-6 lg:ml-32 md:ml-20 lg:mt-10">

    {/* Text Content Section */}
    <div className="flex flex-col gap-6 max-w-lg">
      {/* Card 01 */}
      <div>
        <span className="text-blue-500 text-2xl font-bold">01</span>
        <h4 className="text-xl font-semibold mt-2">Travel Requirements for Dubai</h4>
        <p className="text-gray-600">
        Plan your Dubai adventure with ease by understanding visa, and entry regulations. Ensure smooth travel with up-to-date guidelines for a hassle-free trip.
        </p>
      </div>

      {/* Card 02 */}
           <div>
        <span className="text-blue-500 text-2xl font-bold">02</span>
        <h4 className="text-xl font-semibold mt-2">Multi-risk travel insurance</h4>
        <p className="text-gray-600">
        Secure your journey with comprehensive multi-risk travel insurance. Stay protected against unexpected events, including medical emergencies, trip cancellations, and lost baggage.
        </p>
      </div>

      {/* Card 03 */}
      <div>
        <span className="text-blue-500 text-2xl font-bold">03</span>
       <h4 className="text-xl font-semibold mt-2">Chauffeur services at your arrival</h4>
        <p className="text-gray-600">
        Experience comfort and convenience with our chauffeur services upon arrival. Enjoy seamless transfers to your destination with professional drivers at your service.
        </p>
      </div>
    </div>

          {/* Image Section */}
    <div className="flex gap-4">
      <img
      src={windowImage1}
      alt="window"
      className="w-32 h-52 rounded-[30px] shadow-lg object-cover"
    />
    <img
      src={windowImage2}
      alt="window"
      className="w-32 h-48 rounded-[30px] shadow-lg object-cover"
    />
    <img
      src={windowImage3}
      alt="window"
      className="w-32 h-44 rounded-[30px] shadow-lg object-cover"
    />
    <img
      src={windowImage4}
      alt="window"
      className="w-32 h-40 rounded-[30px] shadow-lg object-cover"
    />
  </div>
  </div>


      {/* Traveler Cards Section */}
      <div className="text-center py-8 lg:mt-5">

        <h4 className="text-2xl font-bold mb-6">Top Travelers Of This Month!</h4>
        <div className="flex justify-center gap-4">
          {travelers.map((traveler, index) => (
            <div key={index} className="relative group">
              <img
                src={traveler.img}
                alt="traveler"
                className="w-44 h-52 rounded-[30px] shadow-lg object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white p-1 rounded-lg shadow-md">
                <p className="text-sm font-semibold">{traveler.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;