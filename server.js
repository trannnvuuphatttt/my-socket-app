const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://192.168.56.1:3000", // Địa chỉ của ứng dụng Nuxt.js
        methods: ["GET", "POST"],
        credentials: true 
    }
});

const PORT = 3001;

io.on('connection', (socket) => {
    console.log('Một client đã kết nối: ' + socket.id);

    socket.on('message', (msg) => {
        console.log('Tin nhắn nhận được: ' + msg);
        io.emit('message', msg); // Gửi lại tin nhắn đến tất cả client
    });

    socket.on('disconnect', () => {
        console.log('Client đã ngắt kết nối: ' + socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
