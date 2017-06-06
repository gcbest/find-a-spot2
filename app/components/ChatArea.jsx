import React from 'react';
import {connect} from 'react-redux';

import ChatBubble from './ChatBubble';
var {socket} = require('./SignIn');
var actions = require('../actions/actions');


const ChatArea = (props) => {
    var filterByZipCode = (messagesArray) => {
        // Filtering to only show messages in user's room
        var messagesFiltered = messagesArray;
        return messagesFiltered.filter((msg) => {
            return msg.room === props.user.room;
        });
    };

    var renderChats = () => {
        var {messages, dispatch} = props;

        socket.on('updateMessages', function(messagesArr) {
            console.log('message array', messagesArr);
            // dispatch(actions.updateUsersList(usersArr));
            dispatch(actions.updateMessageList(messagesArr));
        });

        debugger;
        var filteredMessages = filterByZipCode(messages);
        if(filteredMessages.length === 0) {
            return <p>No New Messages</p>;
        }

        return filteredMessages.map((msg, i) => {
            return (
                <ChatBubble key={i} {...msg}/>
            );
        });
    };
    return (
      <div>
          {renderChats()}
      </div>
    );
};

export default connect((state) => {
    return state;
})(ChatArea);