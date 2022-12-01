const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

const connectToDB = () => {
    mongoose.connect(MONGO_URL).then((conn)=>{
        console.log(`Database successfully connected to ${conn.connection.host}`);
    }).catch((error)=>{
        console.log(`Database Connection Error : ${error.message}`);
        process.exit(1);
    })
}

module.exports = connectToDB;