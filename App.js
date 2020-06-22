import React from 'react';
import { StatusBar } from 'react-native';
import Icon_Feather from 'react-native-vector-icons/Feather';
import Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddEmployee from './src/screens/AddEmployee';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import InventoryListScreen from './src/screens/InventoryListScreen';
import DrawerScreen2 from './src/screens/TransactionsScreen';
import EmployeeListScreen from './src/screens/EmployeeListScreen';
import SplashScreen from './src/screens/SplashScreen';
import Settings from './src/screens/SettingsScreen';
import ProfilePage from './src/screens/ProfilePage'
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const EmployeeStack = createStackNavigator();

const App = ({ navigation }) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AppStack.Navigator headerMode={null} initialRouteName="SplashScreen">
        <AppStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: 'Inventory Management', headerTitleAlign: 'center' }}
        />
        <AppStack.Screen
          name="SplashScreen"
          component={SplashScreen}
        // options={{ title: 'Inventory Management', headerTitleAlign: 'center' }}
        />
        <AppStack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
        // options={{ title: 'Inventory Management', headerTitleAlign: 'center' }}
        />
        <AppStack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{ title: 'Employee', headerTitleAlign: 'center' }}
        />
        <AppStack.Screen
          name="Drawer"
          component={BurgerBtn}
          options={{
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => { }}>
                  <Icon_Feather name="menu" color="white" size={35} />
                </TouchableOpacity>
              );
            },
            headerRight: () => {
              return (
                <TouchableOpacity onPress={() => { }}>
                  <Icon_Feather name="user" color="white" size={35} />
                </TouchableOpacity>
              );
            },
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

function StackFn() {
  return (
    <EmployeeStack.Navigator initialRouteName="EmployeeList" headerMode="none">
      <EmployeeStack.Screen
        name="EmployeeList"
        component={EmployeeListScreen}
      />
      <EmployeeStack.Screen name="AddEmployee" component={AddEmployee} />
    </EmployeeStack.Navigator>
  );
}

function BurgerBtn() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={
          ({ title: 'Home' },
            { drawerIcon: () => <Icon_MaterialIcons name="home" size={24} /> })
        }
      />

      <Drawer.Screen
        name="Inventory"
        component={InventoryListScreen}
        options={
          ({ title: 'Inventory' },
            { drawerIcon: () => <Icon_Feather name="list" size={24} /> })
        }
      />
      {/* <Drawer.Screen
        name="EmployeeAdd"
        component={AddEmployee}
        options={{title: 'Employees add'}}
      />
      <Drawer.Screen
        name="EmployeeList"
        component={EmployeeListScreen}
        options={{title: 'Employees list '}}
      /> */}
      <Drawer.Screen
        name="Employee"
        component={StackFn}
        options={
          ({ title: 'Employee' },
            { drawerIcon: () => <Icon_MaterialIcons name="person" size={24} /> })
        }
      />
      <Drawer.Screen
        name="Transactions"
        component={DrawerScreen2}
        options={
          ({ title: 'Transactions' },
          {
            drawerIcon: () => (
              <Icon_MaterialIcons name="attach-money" size={24} />
            ),
          })
        }
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={
          ({ title: 'Settings' },
            { drawerIcon: () => <Icon_MaterialIcons name="settings" size={24} /> })
        }
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
