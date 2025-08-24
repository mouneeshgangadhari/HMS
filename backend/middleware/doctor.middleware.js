const { verifyAccessToken } = require("../utils/jwt.js");


const requireDoctor = (req, res, next) => {
  if (!req.user || req.user.role !== "doctor") {
    return res.status(403).json({ msg: "Access denied: Doctor only" });
  }
  next();
};

const requireDoctorAuth = (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        let token = null;
        if (header.startsWith("Bearer ")) { // Note the space!
            token = header.split(" ")[1];
            console.log('Token from header:', token);
        } else if (req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }
        if (!token) return res.status(401).json({ msg: "unauthorized" });
        const payload = verifyAccessToken(token);
        console.log('Decoded payload:', payload); // Debug
        
        if (!payload || payload.role !== "doctor") {
            return res.status(403).json({ msg: "Forbidden: Doctor access only" });
        }
        req.user = { id: payload.sub, role: payload.role };
        next();
    } catch (err) {
        return res.status(401).json({ error: err.message || "unauthorized" });
    }
};

module.exports = {
  requireDoctor,
  requireDoctorAuth
};