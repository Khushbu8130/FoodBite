// import React, { useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'
// import { useContext } from 'react'
// import axios from 'axios';



// const PlaceOrder = () => {
//     const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext)

//     const [data,setData] = useState({
//         firstName:"",
//         lastName:"",
//         email:"",
//         street:"",
//         city:"",
//         state:"",
//         zipcode:"",
//         country:"",
//         phone:""
//     })
  
//     const onChangeHandler = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setData (data => ({...data,[name]:value}))
//     }

//     const placeOrder = async (event) => {
//         event.preventDefault();
//          console.log("Form submitted"); 
//         let orderItems = [];
//         food_list.map((item)=>{
//             if(cartItems[item._id]>0){
//                 let itemInfo = item;
//                 itemInfo["quantity"] = cartItems[item._id];
//                 orderItems.push(itemInfo);
//             }
            
//         })
   
//         let orderData = {
      
//             address:data,
//             items:orderItems,
//             amount:getTotalCartAmount()+2,
//         }
//         let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
//         if(response.data.success){
//             const{session_url} = response.data;
//             window.location.replace(session_url);
//         }
//         else{
//             alert("Error");
//         }
//     }  

//     return (
//         <div>
//             <form className='place-order' onSubmit={placeOrder}>
//                 <div className="place-order-left">
//                     <p className="title">Delivery Information</p>
//                     <div className="multi-fields">
//                         <input required  name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
//                         <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
//                     </div>
//                     <input  required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' />
//                     <input  required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
//                     <div className="multi-fields">
//                         <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
//                         <input  required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
//                     </div>
//                     <div className="multi-fields">
//                         <input  required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
//                         <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
//                     </div>
//                     <input required  name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />

//                 </div>
//                 <div className="place-order-right">
//                     <div className="cart-total">
//                         <h2>Cart Totals</h2>
//                         <div>
//                             <div className="cart-total-details">
//                                 <p>Subtotal</p>
//                                 <p>${getTotalCartAmount()}</p>

//                             </div>
//                             <hr />
//                             <div className="cart-total-details">
//                                 <p>Delivery Fee</p>
//                                 <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//                             </div>
//                             <hr />
//                             <div className="cart-total-details">
//                                 <p>Total</p>
//                                 <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
//                             </div>

//                         </div>
//                         <button className="cart-total-button" type='submit'>PROCEED TO CHECKOUT</button>
//                     </div>
//                 </div>

//             </form>
//         </div>
//     )
// }

// export default PlaceOrder





