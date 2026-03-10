import "dotenv/config";
import jwt from "jsonwebtoken"

import type { Request,NextFunction,Response } from "express";

export function autho(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        res.status(400).json({
            message:"no token"
        })
    }
    const decoded = jwt.verify(token!, process.env.JWTSECRET!);
    if(!decoded){
        res.status(400).json({
            message:"dont to this token thingy "
        })
    }
   //@ts-ignore
    req.userId=decoded.userId;
    next();
}



