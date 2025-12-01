import userModel from "../models/userModel.js";
 //add items to user cart
 const addToCart = async(req,res) => {
      try{
//    let userData = await userModel.findOne({_id:req.body.userId});
let userData = await userModel.findById(req.userId);
//    let cartData = await userData.cartData;
let cartData = userData.cartData || {}; 
   if(!cartData[req.body.itemId]){
      cartData[req.body.itemId] = 1;
   }
   else{
    cartData[req.body.itemId] += 1;
   }
//    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
await userModel.findByIdAndUpdate(req.userId, { cartData });

   res.json({success:true,message:"Added to cart"});
      }
      catch(error){
 console.log(error);
     res.json({success:false,message: "Error"})
      }
 }

 const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.userId);
        let cartData = userData.cartData || {};

        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;

            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }

            await userModel.findByIdAndUpdate(req.userId, { cartData });
            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.json({ success: false, message: "Item not in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
//   const removeFromCart = async(req,res) => {
//     try{
//         let userData = await userModel.findById(req.userId)
//         let cartData = await userData.cartData;
//         if(cartData[req.body.itemId]>0){
//             cartData[req.body.itemId] -= 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Remove From Cart"})
//     }catch (error){
//  console.log(error);
//  res.json({success:false,message:"Error"})
//     }
    
//  }
//   const getCart = async(req,res) => {
//     try{
// let userData = await userModel.findById(req.body.userId);
//     let cartData = await userData.cartData;
//     res.json({success:true,cartData})
//     }
    
//  } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"})
//  }

const getCart = async (req, res) => {
    try {
        console.log("📥 getCart endpoint hit");
        console.log("🔐 req.userId:", req.userId);

        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized - Missing userId" });
        }

        const userData = await userModel.findById(req.userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error("❌ Error in getCart:", error);
        res.status(500).json({ success: false, message: "Error" });
    }
};

 export {addToCart,removeFromCart,getCart}