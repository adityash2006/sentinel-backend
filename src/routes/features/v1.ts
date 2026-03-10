import { Router, type NextFunction } from "express";
import { autho } from "../../middlewares/auth.js";
import  jwt from "jsonwebtoken";

export const featureRouter=Router();

featureRouter.get("/dashboard",autho,(req,res)=>{
    res.status(201).json({
        message:"you are logged in"
    })
    
})

featureRouter.get("/token",(req,res,next:NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(400).json({
            message:"no token"
        })
    }
    try{

    
    const decoded = jwt.verify(token!, process.env.JWTSECRET!);
    if(!decoded){
        res.status(402).json({
            message:"dont to this token thingy "
        })
    }
   //@ts-ignore
    res.status(201).json({
        message:"token is verified"
    });
    }catch(err){
        console.log(err);
        res.status(400).json({
            message:"invalid or no token"
        })
    }
})