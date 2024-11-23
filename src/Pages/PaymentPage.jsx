// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import api from "../Services/api";

// const PaymentPage = () => {
//   const { bookingId, amount } = useSelector((state) => state.flight);

//   useEffect(() => {
//     // Dynamically load PayPal SDK
//     const loadPayPalScript = () => {
//       const script = document.createElement("script");
//       script.src = `https://www.paypal.com/sdk/js?client-id=AdPXhXGZchESzZtHUY0ch7_HaRZQ91LYrm503AWvBdyHNW8wiIthSt9tiLV-aSRSHCnqx9lz11-lHXte&currency=USD`; // Adjust currency as needed
//       script.async = true;
//       script.onload = () => initializePayPalButton();
//       document.body.appendChild(script);
//     };

//     // Initialize PayPal Button
//     const initializePayPalButton = () => {
//       window.paypal.Buttons({
//         createOrder: async () => {
//           try {
//             const response = await api.post("/payments/create", { bookingId, amount });
//             return response.data.orderId;
//           } catch (error) {
//             console.error("Error creating PayPal order:", error);
//             alert("Payment initialization failed.");
//           }
//         },
//         onApprove: async (data) => {
//           try {
//             const response = await api.post("/payments/capture", { orderId: data.orderID });
//             alert("Payment successful!");
//           } catch (error) {
//             console.error("Error capturing PayPal order:", error);
//             alert("Payment failed. Please try again.");
//           }
//         },
//         onError: (err) => {
//           console.error("PayPal Button Error:", err);
//           alert("An error occurred during the payment process.");
//         },
//       }).render("#paypal-button-container");
//     };

//     loadPayPalScript();
//   }, [bookingId, amount]);

//   return (
//     <div>
//       <h1>Payment Processing</h1>
//       <div id="paypal-button-container"></div>
//     </div>
//   );
// };

// export default PaymentPage;


// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import api from "../Services/api";

// const PaymentPage = () => {
//   const { bookingId, amount } = useSelector((state) => state.flight); // Check if bookingId and amount exist
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     if (!bookingId) {
//       setErrorMessage("Booking ID is missing.");
//       return;
//     }

//     if (!stripe || !elements) {
//       setErrorMessage("Stripe is not loaded. Please try again.");
//       return;
//     }

//     setLoading(true);
//     setErrorMessage("");

//     try {
//       // Create PaymentIntent on the backend
//       const { data } = await api.post("/payments/create", { bookingId, amount });

//       const { clientSecret } = data;

//       // Confirm the payment using the selected method
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message);
//       } else if (paymentIntent.status === "succeeded") {
//         setSuccess(true);

//         // Save the payment confirmation on the backend
//         await api.post("/payments/confirm", { paymentIntentId: paymentIntent.id });

//         alert("Payment successful!");
//       }
//     } catch (error) {
//       console.error("Payment failed:", error);
//       setErrorMessage("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handlePayment} className="p-6 max-w-md mx-auto bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Complete Payment</h2>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <p className="mb-4">Amount: ₹{amount}</p>
//       <CardElement className="p-2 border rounded mb-4" />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-500" : "bg-blue-500"}`}
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//       {success && <p className="text-green-500 mt-4">Payment Successful!</p>}
//     </form>
//   );
// };

// export default PaymentPage;

// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import api from "../Services/api";

// const PaymentPage = () => {
//   const { bookingId, amount } = useSelector((state) => state.flight);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     if (!bookingId || !amount) {
//       alert("Booking details are missing. Redirecting to booking page...");
//       navigate("/flights");
//     }
//   }, [bookingId, amount, navigate]);

//   // const handlePayment = async (event) => {
//   //   event.preventDefault();

//   //   if (!stripe || !elements) {
//   //     setErrorMessage("Stripe is not loaded. Please try again.");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const { data } = await api.post("/payments/create", { bookingId, amount });

//   //     const { clientSecret } = data;
//   //     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//   //       payment_method: {
//   //         card: elements.getElement(CardElement),
//   //       },
//   //     });

//   //     if (error) {
//   //       setErrorMessage(error.message);
//   //     } else if (paymentIntent.status === "succeeded") {
//   //       setSuccess(true);

//   //       await api.post("/payments/confirm", { paymentIntentId: paymentIntent.id });

