
const express = require("express"); 
const  router = express.Router();

const {createAd , deleteAd, getAdds,getAllAdds, getAllAddsByUser} = require("../Controllers/Ad");


router.post('/createAd',createAd); 
router.post('/deleteAd', deleteAd);
router.post('/getAllAdsByUser', getAdds); 
router.post('/getAds', getAllAddsByUser); 

module.exports = router ; 
