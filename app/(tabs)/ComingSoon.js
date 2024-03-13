import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class ComingSoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatrooms: {},
      newChatroomName: '',
      newChatroomTime: '',
      isAddModalVisible: false,
      timers: {},
      endedChatrooms: [], 
    };
  }
  removeEndedChatroom = (chatroomName) => {
    this.setState(prevState => ({
      endedChatrooms: prevState.endedChatrooms.filter(name => name !== chatroomName),
    }));
  };



  addNewChatroom = () => {
    const { newChatroomName, chatrooms, newChatroomTime } = this.state;
    const timeInSeconds = parseInt(newChatroomTime, 10); // conv to int

    if (newChatroomName.trim() && !chatrooms[newChatroomName] && !isNaN(timeInSeconds) && timeInSeconds > 0) {
      const timerId = setInterval(() => this.updateTimer(newChatroomName), 1000);
      this.setState(prevState => ({
        chatrooms: {
          ...prevState.chatrooms,
          [newChatroomName]: [],
        },
        newChatroomName: '',
        newChatroomTime: '',
        isAddModalVisible: false,
        timers: {
          ...prevState.timers,
          [newChatroomName]: {
            timeLeft: timeInSeconds,
            timerId: timerId,
          }
        },
      }));
    } else {
      alert('Please enter a unique chatroom name and a valid time.');
    }
  };

  updateTimer = (chatroomName) => {
    this.setState(prevState => {
      let timeLeft = prevState.timers[chatroomName].timeLeft - 1;
      if (timeLeft <= 0) {
        clearInterval(prevState.timers[chatroomName].timerId);
        const newTimers = { ...prevState.timers };
        delete newTimers[chatroomName];
        const newChatrooms = { ...prevState.chatrooms };
        delete newChatrooms[chatroomName];

        return {
          chatrooms: newChatrooms,
          timers: newTimers,
          endedChatrooms: [...prevState.endedChatrooms, chatroomName],
        };
      } else {
        return {
          timers: {
            ...prevState.timers,
            [chatroomName]: {
              ...prevState.timers[chatroomName],
              timeLeft: timeLeft,
            },
          },
        };
      }
    });
  };

  componentWillUnmount() {
    Object.values(this.state.timers).forEach(timer => {
      clearInterval(timer.timerId);
    });
  }

  renderChatroomButtons() {
    const { chatrooms, timers } = this.state;
    return Object.keys(chatrooms).map((chatroom) => (
      <TouchableOpacity 
        key={chatroom} 
        style={styles.chatroomButton}
      >
        <Text style={styles.chatroomButtonText}>{chatroom}</Text>
        <Text>{timers[chatroom] ? timers[chatroom].timeLeft : 'Loading...'}</Text>
      </TouchableOpacity>
    ));
  }

  renderEndedChatroomBanners() {
    return this.state.endedChatrooms.map((chatroomName, index) => (
      <TouchableOpacity key={index} style={styles.bannerView} onPress={() => this.removeEndedChatroom(chatroomName)}>
        <Text style={styles.bannerText}>
          {`Create Live chatroom for ${chatroomName}`}
        </Text>
      </TouchableOpacity>
    ));
  }

  render() {
    const { isAddModalVisible } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#24292f'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddModalVisible}
          onRequestClose={() => {
            this.setState({ isAddModalVisible: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Chatroom Name"
                placeholderTextColor={'rgba(128,130,132,255)'}
                value={this.state.newChatroomName}
                onChangeText={(name) => this.setState({ newChatroomName: name })}
                style={styles.modalTextInput}
              />
              <TextInput
                placeholder="Time in Seconds"
                placeholderTextColor={'rgba(128,130,132,255)'}
                value={this.state.newChatroomTime}
                onChangeText={(time) => this.setState({ newChatroomTime: time })}
                keyboardType="numeric"
                style={styles.modalTextInput}
              />
              <TouchableOpacity
                onPress={this.addNewChatroom}
                style={{
                  backgroundColor:'#cf5906',
                  padding:20,
                  borderRadius:10,
                  marginBottom:30
                }}>
                <Text 
                  style={{
                    textAlign:'center',
                    fontWeight:'700',
                    fontSize:16,
                    color: '#000',
                  }}>
                  Add Chatroom
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.chatroomSelection}>
          <TouchableOpacity
            onPress={() => this.setState({ isAddModalVisible: true })}
            style={{
              backgroundColor:'#cf5906',
              padding:20,
              borderRadius:10,
              marginBottom:30
            }}>
              <Text 
                style={{
                    textAlign:'center',
                    fontWeight:'700',
                    fontSize:16,
                    color: '#000',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          <ScrollView>
            {this.renderChatroomButtons()}
          </ScrollView>
        </View>

        {this.renderEndedChatroomBanners()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  chatroomSelection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatroomButton: {
    width: 200,
    height: 100,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cf5906',
  },
  chatroomButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalView: {
    width: '80%', 
    backgroundColor: '#24292f',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextInput: {
    backgroundColor: "#666",
    borderRadius: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    padding: 10,
  },
  bannerView: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'yellow',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ComingSoon;
