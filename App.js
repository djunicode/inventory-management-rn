
import React, { Component } from 'react';
import { Button, Body, Input, Container, Content, Header, Item, Tabs, Tab } from 'native-base';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const LoginStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const AppStack = createStackNavigator();


function Login() {
  return (
    <LoginStack.Navigator headerMode='none'>
      <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
      <LoginStack.Screen name="HomeScreen" component={HomeScreen} />
    </LoginStack.Navigator>
  );
}

function Register() {
  return (
    <RegisterStack.Navigator headerMode='none'>
      <RegisterStack.Screen name="RegisterScreen" component={RegisterScreen} />
      <RegisterStack.Screen name="HomeScreen" component={HomeScreen} />
    </RegisterStack.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode='none' initialRouteName='Login'>
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Register" component={Register} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}


export default App;

