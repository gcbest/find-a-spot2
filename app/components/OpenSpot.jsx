import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
var action = require('../actions/actions');
var {socket} = require('./SignIn');


class OpenSpot extends Component {

    render() {
        var {address, markedOpenAt, available, id, lat, lng, user, dispatch} = this.props;

        var userFeedBackMessage = () => {
            // Let the user know if they are able to claim the spot
                if (id && Math.floor(lat * 1000) === Math.floor(user.userCoords.lat * 1000) && Math.floor(lng * 1000) === Math.floor(user.userCoords.lng * 1000)) {
                    alert('Successfully claimed this spot');
                    socket.emit('updateAvailability', id, (err) => {
                        if (err) console.log(err);
                    });
                    dispatch(action.updateAvailability(id, user));
                } else if (id && (Math.floor(lat * 1000) !== Math.floor(user.userCoords.lat * 1000) || Math.floor(lng * 1000) !== Math.floor(user.userCoords.lng * 1000))) {
                    alert("You must be at the spot's location to claim it");
                }
        };

        var renderSpot = () => {

            if (available) {
               return (
                   <li id="open-spots">
                       <h6>{address}</h6>
                       <span>{moment.unix(markedOpenAt).format('MMM Do YYYY @ h:mm a')}</span>
                       <button id="claim-spot" onClick={() => {
                           userFeedBackMessage();
                       }}>I parked at this spot!</button>
                   </li>
               );
            }
        };
        return (
            <div id="open-spot">
                {renderSpot()}
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(OpenSpot);

// pass address info down to open spot
// return an array of open spots components in list
//