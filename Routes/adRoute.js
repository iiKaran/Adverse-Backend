
const express = require("express"); 
const  router = express.Router();

const {createAd , deleteAd, getAdds} = require("../Controllers/Ad");


router.post('/createAd',createAd); 
router.post('/deleteAd', deleteAd);
router.get('/getAllAds', getAdds); 

module.exports = router ; 
