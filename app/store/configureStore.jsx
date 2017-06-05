var redux = require('redux');
var {userReducer, locationsReducer} = require('../reducers/reducers');

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        user: userReducer,
        locations: locationsReducer
    });

    var store = redux.createStore(reducer, initialState, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
};