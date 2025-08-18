const mongoose = require("mongoose")

module.exports.connectToMongoDb = async () => {
    mongoose.set('strictQuery', false);
    mongoose
    .connect(process.env.url_Db)
    .then(() => { 
        console.log("connect to db") ;
    
    })
    .catch((error) => { 
        console.log(error) })
};