const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const ConnectDB = async()=>{
    try {
        const conn = mongoose.connect(process.env.DATABASE_CONN);
        console.log("Databse is up.");
    } catch(error) {
        console.error(error);
    }
}

module.exports = ConnectDB;
