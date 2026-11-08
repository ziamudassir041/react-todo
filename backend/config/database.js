import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();


async function connectDB() {
    try {
        const db_uri = process.env.MONGO_URI
        await mongoose.connect(db_uri)
        console.log("mongodb connect successfully");
        

        
    } catch (error) {
        console.log(error)
        
    }
    
}
connectDB()