const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const isRealString = require('./utils/validation');
const Users = require('./utils/users');
const Messages = require('./utils/message');
const Locations = require('./utils/locations');


var users = new Users();
var messages = new Messages();
var locations = new Locations();

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080;

const app  = express();

app.use(express.static(publicPath));

const server = app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});

const io = socketIO(server);

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
        console.log('recent spots array: ', locations.getLocationsList(user.room));
        console.log('message list on new user join:', messages.getMsgList(user.room));

        io.to(user.room).emit('updateLocations', locations.getLocationsList(user.room));
        io.to(user.room).emit('updateMessages', messages.getMsgList(user.room));
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));

        callback();
    });

    socket.on('addLocation', (openSpot, callback) =>{
        var user = users.getUser(socket.id);
        locations.addLocation(openSpot);
        console.log('locations class: ', locations);
        console.log('locations list after add', locations.getLocationsList(user.room));
        io.to(user.room).emit('updateLocations', locations.getLocationsList(user.room));
        callback();
    });

    socket.on('updateAvailability', (id, callback) =>{
        var user = users.getUser(socket.id);
        var loc = locations.removeLocation(id);
        if (loc) {
            io.to(user.room).emit('updateLocations', locations.getLocationsList(user.room));
        }
        callback();
    });

    socket.on('updateMessagesArray', (newMessage) => {
        messages.addMessage(newMessage);
        var user = users.getUser(socket.id);
        io.to(user.room).emit('updateMessages', messages.getMsgList(user.room));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        }
    });

});