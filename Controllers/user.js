const User = require("../Models/User");
const Ad= require("../Models/Ad");
const Otp = require("../Models/Otp");


exports.logIn = async(req, res)=> {
    
   try {
    const {contact , otp} = req.body
       
    const user = await User.findOne({contact:contact});
    const checkOtp = await Otp.findOne({contact:contact});

    if(checkOtp && checkOtp === otp)
    {
        const payload = {
            contact: user.contact,
            id: user._id,
            role: user.type
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        user.token = token;
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
       return response.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: " login succed"
        })
    }
    else{
        return res.status(400).send({
            success:false, 
            message:"Wrong Otp , check again", 
            error:err
         })
    }
   }
   catch(err){
      console.log("Error while loggin in",err); 
      return res.status(500).send({
         success:false, 
         message:"Error while loggin in", 
         error:err
      })
}
}

