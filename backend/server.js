const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors");

app.get("/",(req,res)=>{
    res.send("Welcome to the backend server!");
})


app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})