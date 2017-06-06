const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

// const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const isRealString = require('./utils/validation');
const Users = require('./utils/users');
const Messages = require('./utils/message');


var users = new Users();
var messages = new Messages();

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080;

const app  = express();

app.use(express.static(publicPath));

const server = app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});

const io = socketIO(server);

var recentSpotsArr = [];

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        var user = users.getUser(socket.id);

        console.log('user joined room', user);
        console.log('recent spots array: ', recentSpotsArr);
        io.to(user.room).emit('update locations', recentSpotsArr);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        // socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));

        callback();
    });

    socket.on('update locations array', (locations, callback) =>{
        if(locations.length > 0) {
            recentSpotsArr = locations;
            var user = users.getUser(socket.id);
            io.to(user.room).emit('update locations', locations);
        }
        callback();
    });

    socket.on('updateMessagesArray', (newMessage) => {
        messages.addMessage(newMessage);
        var user = users.getUser(socket.id);
        console.log('message list', messages.getMsgList(user.room))
        io.to(user.room).emit('updateMessages', messages.getMsgList(user.room));
    });

    // socket.on('createMessage', (message, callback) => {
    //     var user = users.getUser(socket.id);
    //
    //     if (user && isRealString(message.text)) {
    //         io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    //     }
    //     callback();
    // });
    //
    // socket.on('createLocationMessage', (coords) => {
    //     var user = users.getUser(socket.id);
    //
    //     if (user) {
    //         io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    //     }
    // });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            // io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left` ));
        }
    });

});