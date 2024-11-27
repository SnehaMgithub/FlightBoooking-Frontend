import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("token"); // PayPal returns 'token' as the order ID.

        if (orderId) {
          const response = await api.post("/payments/capture", { orderId });
          if (response.data.status === "COMPLETED") {
            alert("Payment successful!");
            navigate("/history"); // Redirect to booking history
          } else {
            alert("Payment not completed. Please contact support.");
          }
        }
      } catch (error) {
        console.error("Payment confirmation error:", error);
      }
    };

    confirmPayment();
  }, [navigate]);

  return <div>Processing your payment...</div>;
};

export default PaymentSuccess;
