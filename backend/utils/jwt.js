const jwt=require('jsonwebtoken');
const signAccessToken = (userId,role) => {
    const payload = {
        sub: userId,
        role
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { "expiresIn":process.env.expiresIn || "15m" });
};
const signRefreshToken=(userId,role)=>{
    const payload = {
        sub:userId,
        role,
        type: 'refresh',
    };
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { "expiresIn":process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" });
}


const verifyAccessToken=(token)=>{
    jwt.verify(token, process.env.JWT_SECRET_KEY);
}

const verifyRefreshToken=(token)=>{
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
}

module.exports={
    signAccessToken,
    signRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}