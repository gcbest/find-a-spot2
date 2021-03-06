import React, {Component} from 'react';
import {connect} from 'react-redux';

import OpenSpot from './OpenSpot';
var {socket} = require('./SignIn');
var actions = require('../actions/actions');

export class OpenSpotsList extends Component{
    constructor(props) {
        super(props);
        var {dispatch} = this.props;

        socket.on('updateLocations', function(locations) {
            dispatch(actions.updateLocationsList(locations));
        });
    }
    render () {
        var {locations} = this.props;

        var filterByZipCode = (locationArray) => {
            // Filtering to only show locations in the user's zip code
            var locationsFiltered = locationArray;
            return locationsFiltered.filter((spot) => {
                return spot.available && spot.zipCode === this.props.user.room;
            });
        };

        var filteredLocations = filterByZipCode(locations);
        var renderOpenSpots = () => {
            if (filteredLocations.length === 0) {
                return <h6>No Open Spots Available</h6>;
            }

            return filteredLocations.map((spot, i) => {
                return (
                    <OpenSpot key={i} {...spot}/>
                );
            });
        };
        return (
            <div id="spots-list">
                <ol id="messages" className="chat__messages">
                    {renderOpenSpots()}
                </ol>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(OpenSpotsList);