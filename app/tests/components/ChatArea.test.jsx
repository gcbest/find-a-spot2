import React from 'react';
import {Provider} from 'react-redux';
import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';

var {configure} = require('../../store/configureStore');
import ConnectedChatArea, {ChatArea} from '../../components/ChatArea';
import ConnectedChatBubble from '../../components/ChatBubble';

describe('ChatArea', () => {
   it('should exist', () => {
      expect(ChatArea).toExist();
   });

   it('should create a new ChatBubble for each message', () => {
        var chatMessages = [
            {
                name: 'James',
                text: 'Hi',
                timeSent: '12345'
            },
            {
                name: 'Jane',
                text: 'Howdy',
                timeSent: '54321'
            }
        ];

       var store = configure({
           messages: chatMessages
       });

       var provider = ReactTestUtils.renderIntoDocument(
           <Provider store={store}>
              <ConnectedChatArea/>
           </Provider>
       );

       var chatArea = ReactTestUtils.findRenderedComponentWithType(provider, ConnectedChatArea);
       var chatBubbles = ReactTestUtils.scryRenderedComponentsWithType(chatArea, ConnectedChatBubble);
       expect(chatBubbles.length).toEqual(2);
   });
});