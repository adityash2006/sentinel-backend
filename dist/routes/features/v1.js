import { Router } from "express";
import { autho } from "../../middlewares/auth.js";
import jwt from "jsonwebtoken";
import { analyzeResume } from "../../utils/ai-analyzer.js";
import { extractText } from "../../utils/extractText.js";
import multer from "multer";
import { client } from "../../db/databs.js";
import { id } from "zod/v4/locales";
export const featureRouter = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});
featureRouter.get("/dashboard", autho, async (req, res) => {
    const user = await client.user.findUnique({
        //@ts-ignore
        where: { id: req.userId }
    });
    res.status(201).json({
        message: "you are logged in",
        name: user?.name
    });
});
featureRouter.get("/token", (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(400).json({
            message: "no token"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        if (!decoded) {
            res.status(402).json({
                message: "dont to this token thingy "
            });
        }
        //@ts-ignore
        res.status(201).json({
            message: "token is verified"
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            message: "invalid or no token"
        });
    }
});
featureRouter.post("/analyze-resume", upload.single("resume"), async (req, res) => {
    try {
        const file = req.file;
        const jobDescription = req.body.jobDescription || "";
        if (!file) {
            res.status(401).json({
                message: "file wasnt provided "
            });
            return;
        }
        const text = await extractText(file);
        const result = await analyzeResume(text, jobDescription);
        console.log(result);
        res.status(201).json({
            message: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            message: "resume parsing failed :( "
        });
    }
});
