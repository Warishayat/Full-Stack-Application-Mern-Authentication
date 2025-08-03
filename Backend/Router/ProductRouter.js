const express = require("express");
const router = express.Router();
const  EnuserAuthenticated  = require("../Middlewares/Auth");


// before req is serving on the server first we will check its authenticated.
router.get("/", EnuserAuthenticated,(req,res)=>{
    console.log("this is user");
    console.log(req.user);

    return res.status(200).
    json([
        {
            name:"mobile",
            price:20000,
        },
        {
            name:"Apple i pad",
            price:50000
        }
    ])
})


module.exports = router;