import React, { Component } from 'react';
import {
  ImageBackground,
  View,
  StatusBar,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Container, Content, Text, Tab, Tabs, Header, Left, Right, Body, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import Buy from './Buy';
import Sell from './Sell';
import HeaderView from '../components/HeaderView';

const deviceHeight = Dimensions.get('window').height;

const MyHeader = ({ navigation }) => {
  return (
    <Header style={{ backgroundColor: '#4796BD', flexDirection: 'row' }}>
      <Left>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" color="white" size={35} />
        </TouchableOpacity>
      </Left>
      <Body>
        <Text style={{ fontSize: 21, color: '#fff' }}>Drawer</Text>
      </Body>
      <Right>
        <TouchableOpacity onPress={() => { }}>
          <Icon name="user" color="white" size={35} />
        </TouchableOpacity>
      </Right>
    </Header>
  );
}







const DrawerScreen2 = ({ navigation }) => {
  return (
    <Container>
      <HeaderView navigation={navigation} />

      <Tabs>
        <Tab activeTabStyle={{ backgroundColor: '#4796BD' }} tabStyle={{ backgroundColor: '#4796BD' }} heading="Buy">
          <Buy navigation={navigation} />
        </Tab>
        <Tab activeTabStyle={{ backgroundColor: '#4796BD' }} tabStyle={{ backgroundColor: '#4796BD' }} heading="Sell">
          <Sell />
        </Tab>
      </Tabs>

    </Container>
  );

}

export default DrawerScreen2;
