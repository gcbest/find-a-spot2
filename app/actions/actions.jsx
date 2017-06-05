var {socket} = require('../components/SignIn');

export var addUser = (name, room, redirect = false) => {
    var params = {
        name,
        room
    };

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
            console.log('params', params);
        }
    });

    return {
        type: 'ADD_USER',
        name,
        room,
        redirect
    }
};