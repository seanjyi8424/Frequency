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

const styles = StyleSheet.create({
    container: {}
});

export default Live;

