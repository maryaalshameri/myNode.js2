import express from "express";
import dotenv from "dotenv";
import http from "http"; 
import { initSocket } from "./socket/socket.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// REST API routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// إنشاء سيرفر HTTP وربط Socket.io
const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
