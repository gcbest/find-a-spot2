import React, {Component} from 'react';
const io = require('socket.io-client');
const socket = io();
import {connect} from 'react-redux';

import Nav from './Nav';
import UserList from './UserList';
import SendMessage from './SendMessage';
import ChatArea from './ChatArea';

class ChatView extends Component {
    render() {
        socket.on('updateMessages', (messagesArray) => {

        });
        return (
            <div>
                <Nav/>
                <div className="chat">
                    <div className="chat__sidebar">
                        <h3>People</h3>
                        <UserList users={this.props.usersList}/>
                    </div>
                    <div className="chat__main">
                        {/*<ol id="messages" className="chat__messages"></ol>*/}
                        <ChatArea/>
                        <SendMessage/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(ChatView);