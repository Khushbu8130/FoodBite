import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormPage.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/payment';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get orderData from PaymentPage
  const orderData = location.state;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    amount: orderData?.amount || '' // 🟢 Pre-fill total amount
  });

  const [loading, setLoading] = useState(false);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.firstName || !form.email || !form.amount) {
      alert('Please fill all required fields');
      setLoading(false);
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      setLoading(false);
      return;
    }

    const createOrderResp = await fetch(`${API_BASE}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: form.amount })
    }).then(r => r.json());

    if (!createOrderResp || !createOrderResp.order) {
      alert('Could not create order. Please try again.');
      setLoading(false);
      return;
    }

    const { order } = createOrderResp;
    const options = {
      key: createOrderResp.key,
      amount: order.amount,
      currency: order.currency,
      name: `${form.firstName} ${form.lastName}`,
      description: 'Online Purchase',
      order_id: order.id,
      handler: async function (response) {
        try {
          const verifyResp = await fetch(`${API_BASE}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              ...form
            })
          }).then(r => r.json());

          if (verifyResp && verifyResp.success) {
            navigate('/success', { state: { payment: verifyResp } });
          } else {
            alert('Payment verification failed.');
          }
        } catch (err) {
          console.error(err);
          alert('Error while verifying payment.');
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        contact: form.phone
      },
      theme: {
        color: '#ff6600'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      alert('Payment failed: ' + (response.error && response.error.description));
      setLoading(false);
    });

    rzp.open();
  };

  return (
    <div className="payment-form-page">
      <div className="payment-form-card">
        <h2 className="form-title">Complete Your Payment</h2>
        <p className="form-subtitle">Enter your details below to proceed securely</p>

        <form onSubmit={handlePay} className="payment-form">
          <div className="form-row">
            <input
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="First Name *"
              required
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="Last Name"
            />
          </div>

          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email *"
            type="email"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone Number"
          />

          {/* 🟢 Amount auto-filled and read-only */}
          <input
            name="amount"
            value={form.amount}
            onChange={onChange}
            placeholder="Amount (INR) *"
            readOnly
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Processing Payment...' : 'Pay Securely'}
          </button>
        </form>
      </div>
    </div>
  );
}
