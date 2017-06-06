// var moment = require('moment');
//
// var generateMessage = (from, text) => {
//     return {
//         from,
//         text,
//         createdAt: moment().valueOf()
//     }
// };
//
// var generateLocationMessage = (from, latitude, longitude) => {
//     return {
//         from,
//         url: `https://www.google.com/maps?q=${latitude},${longitude}`,
//         createdAt: moment().valueOf()
//     }
// }
//
// module.exports = {generateMessage, generateLocationMessage};

class Message {
    constructor() {
        this.messagesArr = [];
    }

    addMessage(msgObj) {
        this.messagesArr.push(msgObj);
        return msgObj;
    }

    getMsgList(room) {
        var filteredMessages = this.messagesArr.filter((msg) => msg.room === room);
        // var namesArray = filteredMessages.map((msg) => msg.text);
        return filteredMessages;
    }
}

module.exports = Message;