//new
import React, { useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    // Collect order items
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    // Prepare order data
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      token,
      url
    };

    // Navigate to payment page instead of calling API directly
    navigate('/payment', { state: orderData });
  };


  const handlePay = async () => {
  if (!deliveryAddress) return alert("Enter address!");

  const orderData = {
    items: cartItems,
    amount: totalAmount,
    address: { street, city, state, pincode },
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));
  navigate("/payment", { state: orderData });
};


  return (
    <div>
      <form className='place-order' onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' />
          <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
          </div>
          <div className="multi-fields">
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
            <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
              </div>
            </div>
            <button className="cart-total-button" type='submit'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;






// import React, { useState, useContext } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'
// import { useNavigate } from 'react-router-dom'

// const PlaceOrder = () => {
//   const { getTotalCartAmount, food_list, cartItems } = useContext(StoreContext)
//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   })

//   const navigate = useNavigate();

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData((data) => ({ ...data, [name]: value }));
//   }

//   const goToPayment = (event) => {
//     event.preventDefault();

//     // Optionally: validate data here
//     const orderItems = food_list.filter(item => cartItems[item._id] > 0)
//       .map(item => ({
//         ...item,
//         quantity: cartItems[item._id],
//       }));

//     const orderData = {
//       address: data,
//       items: orderItems,
//       amount: getTotalCartAmount() + 2,
//     };

//     // Pass orderData to payment page
//     navigate('/payment', { state: orderData });
//   }

//   return (
//     <div>
//       <form className='place-order' onSubmit={goToPayment}>
//         <div className="place-order-left">
//           <p className="title">Delivery Information</p>
//           <div className="multi-fields">
//             <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
//             <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
//           </div>
//           <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' />
//           <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
//           <div className="multi-fields">
//             <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
//             <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
//           </div>
//           <div className="multi-fields">
//             <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
//             <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
//           </div>
//           <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
//         </div>

//         <div className="place-order-right">
//           <div className="cart-total">
//             <h2>Cart Totals</h2>
//             <div>
//               <div className="cart-total-details">
//                 <p>Subtotal</p>
//                 <p>${getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Delivery Fee</p>
//                 <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Total</p>
//                 <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
//               </div>
//             </div>

//             <button className="cart-total-button" type='submit'>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default PlaceOrder



// import React, { useEffect, useState } from 'react'
// import './PlaceOrder.css'
// import { StoreContext } from '../../context/StoreContext'
// import { useContext } from 'react'
// import axios from 'axios';



// const PlaceOrder = () => {
//     const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext)

//     const [data,setData] = useState({
//         firstName:"",
//         lastName:"",
//         email:"",
//         street:"",
//         city:"",
//         state:"",
//         zipcode:"",
//         country:"",
//         phone:""
//     })

//     const [orderSuccess, setOrderSuccess] = useState(false);
//     const [orderDetails, setOrderDetails] = useState(null);

//     const onChangeHandler = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setData (data => ({...data,[name]:value}))
//     }

//     const loadRazorpayScript = () => {
//         return new Promise((resolve) => {
//             const script = document.createElement("script");
//             script.src = "https://checkout.razorpay.com/v1/checkout.js";
//             script.onload = () => resolve(true);
//             script.onerror = () => resolve(false);
//             document.body.appendChild(script);
//         });
//     };

//     const razorpayPayment = async (amount) => {
//         const res = await loadRazorpayScript();
//         if (!res) {
//             alert("Razorpay SDK failed to load. Are you online?");
//             return;
//         }

//         // Ideally, fetch these from your backend for security
//         const options = {
//             key: "rzp_test_yw1hGt1y3vMrcj", // Replace with your Razorpay key
//             amount: amount * 100, // in paise
//             currency: "INR",
//             name: "Food Delivery",
//             description: "Order Payment",
//             handler: async function (response) {
//                 // On successful payment, place the order
//                 await placeOrderAfterPayment(response);
//             },
//             prefill: {
//                 name: data.firstName + " " + data.lastName,
//                 email: data.email,
//                 contact: data.phone,
//             },
//             theme: {
//                 color: "#3399cc",
//             },
//         };
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//     };

//     const placeOrderAfterPayment = async (paymentResponse) => {
//         let orderItems = [];
//         food_list.map((item) => {
//             if (cartItems[item._id] > 0) {
//                 let itemInfo = { ...item };
//                 itemInfo["quantity"] = cartItems[item._id];
//                 orderItems.push(itemInfo);
//             }
//         });
//         let orderData = {
//             address: data,
//             items: orderItems,
//             amount: getTotalCartAmount() + 2,
//             paymentId: paymentResponse.razorpay_payment_id,
//         };
//         let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
//         if (response.data.success) {
//             setOrderSuccess(true);
//             setOrderDetails(orderData);
//         } else {
//             alert("Order failed");
//         }
//     };

//     // Add this validation function
// const isDeliveryInfoFilled = () => {
//     return (
//         data.firstName.trim() !== "" &&
//         data.lastName.trim() !== "" &&
//         data.email.trim() !== "" &&
//         data.street.trim() !== "" &&
//         data.city.trim() !== "" &&
//         data.state.trim() !== "" &&
//         data.zipcode.trim() !== "" &&
//         data.country.trim() !== "" &&
//         data.phone.trim() !== ""
//     );
// };

//     const onCheckoutClick = async (event) => {
//         event.preventDefault();
//         if (getTotalCartAmount() === 0) {
//             alert("Cart is empty");
//             return;
//         }
//         if (!isDeliveryInfoFilled()) {
//             alert("Please fill delivery information");
//             return;
//         }
//         await razorpayPayment(getTotalCartAmount() + 2);
//     };

//     if (orderSuccess && orderDetails) {
//         return (
//             <div className="order-success-container">
//                 <h2>Order Placed Successfully!</h2>
//                 <p>Thank you for your order, {orderDetails.address.firstName}!</p>
//                 <div className="order-summary">
//                     <h3>Order Summary</h3>
//                     <ul>
//                         {orderDetails.items.map((item, idx) => (
//                             <li key={idx}>
//                                 <strong>{item.name}</strong> x {item.quantity} - ₹{item.price * item.quantity}
//                             </li>
//                         ))}
//                     </ul>
//                     <p><strong>Delivery Address:</strong> {orderDetails.address.street}, {orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.zipcode}, {orderDetails.address.country}</p>
//                     <p><strong>Total Paid:</strong> ₹{orderDetails.amount}</p>
//                 </div>
//                 <div className="success-icon" style={{fontSize: "3rem", color: "green"}}>✔️</div>
//             </div>
//         );
//     }


//      const placeOrder = async (event) => {
//         event.preventDefault();
//         let orderItems = [];
// food_list.map((item)=>{
//             if(cartItems[item._id]>0){
//                 let itemInfo = item;
//                 itemInfo["quantity"] = cartItems[item._id];
//                 orderItems.push(itemInfo);
            
//             }
            
// })
//   let orderData = {
//     address:data,
//   items:orderItems,
//   amount:getTotalCartAmount()+2,  
//   }
//    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
//    if(response.data.success){
//     const {session_url} = response.data;
//     window.location.replace(session_url);
//    }
//    else{
//     alert('Error');
//    }
//      }
//      useEffect(() => {
//         if(!token){
//          Navigate('/cart')
//         }
//      },[token])
//     return (
//         <div>
//             <form className='place-order'>
//                 <div className="place-order-left">
//                     <p className="title">Delivery Information</p>
//                     <div className="multi-fields">
//                         <input required  name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
//                         <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
//                     </div>
//                     <input  required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' />
//                     <input  required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street' />
//                     <div className="multi-fields">
//                         <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' />
//                         <input  required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' />
//                     </div>
//                     <div className="multi-fields">
//                         <input  required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' />
//                         <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' />
//                     </div>
//                     <input required  name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />

//                 </div>
//                 <div className="place-order-right">
//                     <div className="cart-total">
//                         <h2>Cart Totals</h2>
//                         <div>
//                             <div className="cart-total-details">
//                                 <p>Subtotal</p>
//                                 <p>${getTotalCartAmount()}</p>
//                             </div>
//                             <hr />
//                             <div className="cart-total-details">
//                                 <p>Delivery Fee</p>
//                                 <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//                             </div>
//                             <hr />
//                             <div className="cart-total-details">
//                                 <p>Total</p>
//                                 <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
//                             </div>
//                         </div>
//                         <button type='button' onClick={onCheckoutClick}>PROCEED TO CHECKOUT</button>
//                     </div>
//                 </div>

//             </form>
//         </div>
//     )
// }

// export default PlaceOrder

/*

import React, { useEffect, useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Open Razorpay Checkout
  const razorpayPayment = async (amount) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_RW0eokZmXmI8iu", // 🔑 replace with your Razorpay key
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      name: "Food Delivery",
      description: "Order Payment",
      handler: async (response) => {
        await placeOrderAfterPayment(response);
      },
      prefill: {
        name: data.firstName + " " + data.lastName,
        email: data.email,
        contact: data.phone,
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Place order after successful payment
  const placeOrderAfterPayment = async (paymentResponse) => {
    try {
      const orderItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({ ...item, quantity: cartItems[item._id] }));

      const orderData = {
        userId: localStorage.getItem("userId"), // ✅ 
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
        paymentId: paymentResponse.razorpay_payment_id,
      };

      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrderSuccess(true);
        setOrderDetails(orderData);
        // 👉 TODO: clearCart() if your context provides it
      } else {
        alert("Order failed. Please try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong");
    }
  };

  // Validate delivery info
  const isDeliveryInfoFilled = () =>
    Object.values(data).every((field) => field.trim() !== "");

  // Checkout click
  const onCheckoutClick = async (event) => {
    event.preventDefault();
    if (getTotalCartAmount() === 0) {
      alert("Cart is empty");
      return;
    }
    if (!isDeliveryInfoFilled()) {
      alert("Please fill delivery information");
      return;
    }
    await razorpayPayment(getTotalCartAmount() + 2);
  };

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }
  }, [token, navigate]);

  // ✅ Success page
  if (orderSuccess && orderDetails) {
    return (
      <div className="order-success-container">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order, {orderDetails.address.firstName}!</p>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {orderDetails.items.map((item, idx) => (
              <li key={idx}>
                <strong>{item.name}</strong> x {item.quantity} - ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>
            <strong>Delivery Address:</strong>{" "}
            {orderDetails.address.street}, {orderDetails.address.city},{" "}
            {orderDetails.address.state}, {orderDetails.address.zipcode},{" "}
            {orderDetails.address.country}
          </p>
          <p><strong>Total Paid:</strong> ₹{orderDetails.amount}</p>
        </div>
        <div className="success-icon" style={{ fontSize: "3rem", color: "green" }}>
          ✔️
        </div>
      </div>
    );
  }

  // ✅ Checkout form
  return (
    <div>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
            <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
          </div>
          <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
          <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
          <div className="multi-fields">
            <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
            <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
            <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
          </div>
          <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
              </div>
            </div>
            <button type="button" onClick={onCheckoutClick}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;  */




// import React, { useEffect, useState, useContext } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
//   const navigate = useNavigate();


//             // ---Added

//   const [data, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: ""
//   });

//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);

//   // Handle input changes
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData(prev => ({ ...prev, [name]: value }));
//   };

//   // Load Razorpay SDK
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Place order after payment
//   const placeOrderAfterPayment = async (paymentResponse) => {
//     try {
//       const orderItems = food_list
//         .filter(item => cartItems[item._id] > 0)
//         .map(item => ({ ...item, quantity: cartItems[item._id] }));

//       const orderData = {
//         userId: userId,
//         address: data,
//         items: orderItems,
//         amount: getTotalCartAmount() + 2, // 2 for delivery fee
//         paymentId: paymentResponse.razorpay_payment_id
//       };

//       const response = await axios.post(
//         `${url}/api/order/place`,
//         orderData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log("Order Response:", JSON.stringify(response.data));

//       // Check backend response
//       if ((response.status === 200 || response.status === 201) && response.data?.order) {
//         setOrderSuccess(true);
//         setOrderDetails(response.data.order);
//         // Optional: clear cart if your context provides it
//         // clearCart();
//       } else {
//         alert("Order failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error placing order:", err.response || err);
//       alert("Something went wrong while placing order");
//     }
//   };

//   // Trigger Razorpay
//   const razorpayPayment = async (amount) => {
//     const res = await loadRazorpayScript();
//     if (!res) {
//       alert("Razorpay SDK failed to load. Check your internet connection.");
//       return;
//     }

//     const options = {
//       key: "rzp_test_RW0eokZmXmI8iu", // replace with your Razorpay key
//       amount: amount * 100, // in paise
//       currency: "INR",
//       name: "Food Delivery",
//       description: "Order Payment",
//       handler: (response) => {
//         // Razorpay calls this function after successful payment
//         placeOrderAfterPayment(response);
//       },
//       prefill: {
//         name: `${data.firstName} ${data.lastName}`,
//         email: data.email,
//         contact: data.phone
//       },
//       theme: { color: "#3399cc" }
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   // Validate delivery info
//   const isDeliveryInfoFilled = () => Object.values(data).every(field => field.trim() !== "");

//   // Checkout button click
//   const onCheckoutClick = async (e) => {
//     e.preventDefault();
//     if (getTotalCartAmount() === 0) {
//       alert("Cart is empty");
//       return;
//     }
//     if (!isDeliveryInfoFilled()) {
//       alert("Please fill all delivery information");
//       return;
//     }
//     await razorpayPayment(getTotalCartAmount() + 2); // including delivery fee
//   };

//   // Redirect if user not logged in
//   useEffect(() => {
//   if (!token || !userId) {
//     alert("Please login first!");
//     navigate("/login");
//   }
// }, [token, userId, navigate]);

//   // ✅ Success page
//   if (orderSuccess && orderDetails) {
//     return (
//       <div className="order-success-container">
//         <h2>Order Placed Successfully!</h2>
//         <p>Thank you for your order, {orderDetails.address.firstName}!</p>
//         <div className="order-summary">
//           <h3>Order Summary</h3>
//           <ul>
//             {orderDetails.items.map((item, idx) => (
//               <li key={idx}>
//                 <strong>{item.name}</strong> x {item.quantity} - ₹{item.price * item.quantity}
//               </li>
//             ))}
//           </ul>
//           <p>
//             <strong>Delivery Address:</strong> {orderDetails.address.street}, {orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.zipcode}, {orderDetails.address.country}
//           </p>
//           <p><strong>Total Paid:</strong> ₹{orderDetails.amount}</p>
//         </div>
//         <div className="success-icon" style={{ fontSize: "3rem", color: "green" }}>✔️</div>
//       </div>
//     );
//   }

//   // ✅ Checkout form
//   return (
//     <div>
//       <form className="place-order">
//         <div className="place-order-left">
//           <p className="title">Delivery Information</p>
//           <div className="multi-fields">
//             <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" />
//             <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" />
//           </div>
//           <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
//           <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />
//           <div className="multi-fields">
//             <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
//             <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State" />
//           </div>
//           <div className="multi-fields">
//             <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
//             <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
//           </div>
//           <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" />
//         </div>

//         <div className="place-order-right">
//           <div className="cart-total">
//             <h2>Cart Totals</h2>
//             <div>
//               <div className="cart-total-details">
//                 <p>Subtotal</p>
//                 <p>₹{getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Delivery Fee</p>
//                 <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Total</p>
//                 <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
//               </div>
//             </div>
//             <button type="button" onClick={onCheckoutClick}>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PlaceOrder;





