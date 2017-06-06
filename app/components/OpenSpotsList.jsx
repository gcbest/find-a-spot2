import React, {Component} from 'react';
import {connect} from 'react-redux';

import OpenSpot from './OpenSpot';
var {socket} = require('./SignIn');

class OpenSpotsList extends Component {
    // constructor (props) {
    //     super(props)
    // }

    componentDidUpdate() {
        var {addresses} = this.props;

        socket.emit('update locations array', addresses, (err) => {
            if (err) {
                alert(err);
            } else {
                console.log('No error');
            }
        });
    }
    render () {
        var {addresses} = this.props;
        var filterByZipCode = (locationArray) => {
            // Filtering to only show locations in user's zip code
            var locationsFiltered = locationArray;
            return locationsFiltered.filter((spot) => {
                return spot.available && spot.zipCode === this.props.user.room;
            });
        };

        var filteredLocations = filterByZipCode(addresses);

        socket.emit('update locations array', addresses, (err) => {
            if (err) {
                alert(err);
            } else {
                console.log('No error');
            }
        });

        var renderOpenSpots = () => {
            if (filteredLocations.length === 0) {
                return <p>No Open Spots Available</p>;
            }

            return filteredLocations.map((spot, i) => {
                return (
                    <OpenSpot key={i} {...spot}/>
                );
            });
        };
        return (
            <div id="spots-list">
                <ul>
                    {renderOpenSpots()}
                </ul>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(OpenSpotsList);