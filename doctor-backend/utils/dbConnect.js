import mongoose from "mongoose";

const dbConnect = async (uri) => {
    try{
        const connection = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}

export default dbConnect;