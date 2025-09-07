// 
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//App
const app = express();

//dotenv config
dotenv.config({ path: ".env" });

//Cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://blognest-omega.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "Content-Type", "X-Auth-Token"],
    optionsSuccessStatus: 200, // for legacy browsers
  })
);

//Middleware
app.use(express.json({ limit: "10mb" })); // <-- Important: Increase limit for Base64 image
app.use(cookieParser());

// PORT
const port = process.env.PORT || 2000;

// DB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected!!"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Cloudinary config (already fine)
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

// Test CORS
app.get("/test-cors", (req, res) => {
  res.json({ msg: "CORS is working!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
  console.log("CORS origin:", process.env.FRONTEND_URL);
});
