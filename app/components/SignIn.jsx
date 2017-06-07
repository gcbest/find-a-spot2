import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
const io = require('socket.io-client');
export const socket = io();

var initMap = require('../api/googlemaps');
var actions = require('../actions/actions');

class SignIn extends Component {
    componentWillMount() {
        if (!document.getElementById('googleMapsAPI')) {
            const script = document.createElement("script");

            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s&callback=initMap";
            script.async = true;
            script.defer = true;
            script.setAttribute('id', 'googleMapsAPI');

            document.body.appendChild(script);
        }

    }
    // componentDidMount() {
    //     socket.on('connect', function () {
    //         console.log('Connected to server');
    //     });
    // }
    handleSubmit(e) {
        e.preventDefault();
        var that = this;

        // set location in browserHistory
        this.props.history.push('/');

        // Grab user location
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser!');
        }
        // locationButton.attr('disabled', 'disabled').text('Sending Location...');
        navigator.geolocation.getCurrentPosition(function(position) {
            // locationButton.removeAttr('disabled').text('Send Location');
            var userCoords = {lat: position.coords.latitude, lng: position.coords.longitude};

            // Convert Lat & Lng into zip code
            var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userCoords.lat},${userCoords.lng}&key=AIzaSyBBdT0ajba4ZVpgaZeUupDTPE2x7ecAt4s`;
            axios.get(url)
                .then((response) => {

                    var {dispatch} = that.props;

                    var name = that.refs.name.value;
                    var room = response.data.results[0].address_components[7].long_name;
                    var redirect = true;

                    dispatch(actions.addUser(name, room, redirect, userCoords));
                })
                .catch((error) => {
                    throw error;
                });
        });



    }
    render () {
        var {user} = this.props;

        if (user.redirect) {
            return <Redirect to={`/mapview/${user.room}`}/>;
        }
        return (
            <div>
                <div id="header">
                    <h1 className="page-title">Find a spot near you!</h1>
                </div>
                <div className="centered-form">
                    <div className="centered-form__form">
                        <form id="signin-form">
                            <div className="form-field">
                                <h3>Join a chat</h3>
                            </div>
                            <div className="form-field">
                                <label>Display name</label>
                                <input type="text" ref="name" name="name" autoFocus/>
                            </div>
                            <div className="form-field">
                                <label>Enter Your Zip Code's Room</label>
                                <input ref="room" type="hidden" name="room"/>
                            </div>
                            <div className="form-field">
                                <button onClick={this.handleSubmit.bind(this)}>Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    }
)(SignIn);