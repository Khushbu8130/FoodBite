import 'dotenv/config.js'
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRouter.js";
import userRouter from "./routes/userRoute.js";

import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/paymentRoutes.js";




//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'))    
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api/payment",paymentRouter)


app.get("/",(req,res)=>{
res.send("API working")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

