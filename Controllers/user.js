const User = require('../Models/User');
const Ad = require('../Models/Ad');
const Otp = require('../Models/Otp');
const otpGenerator = require('otp-generator');

exports.logIn = async (req, res) => {
  try {
    console.log('the req is ', req.body);
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No User Exists check again ',
      });
    }
    if (password == user?.password) {
      return res.status(200).json({
        success: true,
        message: 'Logged In Succesfully',
        data: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'The  password is incorrect',
      });
    }
  } catch (err) {
    console.log('Error while logging in', err);
    return res.status(500).send({
      success: false,
      message: 'Error while logging in',
      error: err,
    });
  }
};

exports.signUp = async (req, res) => {
  const {name, email, otp, password, accountType} = req.body;
  console.log('the req is ', req.body);
  if (!name || !email || !otp || !password) {
    return res.status(400).json({
      success: false,
      message: 'Wrong Parameters',
    });
  }

  const user = await User.findOne({email: email});
  if (user) {
    return res.status(404).json({
      success: false,
      message: 'User Already Exists',
    });
  }
  const checkOtp = await Otp.findOne({email: email});
  if (checkOtp && checkOtp?.otp == otp) {
    // otp is correct
    const user = await User.create({name, password, email, type: accountType});
    return res.status(200).json({
      success: true,
      message: 'User Created Succesfully',
      data: user,
    });
  } else {
    console.log('s');
    return res.status(300).send({
      success: false,
      message: 'Wrong Otp , check again',
    });
  }
};
exports.sendOtp = async (request, response) => {
  try {
    // fetched email
    console.log('the re', request);
    const {email} = request.body;
    // check if user exist or not
    if (!email || email == '') {
      return response.status(400).json({
        success:false , 
        message:"Wrong Email Entered"
      });
    }
    const checkUser = await User.findOne({email});
    if (checkUser) {
      return response.status(401).json({
        success: false,
        message: 'User Already Exists',
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log(otp);
    // verify that otp is unique
    let checkOtp = Otp.findOne({otp: otp});

    const saved = Otp.create({
      email,
      otp,
    });
    const otpPayload = {email, otp};
    console.log('OTP Body', otpPayload);
    return response.status(200).json({
      success: true,
      message: 'Otp Sent Successfully',
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: 'Failed to Send Otp',
    });
  }
};
