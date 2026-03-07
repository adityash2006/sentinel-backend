// import express from "express";
import { client } from "./db/databs.js";
import { userRouter } from "./routes/auth/user.js";
async function createUser() {
    await client.user.create({
        data: {
            name: "adgitya",
            email: "aditygg@gmail.com",
            password: "mai ku btyao"
        }
    });
}
createUser();
// const app=express();
// app.use(express.json());
// app.get("/",(req,res)=>{
//     res.json({
//         "server":"is working bro"
//     })
// });
// app.use("/user",userRouter);
// app.listen(4000,()=>{
//     console.log("server listenenig at port 4k ");
// })
