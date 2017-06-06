var {socket} = require('../components/SignIn');

export var addUser = (name, room, redirect = false, userCoords) => {
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
        redirect,
        userCoords
    }
};

export var addLocation = (obj) => {
    // socket.emit('update locations array', this.state.locations, (err) => {
    //     if (err) {
    //         alert(err);
    //     } else {
    //         console.log('No error');
    //     }
    // });

    return {
        type: 'ADD_LOCATION',
        lat: obj.lat,
        lng: obj.lng,
        address: obj.address,
        zipCode: obj.zipCode,
        id: obj.id,
        available: obj.available,
        markedOpenAt: obj.markedOpenAt,
        markedClosedAt: obj.markedClosedAt
    }
};

export var updateAvailability = (id, user) => {
    return {
        type: 'UPDATE_AVAILABILITY',
        id,
        user,
    }
};

export var updateUsersList = (list) => {
    return {
        type: 'UPDATE_USERS_LIST',
        list
    };
};

export var addMessage = (user, room, text, timeSent) => {
    return {
        type: 'ADD_MESSAGE',
        user,
        room,
        text,
        timeSent
    };
};

export var updateMessageList = (messagesArr) => {
    return {
        type: 'UPDATE_MESSAGE_LIST',
        messagesArr
    };
};