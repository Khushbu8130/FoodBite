// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// //placing user order for frontend
// const placeOrder = async (req,res) => {
//     const frontend_url = "http://localhost:5173"
//     try{
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address
//         })
//         await newOrder.save(),
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

//         const line_items = req.body.items.map((item)=>({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100*80
//             },
//             quantity:item.quantity
//         }))
//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100*80
//             },
//             quantity:1
//         })
//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode: 'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`

//         })
//         res.json({success:true,session_url:session.url})
//     }catch(error){
//      console.log({error})
//      res.json({success:false,message:"Error"})
//     }

// }
// const verifyOrder = async (req,res) => {
//     const {orderId,success} = req.body;
//     try{
//         if(success == "true"){
//             await orderModel.findByIdAndUpdate(orderId,{payment:true});
//             res.json({success:false,message:"Not paid"})
//         }
//     }
//     catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// //user order for frontend
// const useOrders = async (req,res) => {
//   try{
// const orders = await orderModel.find({userId:req.body.userId});
// res.json({success:true,orders});
//   }
//   catch(error){
//     console.log(error);
//     res.json({success:false,message:"Error"})
//   }
// }

// //listing ordeers for admin panel
// const listOrders = async(req,res) => {
//     try {
//         const orders = await orderModel.find({});
//         res.json({success:true,data:orders})
//     }
//     catch(error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})

//     }
// }
// //api for updating order status
// const updateStatus = async(req,res) => {
//     try{
//         await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
//         res.json({success:true,message:"Status Updated"})

//     }catch(error){
//        console.log(error);
//        res.json({success:false,message:"Error"})
//     }

// }
// export {placeOrder,verifyOrder,useOrders,updateStatus}

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

//const Razorpay = require("razorpay");
// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
  //key_id: 'rzp_test_RW0eokZmXmI8iu',
  //key_secret: 'D76RgrSqnZgFZazbpfUEy3W3',
});

// 📌 Place Order API
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentId } = req.body;

    // 1️⃣ Save order in DB first
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentId,
      payment: false, // payment will be verified later
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // 2️⃣ Create order in Razorpay
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `order_rcptid_${newOrder._id}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: newOrder._id,
      razorpayOrderId: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while placing order" });
  }
};





// 📌 Verify Payment API
const verifyOrder = async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Payment verified, update order
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        paymentId: razorpay_payment_id,
      });

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Invalid signature, payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

// 📌 Get user orders
const useOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// 📌 Admin: List all orders
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching all orders" });
  }
};

// 📌 Update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

export { placeOrder, verifyOrder, useOrders, listOrders, updateStatus };



// import orderModel from "../models/orderModel.js";

// export const placeOrder = async (req, res) => {
//     try {
//         const newOrder = new orderModel({
//             userId: req.user.id,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//             payment: true
//         });

//         await newOrder.save();
//         res.json({ success: true, message: "Order placed successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// export const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
//         res.json({ success: true, orders });
//     } catch (err) {
//         res.json({ success: false, message: err.message });
//     }
// };


