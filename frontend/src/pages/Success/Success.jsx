import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Success.css';

export default function Success() {
  const { state } = useLocation();

 

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">
          <div className="checkmark">
            <svg viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
            </svg>
          </div>
        </div>

        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-text">Thank you for your purchase. Your order has been confirmed.</p>

        <div className="success-details">
          <pre>
            {/* {state ? JSON.stringify(state, null, 2) : 'No transaction details available.'} */}
          </pre>
        </div> 
      <Link 
  to="/" 
  className="success-btn"
  onClick={() => setTimeout(() => window.location.reload(), 150)}
>
  Continue Shopping
</Link>

         
      </div>
    </div>
  );
}
