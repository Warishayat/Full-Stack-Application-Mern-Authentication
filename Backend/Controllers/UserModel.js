const User = require("../Models/User")
const bcrypt = require("bcrypt");
const jwt_token = require("jsonwebtoken");

const Signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const FindUser = await User.findOne({email});
        // suppose user is already there
        if(FindUser){
            return res.status(404).json({
                success:false,
                message: "User is found already .You can login."
            })
        }
        const newUser = new User({name,email,password});
        // encrypt the password
        newUser.password = await bcrypt.hash(password,10);
        newUser.save();
        res.status(201).json({
            sucesss:true,
            message: "User is created Successfully"
        })
    } catch(error) {
        return res.status(500).json({
            sucess:false,
            message: "Internal Server Error."
        })
    }
}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const error_message = "Auth failed. Email or password is incorrect.";

        const CheckEmail = await User.findOne({ email });

        if (!CheckEmail) {
            return res.status(403).json({
                success: false,
                message: error_message,
            });
        }

        // Compare the entered password with the stored hash
        const savepass = CheckEmail.password;
        const MatchPassword = await bcrypt.compare(password, savepass);

        if (!MatchPassword) {
            return res.status(403).json({
                success: false,
                message: error_message,
            });
        }

        console.log("Password is working fine jwt is issuing")
        // Generate JWT token
        const token = jwt_token.sign(
            { email: CheckEmail.email, _id: CheckEmail._id }, // payload
            process.env.JWT_SECRET,                           // secret
            { expiresIn: "24h" }                              // expiration
        );

        return res.status(200).json({
            success: true,
            message: "Login Success",
            token,
            email,
            name: CheckEmail.name,
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};

module.exports = {
    Signup,
    Login
}

