import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderView from '../components/HeaderView';
import Notification from '../components/Notification';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsScreen = ({navigation}) => {
  async function Logout() {

    const auth_key = await AsyncStorage.getItem('auth_key')
    
    await fetch('http://chouhanaryan.pythonanywhere.com/auth/token/logout/', {
      method: 'POST',
      headers: {Authorization: `Token ${auth_key}`}
    })
    .then((res) => {
      console.log(res.json())
      return res.json()
    })
    .catch((err) => {
      console.log(err)
    })


    // console.log(await AsyncStorage.getItem('auth_key'));
    await AsyncStorage.removeItem('auth_key'); //Removing the token from local storage while logging out
    // console.log(await AsyncStorage.getItem('auth_key'));

    navigation.navigate('LoginScreen');
  }
  const Notify = () => {
    Notification();
  };
  return (
    <View >
      <HeaderView navigation={navigation} title={'Settings'} />
      <Text>Logout from here</Text>
      <Button
        
        title="Logout"
        onPress={() => {
          Logout();
        }}/>

      <TouchableOpacity
        style={{alignSelf:'center',width:150,height:40,margin:20,backgroundColor:'#26004d',alignItems:'center',justifyContent:'center'}}
        onPress={() => {
          Notify();
        }}><Text style={{color:'white',fontWeight:'bold'}}>NOTIFY</Text></TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
