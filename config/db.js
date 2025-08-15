const mongoose = require("mongoose")

module.exports.connectToMongoDb = async () => {
    mongoose.set('strictQuery', false);
    mongoose
    .connect("mongodb+srv://elmahersarra:YnLSaZAkKfx23tuE@cluster0.m1kpmbp.mongodb.net/")
    .then(() => { 
        console.log("connect to db") ;
    
    })
    .catch((error) => { 
        console.log(error) })
};