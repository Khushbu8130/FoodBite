import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  const [method, setMethod] = useState("");

  const handlePayment = () => {
    if (!method) {
      alert("Please select a payment method!");
      return;
    }

    // ✅ Cash on Delivery flow → directly go to OrderSuccess
    if (method === "cod") {
      navigate("/order-success");
      return;
    }

    // ✅ Online Payment flow → go to FormPage with order data
    if (method === "online") {
      navigate("/form", { state: orderData });
      return;
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2 className="payment-title">Choose Your Payment Method</h2>

        <div className="payment-options">
          <div
            className={`payment-option ${method === "cod" ? "selected" : ""}`}
            onClick={() => setMethod("cod")}
          >
            <div className="icon-circle cod">💵</div>
            <div>
              <h3>Cash on Delivery</h3>
              <p>Pay with cash when your food arrives hot & fresh.</p>
            </div>
          </div>

          <div
            className={`payment-option ${method === "online" ? "selected" : ""}`}
            onClick={() => setMethod("online")}
          >
            <div className="icon-circle online">💳</div>
            <div>
              <h3>Online Payment</h3>
              <p>Pay securely using UPI, cards, or wallet.</p>
            </div>
          </div>
        </div>

        <button className="confirm-btn" onClick={handlePayment}>
          Confirm & Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
