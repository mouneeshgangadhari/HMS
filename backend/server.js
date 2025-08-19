const express = require("express");
const app = express();
app(express.json());
app.get("/",(req,res)=>{
    res.send("Hello");
})

app.listen(8000,()=>{
    console.log("Server is bad");
})