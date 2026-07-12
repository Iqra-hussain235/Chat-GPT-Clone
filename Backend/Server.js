import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
// import authRoutes from "./routes/auth.js";
mongoose.set("strictQuery", true);


const app=express();
const PORT= process.env.PORT || 8080;

app.use(cors({
  origin: "https://chat-gpt-clone-2.onrender.com",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// app.use("/api", authRoutes); 
app.use("/api",chatRoutes);

app.listen(PORT,()=>{
  console.log(`server runnning on ${PORT}`);
  connectDB();
});


const connectDB=async()=>{
  try{
//mongodb://127.0.0.1:27017/test
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected!'));
    console.log("MONGODB_URL:", process.env.MONGODB_URL);
  }
  catch(err){
    console.log("server running on Database",err);
  }
}
