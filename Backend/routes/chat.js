import express from 'express';
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from '../utils/openai.js';
// import jwt from "jsonwebtoken";
// const JWT_SECRET = "MY_SECRET_KEY";

const router=express.Router();


// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };


//test
router.post("/test",async(req,res)=>{
    try{
        const thread= new Thread({
            threadId:"abc",
            title:"Testing again"
        });
        const response=await thread.save();
        res.send(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to save in DB"});
    }
});


router.get("/thread",async(req,res)=>{
    try{
        const threads = await Thread.find({}).sort({updatedAt:-1});
        //descendinh order
        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to Fetch threads"});
    }
});


router.get("/thread/:threadId",async(req,res)=>{
      const {threadId}=req.params;

    try{
      const thread = await Thread.findOne({threadId});
      if(!thread){
              res.status(404).json({error:"Thread not found"});
      }
      res.json(thread.messages);
    }catch(err){
    console.log(err);
    res.status(500).json({error:"Failed to Fetch threads"});
    }
});

router.post("/chat",async(req,res)=>{
    const {threadId,message}=req.body;
    console.log("REQ BODY:", req.body);
if(!threadId || !message){
  res.status(400).json({error:"missing required field"});

}
try{
    let thread=await Thread.findOne({threadId});
    if(!thread){
        thread=new Thread({
            threadId,
            title:message,
            messages:[{role:"user",content:message}]
        });        
    }else{
        thread.messages.push({role:"user",content:message});
        // await thread.save();
    }

    const assistantReply=await getOpenAIAPIResponse(message);

    thread.messages.push({role:"assistant",content:assistantReply});
    thread.updatedAt=new Date();
    await thread.save();
    res.json({reply:assistantReply});

}catch(err){
   console.log(err);
   res.status(500).json({error:"Failed to Fetch chat"}); 
}

})



router.delete("/thread/:threadId", async(req,res)=>{
    const {threadId}=req.params;

    try{
     const deletedThread=  await Thread.findOneAndDelete({threadId});
      
     if(!deletedThread){
        res.status(404).json({error:"Thread could not be deleted"});
     }

     res.status(200).json({success:"Thread deleted successfully"})

    }catch(err){
        console.log(err);
         res.status(500).json({error:"Failed to Fetch threads"});
    }
})




export default router;