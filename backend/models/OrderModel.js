import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Placed" },
    payment: { type: Boolean, default: false }
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;




// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: { type: Array, required: true },
//   amount: { type: Number, required: true },
//   address: { type: Object, required: true },
//   paymentId: { type: String },
//   payment: { type: Boolean, default: false },
// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);


// backend/models/Order.js
