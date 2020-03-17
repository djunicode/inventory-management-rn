import React, {Component} from 'react';
import {
  Button,
  Body,
  Input,
  Container,
  Content,
  Header,
  Item,
  Tabs,
  Tab,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AddEmployee from './src/screens/AddEmployee';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/Logout';
import DrawerScreen1 from './src/screens/DrawerScreen1';
import DrawerScreen2 from './src/screens/DrawerScreen2';
import EmployeeListScreen from './src/screens/EmployeeListScreen'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App({navigation}) {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppStack.Navigator initialRouteName="Loginscreen">
        <AppStack.Screen
          name="Loginscreen"
          component={LoginScreen}
          options={{title: 'Inventory Management'}}
        />
        <AppStack.Screen
          name="Drawer"
          component={BurgerBtn}
          options={{
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="menu" color="white" size={35} />
                </TouchableOpacity>
              );
            },
            headerRight:() => {
              return (
                <TouchableOpacity onPress={() => {}}>
                  <Icon name="user" color="white" size={35} />
                </TouchableOpacity>
              );
            },
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

function BurgerBtn() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="Inventory"
        component={DrawerScreen1}
        options={{title: 'Inventory'}}
      />
      <Drawer.Screen
        name="EmployeeList"
        component={EmployeeListScreen}
        options={{title: 'Employees'}}
      />
      <Drawer.Screen
        name="Employee"
        component={AddEmployee}
        options={{title: '(temperory) Add Employee'}}
      />
      <Drawer.Screen
        name="Transactions"
        component={DrawerScreen2}
        options={{title: 'Transactions'}}
      />
    
    </Drawer.Navigator>
  );
}
export default App;
const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: '#F3F9FB',
    card: '#4796BD',
    text: '#F4F9FA',
    border: 'rgb(199, 199, 204)',
  },
};

// const LoginStack = createStackNavigator();
// const RegisterStack = createStackNavigator();
// function Login() {
//   return (
//     <LoginStack.Navigator headerMode='none'>
//       <LoginStack.Screen name="LoginScreen" component={LoginScreen} />
//       <LoginStack.Screen name="HomeScreen" component={HomeScreen} />
//     </LoginStack.Navigator>
//   );
// }

// function Register() {
//   return (
//     <RegisterStack.Navigator headerMode='none'>
//       <RegisterStack.Screen name="RegisterScreen" component={RegisterScreen} />
//       <RegisterStack.Screen name="HomeScreen" component={HomeScreen} />
//     </RegisterStack.Navigator>
//   );
// }
