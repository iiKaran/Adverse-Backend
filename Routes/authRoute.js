
const express = require("express"); 
const  router = express.Router();

const {logIn, sendOtp,signUp} = require('../Controllers/user'); 
const { route } = require("./adRoute");

router.post("/login",logIn); 
router.post("/signup",signUp);
router.post('/sendOtp',sendOtp);

module.exports = router; 