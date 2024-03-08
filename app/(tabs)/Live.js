import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class Live extends Component {
    constructor(props) {
    super(props);
    this.state = {
        username: this.props.username,
        text: '',
        chatrooms: {
            'Kanye': [],
            'Travis Scott': [],
            'Drake': [],
        },
        currentChatroom: null,
        error: "none",
    };

}

handleTextChange = text => {
        this.setState({ text });
    };

sendMessage = () => {
        const { text, currentChatroom, chatrooms } = this.state;
        if (text.trim()) {
            const updatedChatrooms = { ...chatrooms };
            updatedChatrooms[currentChatroom].push({ username: this.state.username, message: text });

            this.setState({
                chatrooms: updatedChatrooms,
                text: ''
            });
        }
};

selectChatroom = (chatroom) => {
        this.setState({ currentChatroom: chatroom });
};

leaveChatroom = () => {
        this.setState({ currentChatroom: null });
};

renderChatroomButtons() {
    // Code for renderChatroomButtons here...
}

renderChatroom() {
    // Code for renderChatroom here...
}


render() {
    // Complete render method here...
}

const styles = StyleSheet.create({
    container: {}
});

export default Live;

