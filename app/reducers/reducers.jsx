export var userReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_USER":
            return {
                name: action.name,
                room: action.room,
                redirect: action.redirect,
                userCoords: action.userCoords
            };
        default:
            return state;
    }
};

export var locationsReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_LOCATION':
            return [
                ...state,
                {
                    lat: action.lat,
                    lng: action.lng,
                    address: action.address,
                    zipCode: action.zipCode,
                    id: action.id,
                    available: action.available,
                    markedOpenAt: action.markedOpenAt,
                    markedClosedAt: action.markedClosedAt
                }
            ];
        case 'UPDATE_AVAILABILITY':
            return state.map((spot) => {
                if (spot.id === action.id && Math.floor(spot.lat * 1000) === Math.floor(action.user.userCoords.lat * 1000) && Math.floor(spot.lng * 1000) === Math.floor(action.user.userCoords.lng * 1000)) {

                    return {
                        ...spot,
                        available: false
                    };

                } else if (spot.id === action.id && (Math.floor(spot.lat * 1000) !== Math.floor(action.user.userCoords.lat * 1000) || Math.floor(spot.lng * 1000) !== Math.floor(action.user.userCoords.lng * 1000))) {
                    return spot;
                } else {
                    return spot;
                }

            });
        case 'UPDATE_LOCATIONS_LIST':
            return [
                ...action.locationsArr
            ];
        default:
            return state;
    }
};

export var usersListReducer = (state = [], action) => {
    switch(action.type) {
        case 'UPDATE_USERS_LIST':
            if(action.list.length > 0) {
                return [
                    ...action.list
                ];
            } else {
                return [];
            }
        default:
            return state;

    }
};

export var messagesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_MESSAGE':
            return [
                ...state,
                {
                    user: action.user,
                    room: action.room,
                    text: action.text,
                    timeSent: action.timeSent
                }
            ];
        case 'UPDATE_MESSAGE_LIST':
            return [
                ...action.messagesArr
            ];
        default:
            return state;
    }
};