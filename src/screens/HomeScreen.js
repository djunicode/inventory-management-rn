import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function Home({navigation}) {
  async function Logout() {
    // console.log(await AsyncStorage.getItem('auth_key'));
    await AsyncStorage.removeItem('auth_key');
    // console.log(await AsyncStorage.getItem('auth_key'));
    navigation.navigate('LoginScreen');
  }
  return (
    <View>
      <Text>This is Home.js</Text>
      <Button
        title="Logout"
        onPress={() => {
          Logout();
        }}></Button>
    </View>
  );
}

export default Home;
