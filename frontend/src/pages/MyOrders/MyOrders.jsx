// import React, { useState, useEffect, useContext } from 'react';
// import './MyOrders.css';
// import { StoreContext } from '../../context/StoreContext';
// import { assets } from '../../assets/assets';
// import axios from 'axios';

// const MyOrders = () => {
//   const { url, token } = useContext(StoreContext);
//   const [data, setData] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.post(
//         url + "/api/order/userorders",
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setData(response.data.data);
//       console.log(response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchOrders();
//     }
//   }, [token]);

//   return (
//     <div className="my-orders">
//       <h2>My Orders</h2>
//       <div className="container">
//         {data.map((order, index) => (
//           <div key={order._id || index} className="my-orders-order">
//             <img src={assets.parcel_icon} alt="" />
            
//             <p>
//               {order.items.map((item, i) => (
//                 <span key={i}>
//                   {item.name} x {item.quantity}
//                   {i < order.items.length - 1 ? ", " : ""}
//                 </span>
//               ))}
//             </p>

//             <p>${order.amount.toFixed(2)}</p>
//             <p>Items: {order.items.length}</p>
//             <p>
//               <span>&#x25cf;</span> <b>{order.status}</b>
//             </p>
//             <button>Track Order</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;



// import React, { useEffect, useState, useContext } from "react";
// import "./MyOrders.css";
// import { StoreContext } from "../../context/StoreContext";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CheckCircle, Truck, Clock, CookingPot } from "lucide-react";

// const statusSteps = [
//   { label: "Confirmed", icon: CheckCircle },
//   { label: "Preparing", icon: CookingPot },
//   { label: "Out for Delivery", icon: Truck },
//   { label: "Delivered", icon: CheckCircle },
// ];

// const MyOrders = () => {
//   const { token, url } = useContext(StoreContext);
//   const [orders, setOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const res = await fetch(`${url}/api/order/user-orders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (data.success) setOrders(data.orders.reverse());
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchOrders();
//   }, [token, url, navigate]);

//   const getStatusIndex = (status) => {
//     const index = statusSteps.findIndex(
//       (step) => step.label.toLowerCase() === status.toLowerCase()
//     );
//     return index >= 0 ? index : 0;
//   };

//   return (
//     <div className="my-orders">
//       <h2 className="orders-title">My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="no-orders">You have no orders yet.</p>
//       ) : (
//         <div className="orders-list">
//           {orders.map((order) => {
//             const currentStatus = getStatusIndex(order.status);
//             return (
//               <motion.div
//                 key={order._id}
//                 className="order-card"
//                 whileHover={{ scale: 1.02 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//               >
//                 <div className="order-header">
//                   <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
//                   <span className={`status ${order.status}`}>
//                     {order.status}
//                   </span>
//                 </div>

//                 <div className="order-items">
//                   {order.items.map((item, i) => (
//                     <div key={i} className="order-item">
//                       <img
//                         src={`${url}/images/${item.image}`}
//                         alt={item.name}
//                       />
//                       <div>
//                         <p className="item-name">{item.name}</p>
//                         <p className="item-qty">Qty: {item.quantity}</p>
//                         <p className="item-price">${item.price}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="order-tracker">
//                   {statusSteps.map((step, index) => {
//                     const Icon = step.icon;
//                     const active = index <= currentStatus;
//                     return (
//                       <div key={index} className="tracker-step">
//                         <div
//                           className={`icon-wrapper ${
//                             active ? "active" : "inactive"
//                           }`}
//                         >
//                           <Icon size={22} />
//                         </div>
//                         <p className={`step-label ${active ? "active" : ""}`}>
//                           {step.label}
//                         </p>
//                         {index < statusSteps.length - 1 && (
//                           <div
//                             className={`tracker-line ${
//                               index < currentStatus ? "filled" : ""
//                             }`}
//                           ></div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="order-footer">
//                   <p>
//                     Total: <strong>${order.amount}</strong>
//                   </p>
//                   <p>Payment: {order.paymentMethod}</p>
//                   <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;



import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await axios.get(url + "/api/order/userorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setOrders(res.data.orders);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    if (token) loadOrders();
  }, [token]);

  return (
    <div className="my-orders page">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found 🛍️</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <p><b>Status:</b> {order.status}</p>
            <p><b>Total:</b> ₹{order.amount}</p>
            <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>

            <div className="order-items">
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;

