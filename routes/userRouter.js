var express = require('express');
var router = express.Router();
const os = require("os")
/* GET users listing. */
const userController = require ("../controllers/userController")

const uploadfile= require("../middlewares/uploadFile")
const {requireAuthUser} = require ("../middlewares/authmiddlewares")
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id', userController.getUserById);
router.get('/getUserByAge/:age', requireAuthUser,userController.getUserByAge);
router.get('/searchUserByFirstName', userController.searchUserByFirstName);
router.get('/getUserBetweenAgeXAndY', userController.getUserBetweenAgeXAndY);
router.get('/getAllUsersSortedByFirstName', userController.getAllUsersSortedByFirstName);
router.post('/addClient', userController.addClient);
router.post('/login', userController.login);
router.post('/addClientV2', userController.addClientV2);
router.post('/addClientWithImage', uploadfile.single("user_Image"), userController.addClientWithImage);
router.delete('/deleteUserById/:id', userController.deleteUserById);
module.exports = router;