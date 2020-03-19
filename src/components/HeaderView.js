import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Header, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';


const HeaderView = ({ navigation }) => {
  return (
    <Header style={{ backgroundColor: '#4796BD', flexDirection: 'row' }}>
      <Left>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" color="white" size={35} />
        </TouchableOpacity>
      </Left>
      <Body>
        <Text style={{fontSize: 21, color: '#fff'}}>Drawer</Text>
      </Body>
      <Right>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="user" color="white" size={35} />
        </TouchableOpacity>
      </Right>
    </Header>
  );
}

export default HeaderView;
