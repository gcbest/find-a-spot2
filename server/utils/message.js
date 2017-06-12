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
        return filteredMessages;
    }
}

module.exports = Message;