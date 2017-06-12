import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

var {socket} = require('./SignIn');
var actions = require('../actions/actions');


export class SendMessage extends Component {
    render() {
        var createMessage = (e) => {
            var {user, dispatch} = this.props;
            e.preventDefault();
            var message = this.refs.message.value;
            var messageObject = {
                name: user.name,
                room: user.room,
                text: message,
                timeSent: moment().unix()
            };
            if(message.length > 0) {
                dispatch(actions.addMessage(messageObject.name, messageObject.room, messageObject.text, messageObject.timeSent));
                socket.emit('updateMessagesArray', messageObject, (err) => {
                    if (err) {
                        alert(err);
                    } else {
                        console.log('No error');
                    }
                });
            }
            // clear input box after sending the message
            this.refs.message.value = '';
        };
        return (
            <div className="chat__footer">
                <form onSubmit={createMessage} id="message-form">
                    <input name="message" ref="message" type="text" placeholder="Type a message" autoFocus autoComplete="off" />
                    <button id="send-msg-btn">Send</button>
                </form>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(SendMessage);