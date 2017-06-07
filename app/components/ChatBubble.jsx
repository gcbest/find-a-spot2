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
                <li id="messages">
                    <div className="message__title">
                        <h4>{name}</h4>
                        <span>{moment.unix(timeSent).format('M/D/YY @ h:mm a')}</span>
                    </div>
                    <div className="class__body">
                        <p>{text}</p>
                    </div>
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