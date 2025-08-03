const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const ConnectDB = require("../Backend/Config/db");
const cors = require("cors");
const BodyParser = require("body-parser");  //client k data ko parse karny
const Authrouter = require("../Backend/Router/Authrouter")
const ProductRouter  = require("../Backend/Router/ProductRouter")
app.use(express.json());

const PORT = process.env.PORT || 8080 ;

ConnectDB();
app.use(cors());    //accept other ports 



app.use("/auth",Authrouter);
app.use("/products",ProductRouter);


// route
app.get("/ping",(req,res)=>{
    res.send("pong");
})



app.listen(PORT,()=>console.log("App is up."));
