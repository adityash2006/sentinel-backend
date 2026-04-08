import express from "express";
import cors from "cors";
import { userRouter } from "./routes/auth/user.js";
import { featureRouter } from "./routes/features/v1.js";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({
        "server": "is working bro"
    });
});
app.use("/v1", featureRouter);
app.use("/user", userRouter);
app.listen(4000, () => {
    console.log("server listenenig at port 4k ");
});
