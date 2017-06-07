import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
var action = require('../actions/actions');
var {socket} = require('./SignIn');


class OpenSpot extends Component {

    render() {
        var {address, markedOpenAt, available, id, user, dispatch} = this.props;

        var updateAvailability = (id) => {
            // Only keep the available locations in this array
            // var locationsArrCopy = this.props.locations.filter((spot) => {
            //     if (id && Math.floor(lat * 100) === Math.floor(user.userCoords.lat * 100) && Math.floor(lng * 100) === Math.floor(user.userCoords.lng * 100)) {
            //         var isAvailable = !available;
            //         available = isAvailable;
            //         alert('Successfully claimed this spot');
            //         dispatch(actions.updateAvailability(id, user,));
            //         // return false;
            //     } else if (id && (Math.floor(lat * 100) !== Math.floor(user.userCoords.lat * 100) || Math.floor(lng * 100) !== Math.floor(user.userCoords.lng * 100))) {
            //         alert("You must be at the spot's location to claim it");
            //         dispatch(actions.updateAvailability(id, user,));
            //     }
            // });

        };
        var userFeedBackMessage = (isSuccess) => {
              if(isSuccess) {
                  alert('Successfully claimed this spot');
              } else {
                  alert("You must be at the spot's location to claim it");
              }
        };



        var renderSpot = () => {

            if (available) {
               return (
                   <li>
                       <p>{address}</p>
                       <p>{moment.unix(markedOpenAt).format('MMM Do YYYY @ h:mm a')}</p>
                       <button onClick={() => {
                           dispatch(action.updateAvailability(id, user));
                           socket.emit('updateAvailability', id, (err) => {
                              if (err) console.log(err);
                           });
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