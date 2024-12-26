const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./modules/db');
const Chat = require('./modules/chatModel');

const app = express();
const sever = http.createServer(app);
const io = new Server(sever);

app.use(express.static('public'));
connectDB();

const users = {};

io.on('connection',(socket)=>{
    console.log(`User connected ${socket.id}`);

    socket.on('register',(username)=>{
            users[socket.id]=username;
            io.emit('users',users);
    });
    socket.on('privateMessage',({recipientId,message})=>{
        const sender = users[socket.id];
        const recipient = users[recipientId];

        if(recipient){
            const chatMessage = new Chat({sender,recipient,message});
            chatMessage.save();
            io.to(recipientId).emit('message',{sender,message,timestamp:new Date(),isSender:false});
            socket.emit('message',{ sender,message, timestamp:new Date(),isSender:true});
        }
    });
    socket.on('disconnect',()=>{
        delete users[socket.id];
        io.emit('users',users);
        console.log(`User disconnected: ${socket.id}`);
    });
});

sever.listen(3000,()=>{
    console.log(`Server is running on http://localhost:3000`);
});