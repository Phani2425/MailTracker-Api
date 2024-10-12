import mongoose from "mongoose";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


export const dbConnect = async() => {
    try{

        await mongoose.connect(Bun.env.DATABASE_URL!);
        console.log('database connected successfully');

    }catch(err){
         console.log("Failed to connect to MongoDB:", err);
         process.exit(1);
    }
}