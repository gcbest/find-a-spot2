import React, {Component} from 'react';

import OpenSpot from './OpenSpot';
var {socket} = require('./SignIn');

class OpenSpotsList extends Component {
    constructor (props) {
        super(props)
    }
    // componentDidMount() {
    //     socket.emit('update locations array', this.props.addresses, (err) => {
    //         if (err) {
    //             alert(err);
    //         } else {
    //             console.log('No error');
    //         }
    //     });
    // }
    render () {
        var {addresses} = this.props;
        var renderOpenSpots = () => {
            if (addresses.length === 0) {
                return <p>No Open Spots Available</p>;
            }

            return addresses.map((spot, i) => {
                return (
                    <OpenSpot key={i} {...spot} updateAvailability={this.props.updateAvailability} userCoords={this.props.userCoords}/>
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

export default OpenSpotsList;