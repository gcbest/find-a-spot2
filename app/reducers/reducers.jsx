import moment from 'moment';
import uuid from 'node-uuid';

export var userReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_USER":
            return {
                name: action.name,
                room: action.room,
                redirect: action.redirect
            };
        default:
            return state;
    }
};

export var locationsReducer = (state = [], action) => {
    switch(action.type) {
        case 'TOGGLE_SHOW_COMPLETED':
            return !state;
        default:
            return state;
    }
};
