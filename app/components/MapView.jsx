import React, {Component} from 'react';
import {connect} from 'react-redux';

import Nav from './Nav';
import Map from './Map';
import OpenSpotsList from './OpenSpotsList';
var {socket} = require('./SignIn');
var actions = require('../actions/actions');

class MapView extends Component {
    constructor (props) {
        super(props);

        var {dispatch} = this.props;

        socket.on('updateUserList', function (usersArr) {
            console.log('Users list', usersArr);
            dispatch(actions.updateUsersList(usersArr));
        });
    }

    render () {
        return (
            <div className="main__section">
                <Nav/>
                <Map openSpots={this.props.locations} userCoords={this.props.user.userCoords} />
                <OpenSpotsList userCoords={this.props.user.userCoords}/>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    })(MapView);
