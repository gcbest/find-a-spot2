import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'node-uuid';
import moment from 'moment';
import axios from 'axios';

var initMap = require('../api/googlemaps');
var actions = require('../actions/actions');
var {socket} = require('./SignIn');

class Map extends Component {
    componentWillMount () {
        const scriptInit = document.createElement("script");
        scriptInit.text = initMap;

        document.body.appendChild(scriptInit);
    }
    componentDidMount() {
        var that = this;
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }
        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};

            initMap(userCoords, that.props.openSpots);
        });
    }
    componentWillReceiveProps(nextProps) {
        initMap(nextProps.userCoords, nextProps.openSpots);
    }
    formatAddress(location) {
        var that = this;
        var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
        return axios.get(url)
            .then((response) => {
                location.address = response.data.results[0].formatted_address;
                location.zipCode = response.data.results[0].address_components[7].long_name;

                // that.props.addLocation(location);

                var {dispatch} = that.props;
                dispatch(actions.addLocation(location));
                socket.emit('addLocation', location, (err) => {
                    if (err) console.log(err);
                });

                initMap(location, that.props.openSpots);
            })
            .catch((error) => {
                throw error;
            });
    }
    handleClick () {
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }

        var that = this;

        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            var obj = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                id: uuid(),
                available: true,
                markedOpenAt: moment().unix(),
                markedClosedAt: undefined
            };

            var obj2 = {lat: 40.728224399999995, lng: -74.1844780998, address: '74 Peabody Pl, Brick City', available: true, id: "3", zipCode: '07103'};

            var obj3 = {lat: 40.728224399999995, lng: -74.1844780998, address: '99 Allen Ave, New Jack City', available: true, id: "4", zipCode: '07103'};

            that.formatAddress(obj);
            that.formatAddress(obj2);
            that.formatAddress(obj3);

        }, function() {
            // locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location');
        });
    }
    render () {
        return (
            <div>
                <div id="map"/>
                <div id="button-container">
                    <button id="send-location" onClick={this.handleClick.bind(this)}>Mark an open spot right here</button>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(Map);