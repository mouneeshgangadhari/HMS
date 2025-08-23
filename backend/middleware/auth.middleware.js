const {verifyAccessToken}= require("../utils/jwt.js");
const requireAuth=(req,res,next)=>{
    try{
        const header=req.headers.authorization;
        const token=header.startsWith("Bearer") ? header.split(" ")[1] : req.cookies?.accessToken;
        if(!token) return res.sendStatus(401).json({msg:"unauthorized"});
        const payload=verifyAccessToken(token);
        req.user={id:payload.sub,role:payload.role};
        next();
    }catch(err){
       return res.status(401).json({msg:"Unauthorized"});
    }
}


const requireRole=(...roles)=>(req,res,next)=>{
    if(!req.user) return res.status(403).json({msg:"Forbidden"});
    if(!roles.includes(req.user.role)) return res.status(403).json({msg:"Forbidden"});
    next();
}

module.exports={
    requireAuth,
    requireRole
}