const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender:{ type:String, required:true },
    recipient:{ type:String, required:true },
    message:{ type:String, required:true },
    timestamp:{ type:Date, default:Date.now },
});

const Chat = mongoose.model('chat',chatSchema);
module.exports = Chat;