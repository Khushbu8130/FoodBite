import express from "express"
import authMiddleware from "../middleware/auth.js"
import { placeOrder, useOrders, verifyOrder,listOrders, updateStatus } from "../controllers/orderControllers.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,useOrders);
orderRouter.get('/list',listOrders);
orderRouter.post("/status",updateStatus);

export default orderRouter;

// import express from "express";
// import auth from "../middleware/auth.js";
// import { placeOrder, userOrders } from "../controllers/orderControllers.js";

// const orderRouter = express.Router();

// orderRouter.post("/place", auth, placeOrder);
// orderRouter.get("/userorders", auth, userOrders);

// export default orderRouter;


