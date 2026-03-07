import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userRouter = Router();
let pass = "";
userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);
    pass = await bcrypt.hash(password, 5);
    res.json({
        succe: "succeessfull signup"
    });
});
userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const check = await bcrypt.compare(password, pass);
    if (check) {
        res.json({
            loggedIn: "sucess"
        });
    }
    else {
        res.json({
            error: "are u trying to hack us"
        });
    }
});
export { userRouter };
