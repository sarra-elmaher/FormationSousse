var express = require('express');
var router = express.Router();
const os = require("os")
/* GET users listing. */
router.get('/marahbe', function(req, res, next) {
  res.json('hi everybody');
});
router.get('/getOsInformation', function(req, res, next) {
  try {
    const osInformation ={
      hostname : os.hostname(),
      platform : os.platform(),
      type : os.type(),
      release : os.release()
    }
    console.log(osInformation)
    res.status(200).json(osInformation)
    
  } catch (error) {
      res.status(500).json({message: error.message})


    
  }
  res.json('hi everybody');
});
module.exports = router;
