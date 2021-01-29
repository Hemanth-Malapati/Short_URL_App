
const mongoose = require("mongoose");
const config = require("../config");

const connectDb = async () => {
    try{
        await mongoose.connect(config.mongoConnectionString, {
            useNewURLParser: true
        });
        console.log("Connected to DB");
    }catch(err){
        console.error(err.message);
    }
}

module.exports = connectDb;