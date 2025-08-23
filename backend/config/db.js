const mongoose =require("mongoose");
module.exports=async ()=>{
    const uri=process.env.MONGO_URI;
    if(!uri){
        throw new Error("MONGODB_URI is not defined in environment variables");
    }
     mongoose.set('strictQuery',true);
    await mongoose.connect(uri,{
        autoIndex:process.env.NODE_ENV!=="production",
    })
    mongoose.connection.on("connected",()=>{
        console.log("MongoDB connected successfully");
    })
    mongoose.connection.on("error",(err)=>{
        console.error("MongoDB connection error:", err);
    })
}