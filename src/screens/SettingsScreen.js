import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderView from '../components/HeaderView';
import Notification from '../components/Notification';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsScreen = ({navigation}) => {
 
  const Notify = () => {
    Notification();
  };
  return (
    <View >
      <HeaderView navigation={navigation} title={'Settings'} />
      <TouchableOpacity
        style={{alignSelf:'center',width:150,height:40,margin:20,backgroundColor:'#26004d',alignItems:'center',justifyContent:'center'}}
        onPress={() => {
          Notify();
        }}><Text style={{color:'white',fontWeight:'bold'}}>NOTIFY</Text></TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
