import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
var action = require('../actions/actions');
var {socket} = require('./SignIn');

class ChatBubble extends Component {
    render() {
        var {name, text, timeSent} = this.props;

        var renderBubble = () => {
            return (
                <li className="message">
                    <p><strong>{name}</strong></p>
                    <p>{text}</p>
                    <p>{moment.unix(timeSent).format('MMM Do YYYY @ h:mm a')}</p>
                </li>
            );
        };
        return (
            <div id="chat">
                {renderBubble()}
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(ChatBubble);

// pass address info down to open spot
// return an array of open spots components in list
//