import axios from 'axios';
import uuid from 'node-uuid';
import moment from 'moment';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Nav from './Nav';
import Map from './Map';
import OpenSpotsList from './OpenSpotsList';
var {socket} = require('./SignIn');

var {formatAddress} = require('../api/formatAddress');

class MapView extends Component {
    constructor () {
        super();
        this.state = {
            locations: []
        };

        socket.on('update locations', (spots) => this.updateLocationsArr(spots));

        var that = this;

        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }
        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};

            that.state.userCoords = userCoords;

            var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userCoords.lat},${userCoords.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
            axios.get(url)
                .then((response) => {
                    that.state.zipCode = response.data.results[0].address_components[7].long_name;
                })
                .catch((error) => {
                    throw error;
                });
        });


        // this.addLocation = this.addLocation.bind(this);
        // this.updateAvailability = this.updateAvailability.bind(this);
    }

    updateLocationsArr(locations) {
        this.setState({locations});
    }
    // var filterLocations = (locationArray) => {
    // // Filtering to only show locations in user's zip code
    // var locationsFiltered = locationArray;
    // return locationsFiltered.filter((spot) => {
    //     return spot.available && spot.zipCode === this.state.zipCode;
    // });
// };

    render () {
        return (
            <div>
                <Map openSpots={this.props.locations} userCoords={this.state.userCoords} />
                <OpenSpotsList addresses={this.props.locations} userCoords={this.state.userCoords}/>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    })(MapView);
