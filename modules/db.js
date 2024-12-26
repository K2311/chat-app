const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/chatApp');
        console.log('Connected to mongoDB');
    } catch (error) {
        console.log('MongoDB connectio error:',error);
    }
}

module.exports = connectDB;