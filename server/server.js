import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import { Server } from 'socket.io';


// create express app and HTTP server
const app = express();
const server = http.createServer(app);

//  initialize socket.io server
export const io = new Server(server, { cors: { origin: "*" } });


// store online users 
export const userSocketMap = {};  // {userId: socketId}

// socket.io connection handler
io.on("connection", (socket) => {
   const userId = socket.handshake.query.userId;
   console.log("User connected:", userId);

   if (userId) userSocketMap[userId] = socket.id;

   // Emit online users to all connecting clients
   io.emit("getOnlineUsers", Object.keys(userSocketMap));

   // disconnect handler
   socket.on("disconnect", () => {
      console.log("user disconnected", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
   })

});


// middleware setup 
app.use(express.json({ limit: "4mb" }));
// Configure CORS to allow requests from your frontend domain dynamically for Vercel previews
app.use(cors({
   origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow localhost for development
      if (process.env.NODE_ENV !== "production" && origin === "http://localhost:5173") {
         return callback(null, true);
      }

      // Allow any origin ending with .vercel.app in production (for Vercel previews)
      if (process.env.NODE_ENV === "production" && origin.endsWith(".vercel.app")) {
         // You might want to add your specific production domain here as well when ready
         return callback(null, true);
      }

      // Otherwise, reject the origin
      callback(new Error('Not allowed by CORS'));
   }
}));

// routes 
app.use("/api/status", (req, res) => res.send("Server is running"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);


// connect to database
await connectDB();


if (process.env.NODE_ENV !== "production") {
   const PORT = process.env.PORT || 5000;
   server.listen(PORT, () => console.log(`server is running on PORT:` + PORT));
}


// export server for vercel
export default server;