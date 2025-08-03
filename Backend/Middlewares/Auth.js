const jwt = require("jsonwebtoken");

const EnuserAuthenticated = (req,res,next)=>{
    const auth = req.headers["authorization"];
    if(!auth){
        return res.status(403).json({
            message: "unauthorized jwt is required",
            sucess:false
        })
    }
    const token = auth.split(" ")[1];
    try {
        const decoded = jwt.verify(auth,process.env.JWT_SECRET);
        req.user = decoded  //decode kark token wapis request m dal dia hae
        // console.log(req.user);
        next();
    } catch(error) {
        return res.status(500).json({
            success:false,
            message:"Token is unauthorized"
        })
    }
}

module.exports = EnuserAuthenticated;