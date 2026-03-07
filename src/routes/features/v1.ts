import { Router } from "express";
import { autho } from "../../middlewares/auth.js";

export const featureRouter=Router();

featureRouter.get("/dashboard",autho,(req,res)=>{
    res.status(201).json({
        message:"you are logged in"
    })
    
})