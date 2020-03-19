

import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderView from '../components/HeaderView';

const Home=({navigation}) =>{
  async function Logout() {
    // console.log(await AsyncStorage.getItem('auth_key'));
    await AsyncStorage.removeItem('auth_key'); //Removing the token from local storage while logging out
    // console.log(await AsyncStorage.getItem('auth_key'));
    navigation.navigate('LoginScreen');
  }
  return (
    <View>
      <HeaderView navigation={navigation} title={"Home"}/>
      <Text>This is Home.js</Text>
     <Text>we will Make charts here</Text>
    </View>
  );
}

export default Home;
