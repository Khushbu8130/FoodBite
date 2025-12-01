// import React, { useEffect } from 'react'
// import './Verify.css';
// import { useSearchParams } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';
// import { use } from 'react';
// const Verify = () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const success = searchParams.get("success");
//      const orderId  = searchParams.get("orderId");
//      const {url} = useContext(StoreContext);
//      const navigate = useNavigate();

//      const verifyPayment = async () = {
//         const response = await axios.post(url+"/api/order/verify",{success,orderId});
//         if(response.data.success){
//             navigate('/');

//         }
//      }
//     useEffect(() => {
//   const verifyPayment = async () => {
//     try {
//       const orderData = JSON.parse(localStorage.getItem("orderData"));

//       if (!orderData) return navigate("/cart");

//       await axios.post(
//         url + "/api/order/place",
//         orderData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       localStorage.removeItem("orderData");

//       navigate("/myorders");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   verifyPayment();
// }, []);

//   return (
//     <div className='verify'>
//         <div className='spinner'></div>
      
//     </div>
//   )
// }

// export default Verify


// useEffect(() => {
//   const verifyPayment = async () => {
//     try {
//       const orderData = JSON.parse(localStorage.getItem("orderData"));

//       if (!orderData) return navigate("/cart");

//       await axios.post(
//         url + "/api/order/place",
//         orderData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       localStorage.removeItem("orderData");

//       navigate("/myorders");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   verifyPayment();
// }, []);


import React, { useEffect, useContext } from 'react';
import './Verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate('/'); // ✅ redirect home on success
      } else {
        alert("Payment verification failed!");
        navigate('/cart'); // redirect back to cart if invalid
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("Something went wrong during verification.");
      navigate('/cart');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []); // run once on mount

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying your payment, please wait...</p>
    </div>
  );
};

export default Verify;



//new



