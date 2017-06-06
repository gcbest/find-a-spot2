var redux = require('redux');
var {userReducer, locationsReducer, usersListReducer, messagesReducer} = require('../reducers/reducers');

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        user: userReducer,
        locations: locationsReducer,
        usersList: usersListReducer,
        messages: messagesReducer
    });

    var store = redux.createStore(reducer, initialState, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};