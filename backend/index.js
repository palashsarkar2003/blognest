import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js"
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors"

//App
const app = express();

//dotenv config files
dotenv.config({
  path: ".env",
});

//Cors
app.use(
  cors({
    origin:process.env.FRONTEND_URL|| 'https://blognest-omega.vercel.app',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"]
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "https://blognest-omega.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
   


//Middleware
app.use(express.json());
app.use(cookieParser())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);


// PORT 
const port = process.env.PORT;

// DB code
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("MongDB connected!!");
} catch (error) {
  console.log(error);
}

console.log('CORS origin:', process.env.FRONTEND_URL);


//definig routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Cloudianry
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.get("/test-cors", (req, res) => {
  res.json({ msg: "CORS is working!" });
});

app.listen(port||2000, () => {
  console.log(`Server is running at port ${port}`);
});
