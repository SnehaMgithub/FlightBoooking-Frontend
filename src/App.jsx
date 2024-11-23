import React, { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FlightSearch from "./Pages/FlightSearch";
import FlightBooking from "./Pages/FlightBooking";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import NotFound from "./Pages/NotFound";
import Navbar from "./Components/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentPage from "./Pages/PaymentPage";
import HomePage from "./Pages/Home";
import ThankYouPage from "./Pages/Success";
import BookingHistory from "./Pages/BookingHistory";
import PaymentFailedPage from "./Pages/PaymentFailedPage";
import Footer from "./Components/Footer";
const App = () => {

  const stripePromise = loadStripe("pk_test_51QNZMmGBBAKFvbM2tWdaZFDHWFNHE4G0YBQQuA0O8HxEqnDVbRi7ttvfLuPrWNwpevsYMssQGhamT4eenaUxOEaI00PbKqFjY6");
  return (
    <>
      {/* Toast notifications */}
      <ToastContainer />

      {/* Router */}
      <BrowserRouter>
        {/* Navbar */}
        <Navbar />
        <Elements stripe={stripePromise}>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<FlightSearch />} />
          <Route path="/book" element={<FlightBooking />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword  />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/failed" element={<PaymentFailedPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Elements>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
