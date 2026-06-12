import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
// import authRoutes from "./routes/auth.js";

mongoose.set("strictQuery", true);


const app=express();
const PORT=8080;

app.use(cors());
app.use(express.json());

// app.use("/api", authRoutes); 
app.use("/api",chatRoutes);

app.listen(PORT,()=>{
  console.log(`server runnning on ${PORT}`);
  connectDB();
});


const connectDB=async()=>{
  try{

    mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected!'));
  }
  catch(err){
    console.log("server running on Database",err);
  }
}
