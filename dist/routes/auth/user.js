import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { client } from "../../db/databs.js";
import "dotenv/config";
const userRouter = Router();
userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await client.user.findFirst({
            where: {
                email
            }
        });
        if (existingUser)
            res.status(400).json({
                "message": "user already exists",
            });
        let pass = await bcrypt.hash(password, 5);
        const user = await client.user.create({
            data: {
                name,
                email,
                password: pass
            }
        });
        const id = user.id;
        const token = jwt.sign({ userId: id }, process.env.JWTSECRET);
        res.status(201).json({
            message: "user created successfully",
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ "message": "user signup failed" });
    }
});
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await client.user.findFirst({
            where: {
                email
            }
        });
        if (!existingUser)
            res.status(400).json({
                message: "user does not exists"
            });
        const check = await bcrypt.compare(password, existingUser?.password);
        if (!check) {
            res.status(400).json({
                message: "invalid credentials"
            });
        }
        const id = existingUser?.id;
        const token = jwt.sign({ userId: id }, process.env.JWTSECRET);
        res.status(201).json({
            message: "successfull login",
            token
        });
    }
    catch (error) {
        res.status(400).json({
            message: "got some error while logging in"
        });
    }
});
export { userRouter };
