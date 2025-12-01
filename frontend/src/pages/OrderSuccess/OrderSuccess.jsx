import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Automatically redirect to home after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 6000); // 6 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-success-container">
      <motion.div
        className="order-success-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="success-icon"
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CheckCircle2 size={90} strokeWidth={2} color="#16a34a" />
        </motion.div>

        <motion.h2
          className="success-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Order Placed Successfully!
        </motion.h2>

        <motion.p
          className="success-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Thank you for your order. Your delicious food is being prepared and will
          be delivered soon 🍕
        </motion.p>

        <motion.div
          className="order-animation"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="delivery-bike">
            <div className="wheel front"></div>
            <div className="wheel back"></div>
            <div className="bike-body"></div>
          </div>
        </motion.div>

        <motion.button
          className="back-home-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
  navigate("/");
  setTimeout(() => {
    window.location.reload();
  }, 150);
}}
        >
          Go to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
