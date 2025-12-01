// import jwt from "jsonwebtoken";
// const authMiddleware = async(req,res,next)=> {
//     const {token} = req.headers;
//     if(!token){
//         return res.json({success:false,message:"Not Authorized Login Again"})
//     }
//     try{
// const token_decode = jwt.verify(token,process.env.JWT_SECRET);
// req.body.userId = token_decode.id;
// next();

//     }
//     catch(error){
//       console.log(error);
//       res.json({success:false,message:"Error"})
//     }

// }
// export default authMiddleware;


import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.json({ success: false, message: "Not Authorized!" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

export default auth;


