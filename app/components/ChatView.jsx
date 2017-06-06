import React, {Component} from 'react';
const io = require('socket.io-client');
const socket = io();
import {connect} from 'react-redux';

import Nav from './Nav';
import UserList from './UserList';

class ChatView extends Component {
    constructor() {
        super();
        socket.on('new user join', (users) => this.joinUser(users));

    }
    joinUser(user) {
        const combinedUsers = [...this.state.users, user];
        const newUsers = Array.from(new Set(combinedUsers));
        const cleanUsers = newUsers.filter(user => {return user.length > 1});
        this.setState({users: cleanUsers});
    }
    render() {
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
                        <div className="chat__footer">
                            <form action="" id="message-form">
                                <input name="message" type="text" placeholder="Message" autoFocus autoComplete="off" />
                                <button>Send</button>
                            </form>
                            <button id="send-location">Send Location</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(ChatView);