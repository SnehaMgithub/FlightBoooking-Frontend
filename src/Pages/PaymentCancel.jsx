import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>It seems you canceled the payment. You can try again.</p>
      <button onClick={() => navigate("/payment")}>Retry Payment</button>
    </div>
  );
};

export default PaymentCancel;
