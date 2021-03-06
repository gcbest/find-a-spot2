import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
const io = require('socket.io-client');
export const socket = io();

var initMap = require('../api/googlemaps');
var actions = require('../actions/actions');

class SignIn extends Component {
  componentWillMount() {
    if (!document.getElementById('googleMapsAPI')) {
      const script = document.createElement('script');

      script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAoD0IlojSbYu4sw4S5uCbXk_J5FA3FhyY';
      script.async = true;
      script.defer = true;
      script.setAttribute('id', 'googleMapsAPI');

      document.body.appendChild(script);
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    var that = this;

    // set location in browserHistory
    this.props.history.push('/');

    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser!');
    }

    var enterButton = document.getElementById('enter');

    enterButton.setAttribute('disabled', 'disabled');
    enterButton.innerHTML = 'Signing into your room...';

    function showErr(err) {
      console.error(err);
    }

    navigator.geolocation.getCurrentPosition(showPosition, showErr, {
      timeout: 10000,
    });
    function showPosition(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
    }
    // Grab user location
    // navigator.geolocation.getCurrentPosition(
    //   function(position) {
    //     var userCoords = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     };

    //     // Convert Lat & Lng into zip code
    //     // var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
    //     //   userCoords.lat
    //     // },${
    //     //   userCoords.lng
    //     // }&key=AIzaSyAoD0IlojSbYu4sw4S5uCbXk_J5FA3FhyY&callback=initMap`;
    //     var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCy33G2gBLzSfo2NrvPfnppEqJ1FiyWwSw`;
    //     axios
    //       .get(url)
    //       .then(response => {
    //         var { dispatch } = that.props;

    //         var name = that.refs.name.value;
    //         var room = response.data.results[0].address_components[7].long_name;
    //         var redirect = true;

    //         dispatch(actions.addUser(name, room, redirect, userCoords));
    //       })
    //       .catch(error => {
    //         throw error;
    //       });
    //   },
    //   function(err) {
    //     console.error(err);
    //   },
    //   { timeout: 10000 },
    // );
  }
  render() {
    var { user } = this.props;

    if (user.redirect) {
      // so that the user can go back to the sign in page
      user.redirect = false;
      return <Redirect to={`/mapview/${user.room}`} />;
    }
    return (
      <div>
        <div id="header">
          <h1 id="title">Find an Open Parking Spot Near You!</h1>
        </div>
        <div className="centered-form">
          <div className="centered-form__form">
            <form id="signin-form">
              <div className="form-field">
                <h5>Join Your Chatroom</h5>
              </div>
              <div className="form-field">
                <label>Display Name</label>
                <input type="text" ref="name" name="name" autoFocus />
              </div>
              <div className="form-field">
                <input ref="room" type="hidden" name="room" />
              </div>
              <div className="form-field">
                <button id="enter" onClick={this.handleSubmit.bind(this)}>
                  Enter
                </button>
              </div>
            </form>
          </div>
          <img id="parking-img" src="../images/parking.jpg" alt="Parking App" />
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return state;
})(SignIn);
