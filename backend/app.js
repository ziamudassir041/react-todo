import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import path from "path"
dotenv.config();
import "./config/database.js";
import publicuser from "./controller/public/user.js"
import privatetodo from "./controller/private/todo.js"

const app = express();
app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://ziamudassir.com",
        "https://www.ziamudassir.com"
    ]
}

))
app.use(express.json());
const port = process.env.PORT || 5000;
app.get("/health", (req, res) => {
    res.status(200).json({msg:" API is running"});
});
app.use("/public-user",publicuser)
app.use("/private-todo",privatetodo)

const buildPath = path.join(import.meta.dirname, "dist")
app.use(express.static(buildPath))
app.use((req,res)=>{
    res.sendFile(path.join(buildPath,"index.html"))
})
 app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

