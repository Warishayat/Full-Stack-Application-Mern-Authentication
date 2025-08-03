const joi =require("joi");

// lets make a validation function in Middleware to check user data is valid or not.
const SignupValidation = async(req,res,next)=>{
    const schema = joi.object({
        name:joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password:joi.string().min(5).max(20).required()
    })
   const {error} = schema.validate(req.body);
   if (error){
            return res.status(400).json(
            {
                message:error
            }
        )
   }
   next();
}

const LoginValidation = async(req,res,next)=>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password:joi.string().min(5).max(20).required()
    })
   const {error} = schema.validate(req.body);
   if (error){
            return res.status(400).json(
            {
                message:error
            }
        )
   }
   next();
}

module.exports = {
    SignupValidation,
    LoginValidation
}