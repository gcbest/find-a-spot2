import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'node-uuid';
import moment from 'moment';
import axios from 'axios';

var initMap = require('../api/googlemaps');
var actions = require('../actions/actions');
var {socket} = require('./SignIn');

class Map extends Component {
    componentWillMount() {
        const scriptInit = document.createElement("script");
        scriptInit.text = initMap;

        document.body.appendChild(scriptInit);
    }
    componentDidMount() {
        var that = this;
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }
        navigator.geolocation.getCurrentPosition(function(position) {
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
                if(response.data.results[0].formatted_address && response.data.results[0].address_components[7].long_name) {
                    location.address = response.data.results[0].formatted_address;
                    location.zipCode = response.data.results[0].address_components[7].long_name;
                }

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
    handleClick() {
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }

        var that = this;

        var locationButton = document.getElementById('send-location');
        locationButton.setAttribute('disabled', 'disabled');
        locationButton.innerHTML = 'Sending Location...';

        navigator.geolocation.getCurrentPosition(function(position) {
            locationButton.removeAttribute('disabled');
            locationButton.innerHTML = 'Mark an open spot right here';

            var obj = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                id: uuid(),
                available: true,
                markedOpenAt: moment().unix(),
                markedClosedAt: undefined
            };

            that.formatAddress(obj);

        }, function() {
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