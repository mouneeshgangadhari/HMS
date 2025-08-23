const {ZodError} =require ("zod");
const notFound=(req,res)=>{
    res.status(404).json({error:"Not Found"});
}

const errorHandler=(err,req,res,next)=>{
    if(err instanceof ZodError){
        return res.status(400).json({"message":"Validation Error",error:err.errors});
    }
    const statusCode = res.statusCode ? res.statusCode : 500;
    const msg=err.message || "Internal Server Error";
    if(!process.env.NODE_ENV!=='production') console.error(err);
    res.status(statusCode).json({message:msg});
};
module.exports={notFound,errorHandler};