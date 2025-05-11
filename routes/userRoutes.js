import express from "express"
import User from "../models/User.js"

const router = express.Router();

router.get('/test',async(req,res)=>{
    const user = await User.find();
    res.json();
    
})

export default router;