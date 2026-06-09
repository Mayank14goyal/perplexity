import jwt from "jsonwebtoken";

export function authUser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unautharized",
            success: false,
            err: "no token provided"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    }catch{
        return res.ststus(401).json({
            message : "unautharized",
            success:false,
            err:"invalid token"
        })
    }
}