import User from "../models/User.js";
import jwt from "jsonwebtoken"; // Import jwt library

// middleware to protect routes 
export const protectRoute = async (req, res, next) => {
   try {
      const token = req.headers.token;

      if (!token) {
         return res.status(401).json({ success: false, message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
         return res.json({ success: false, message: "User not found" });
      }

      req.user = user;
      next();

   } catch (error) {
      console.log(error);

      // Proper error handling based on error type
      if (error.name === "JsonWebTokenError") {
         return res.status(401).json({ success: false, message: "Invalid token" });
      } else if (error.name === "TokenExpiredError") {
         return res.status(401).json({ success: false, message: "Token expired" });
      }

      res.status(500).json({ success: false, message: error.message });
   }
}