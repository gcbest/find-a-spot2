import React, {Component} from 'react';
import {connect} from 'react-redux';

import Nav from './Nav';
import UserList from './UserList';
import SendMessage from './SendMessage';
import ChatArea from './ChatArea';

class ChatView extends Component {
    render() {
        return (
            <div className="main__section">
                <Nav/>
                <div className="chat">
                    <div className="chat__sidebar">
                        <h3>People</h3>
                        <UserList users={this.props.usersList}/>
                    </div>
                    <div className="chat__main">
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