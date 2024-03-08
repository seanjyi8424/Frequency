import React, { Component } from 'react';
import { Text, View, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                // Add more artists as needed
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
        const artistImages = {
            'Artist1': 'https://i.pinimg.com/originals/a9/a7/29/a9a729f26baddd99af9d2cdb9da36961.jpg',
            'Artist2': 'https://placeimg.com/640/480/any',
            'Artist3': 'https://placeimg.com/640/480/any',
            // Add more artist images as needed
        };

        return Object.keys(this.state.chatrooms).map((chatroom) => (
            <TouchableOpacity key={chatroom} style={styles.chatroomButton} onPress={() => this.selectChatroom(chatroom)}>
                <ImageBackground source={{ uri: artistImages[chatroom] }} style={styles.chatroomButtonImage} imageStyle={styles.chatroomButtonImageStyle}>
                    <Text style={styles.chatroomButtonText}>{chatroom}</Text>
                </ImageBackground>
            </TouchableOpacity>
        ));
    }

    renderChatroom() {
        const { chatrooms, currentChatroom } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    {chatrooms[currentChatroom].map((msg, index) => (
                        <View key={index} style={{ padding: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>{msg.username}</Text>
                            <Text>{msg.message}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <TextInput
                        style={{ flex: 1, borderColor: 'gray', borderWidth: 1, marginRight: 10 }}
                        onChangeText={this.handleTextChange}
                        value={this.state.text}
                        placeholder="Type your message here..."
                    />
                    <Button title="Send" onPress={this.sendMessage} />
                    <Button title="Leave" onPress={this.leaveChatroom} />
                </View>
            </SafeAreaView>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.currentChatroom ? (
                    this.renderChatroom()
                ) : (
                    <View style={styles.chatroomSelection}>
                        {this.renderChatroomButtons()}
                    </View>
                )}
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {}
});

export default Live;

