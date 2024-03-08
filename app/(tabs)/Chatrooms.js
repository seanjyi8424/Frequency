import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Modal, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Live from './Live';
import ComingSoon from './ComingSoon';

const Tab = createMaterialTopTabNavigator();

export default function ChatRooms() {
  const [chatrooms, setChatrooms] = useState([
    { name: "Live", component: Live },
    { name: "ComingSoon", component: ComingSoon },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newChatroomName, setNewChatroomName] = useState('');
  const [newChatroomTime, setNewChatroomTime] = useState('');

  const addChatroom = () => {
    setChatrooms([...chatrooms, { name: newChatroomName, component: Live, time: newChatroomTime }]);
    setModalVisible(false);
    setNewChatroomName('');
    setNewChatroomTime('');
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ marginTop: 50, marginHorizontal: 20, backgroundColor: "white", padding: 35, alignItems: "center", elevation: 5 }}>
          <TextInput placeholder="Chatroom Name" value={newChatroomName} onChangeText={setNewChatroomName} style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 20 }} />
          <TextInput placeholder="Time/Date" value={newChatroomTime} onChangeText={setNewChatroomTime} style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '100%', marginBottom: 20 }} />
          <Button title="Add Chatroom" onPress={addChatroom} />
        </View>
      </Modal>

      <Tab.Navigator>
        {chatrooms.map((chatroom, index) => (
          <Tab.Screen key={index} name={chatroom.name} component={chatroom.component} />
        ))}
      </Tab.Navigator>

      <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10, backgroundColor: 'white', padding: 10, borderRadius: 20 }} onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={20} color="black" />
      </TouchableOpacity>
    </>
  );
}
