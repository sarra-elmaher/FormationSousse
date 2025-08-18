var express = require('express');
var router = express.Router();
const os = require("os")
/* GET users listing. */
const userController = require ("../controllers/userController")
//router.get('/getOsInformation', userController.getOsInformation );
module.exports = router;