//   //       alert("Payment successful!");
//   //       navigate("/thank-you");
//   //     }
//   //   } catch (error) {
//   //     console.error("Payment failed:", error);
//   //     setErrorMessage("Payment failed. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handlePayment = async (event) => {
//     event.preventDefault();
  
//     if (!stripe || !elements) {
//       setErrorMessage("Stripe is not loaded. Please try again.");
//       return;
//     }
  
//     setLoading(true);
//     setErrorMessage("");
  
//     try {
//       const { data } = await api.post("/payments/create", { bookingId, amount });
//       const { clientSecret } = data;
  
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });
  
//       if (error) {
//         setErrorMessage(error.message);
//       } else if (paymentIntent.status === "succeeded") {
//         console.log("Payment Intent ID:", paymentIntent.id); // Log for debugging
  
//         await api.post("/payments/confirm", { paymentIntentId: paymentIntent.id });
//         alert("Payment successful!");
//       }
//     } catch (error) {
//       console.error("Payment failed:", error);
//       setErrorMessage("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div>
//       <h1>Payment</h1>
//       {errorMessage && <p>{errorMessage}</p>}
//       <p>Booking ID: {bookingId}</p>
//       <p>Amount: ₹{amount}</p>
//       <form onSubmit={handlePayment}>
//         <CardElement />
//         <button disabled={!stripe || loading}>
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//       if (paymentIntent.status === "succeeded") {
//        setSuccess(true);

//   // Redirect to Thank You page
//   navigate("/thank-you");
// }

//     </div>
//   );
// };

// export default PaymentPage;


// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import api from "../Services/api";

// const PaymentPage = () => {
//   const { bookingId, amount } = useSelector((state) => state.flight);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     if (!bookingId || !amount) {
//       alert("Booking details are missing. Redirecting to booking page...");
//       navigate("/flights");
//     }
//   }, [bookingId, amount, navigate]);

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       setErrorMessage("Stripe is not loaded. Please try again.");
//       return;
//     }

//     setLoading(true);
//     setErrorMessage("");

//     try {
//       // Create a PaymentIntent on the backend
//       const { data } = await api.post("/payments/create", { bookingId, amount });
//       const { clientSecret } = data;

//       // Confirm the card payment
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message);
//       } else if (paymentIntent.status === "succeeded") {
//         console.log("Payment Intent ID:", paymentIntent.id); // Log for debugging

//         // Confirm payment on the backend
//         await api.post("/payments/confirm", { paymentIntentId: paymentIntent.id });

//         // Redirect to Thank You page
//         setSuccess(true);
//         navigate("/thank-you");
//       }
//     } catch (error) {
//       console.error("Payment failed:", error);
//       setErrorMessage("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <p className="mb-4">Booking ID: {bookingId}</p>
//       <p className="mb-4">Amount: ₹{amount}</p>
//       <form onSubmit={handlePayment} className="space-y-4">
//         <CardElement className="p-2 border rounded" />
//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className={`px-4 py-2 w-full rounded text-white ${loading ? "bg-gray-500" : "bg-blue-500"}`}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//       {success && <p className="text-green-500 mt-4">Payment Successful! Redirecting...</p>}
//     </div>
//   );
// };

// export default PaymentPage;


// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import api from "../Services/api";

// const PaymentPage = () => {
//   const { bookingId, amount } = useSelector((state) => state.flight);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!bookingId || !amount) {
//       alert("Booking details are missing. Redirecting to booking page...");
//       navigate("/flights");
//     }
//   }, [bookingId, amount, navigate]);

//   const handlePayment = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       setErrorMessage("Stripe is not loaded. Please try again.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { data } = await api.post("/payments/create", { bookingId, amount });
//       const { clientSecret } = data;

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         setErrorMessage(error.message);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         await api.post("/payments/confirm", { paymentIntentId: paymentIntent.id });
//         navigate("/thank-you"); // Redirect on success
//       } else {
//         setErrorMessage(`Unexpected status: ${paymentIntent.status}`);
//       }
//     } catch (error) {
//       console.error("Payment failed:", error);
//       setErrorMessage("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <p className="mb-4">Booking ID: {bookingId}</p>
//       <p className="mb-4">Amount: ₹{amount}</p>
//       <form onSubmit={handlePayment} className="space-y-4">
//         <CardElement className="p-2 border rounded" />
//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className={`px-4 py-2 w-full rounded text-white ${loading ? "bg-gray-500" : "bg-blue-500"}`}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;




// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import api from "../Services/api";

// const PaymentPage = () => {
//   const { bookingId, amount } = useSelector((state) => state.flight);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [errorMessage, setErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!bookingId || !amount) {
//       alert("Booking details are missing. Redirecting to booking page...");
//       navigate("/flights");
//     }
//   }, [bookingId, amount, navigate]);

//   // const handlePayment = async (event) => {
//   //   event.preventDefault();

//   //   if (!stripe || !elements) {
//   //     setErrorMessage("Stripe is not loaded. Please try again.");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     // Step 1: Create PaymentIntent
//   //     const { data } = await api.post("/payments/create", { bookingId, amount });
//   //     const { clientSecret } = data;

//   //     // Step 2: Confirm Payment with Stripe
//   //     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//   //       payment_method: {
//   //         card: elements.getElement(CardElement),
//   //       },
//   //     });

//   //     if (error) {
//   //       setErrorMessage(error.message);
//   //       return;
//   //     }

//   //     if (paymentIntent.status === "succeeded") {
//   //       // Step 3: Confirm payment in the backend
//   //       await api.post("/payments/confirm", { paymentIntentId: paymentIntent.id });

//   //       // Redirect to Thank You Page
//   //       navigate("/thank-you");
//   //     } else {
//   //       setErrorMessage(`Unexpected status: ${paymentIntent.status}`);
//   //     }
//   //   } catch (error) {
//   //     console.error("Payment failed:", error);
//   //     setErrorMessage("Payment failed. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handlePayment = async (event) => {
//     event.preventDefault();
  
//     if (!stripe || !elements) {
//       setErrorMessage("Stripe is not loaded. Please try again.");
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       // Step 1: Create PaymentIntent
//       const { data } = await api.post("/payments/create", { bookingId, amount });
//       const { clientSecret } = data;
  
//       // Step 2: Confirm Payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });
  
//       if (error) {
//         setErrorMessage(error.message);
//         return;
//       }
  
//       if (paymentIntent.status === "succeeded") {
//         // Step 3: Confirm payment in the backend and retrieve enriched details
//         const { data } = await api.post("/payments/confirm", { paymentIntentId: paymentIntent.id });
  
//         // Redirect to Thank You Page with booking history
//         navigate("/thank-you", { state: { bookingDetails: data.bookingDetails } });
//       } else {
//         setErrorMessage(`Unexpected status: ${paymentIntent.status}`);
//       }
//     } catch (error) {
//       console.error("Payment failed:", error);
//       setErrorMessage("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <p className="mb-4">Booking ID: {bookingId}</p>
//       <p className="mb-4">Amount: ₹{amount}</p>
//       <form onSubmit={handlePayment} className="space-y-4">
//         <CardElement className="p-2 border rounded" />
//         <button
//           type="submit"
//           disabled={!stripe || loading}
//           className={`px-4 py-2 w-full rounded text-white ${loading ? "bg-gray-500" : "bg-blue-500"}`}
//         >
//           {loading ? "Processing..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const PaymentPage = () => {
  const { bookingId, amount, passengerDetails } = useSelector((state) => state.flight);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!bookingId || !amount) {
      alert("Booking details are missing. Redirecting to booking page...");
      navigate("/book");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Stripe Checkout Session
      const response = await api.post("/payments/create", {
        bookingId,
        amount,
        passengerDetails,
      });

      // Step 2: Redirect to Stripe Checkout
      if (response.data.url) {
        window.location.href = response.data.url; // Stripe Checkout URL
      } else {
        throw new Error("Failed to get the Checkout URL");
      }
    } catch (error) {
      console.error("Error initiating payment:", error.message);
      alert("We noticed you've already attempted to make a payment. Kindly wait while we complete the process.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Complete Payment</h1>
    <p className="mb-4 text-center text-gray-600">
      <strong className="text-gray-800">Booking ID:</strong> {bookingId}
    </p>
    <p className="mb-6 text-center text-gray-600">
      <strong className="text-gray-800">Amount:</strong> ₹{amount}
    </p>
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`px-4 py-2 w-full rounded text-white text-lg font-semibold ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {loading ? "Processing..." : "Pay Now"}
    </button>
  </div>
</div>

  );
};

export default PaymentPage;
