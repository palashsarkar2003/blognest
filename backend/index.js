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
dotenv.config();

//Middleware
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);
app.use(cookieParser())

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

//Cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.options('*', cors());


//definig routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// Cloudianry
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
