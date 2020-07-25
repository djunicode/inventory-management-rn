import React from 'react';
import { StatusBar } from 'react-native';
import Icon_Feather from 'react-native-vector-icons/Feather';
import Icon_MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddEmployee from './src/screens/AddEmployee';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import DrawerScreen2 from './src/screens/TransactionsScreen';
import EmployeeListScreen from './src/screens/EmployeeListScreen';
import SplashScreen from './src/screens/SplashScreen';
//import ExpiryScreen from './src/screens/ExpiryScreen';
import CustomDrawer from './src/components/CustomDrawer'
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
  )
}

function BurgerBtn() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={
          ({ title: 'Home' },
            { drawerIcon: () => <Icon_MaterialIcons name="home" size={24} color="#4796BD" /> })
        }
      />

      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={
          ({ title: 'Inventory' },
            { drawerIcon: () => <Icon_Feather name="list" size={24} color="#4796BD" /> })
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
            { drawerIcon: () => <Icon_MaterialIcons name="person" size={24} color="#4796BD" /> })
        }
      />
      <Drawer.Screen
        name="Transactions"
        
        component={DrawerScreen2}
        options={
        
          ({ title: 'Transactions'},
          {labelStyle:{fontSize: 55,}},
          {
            drawerIcon: () => (
              <Icon_MaterialIcons name="attach-money" size={24} color="#4796BD"/>
            ),
          })
        }
      />
      {/* <Drawer.Screen
        name="Expiry "
        component={ExpiryScreen}
        options={
          ({ title: 'Expiry' },
            { drawerIcon: () => <Icon_MaterialIcons name="settings" size={24} /> })
        }
      /> */}
    </Drawer.Navigator>
  );
}
export default App;
const MyTheme = {
  dark: false,
  colors: {
    primary: '#5c5e61',
    background: '#F3F9FB',
    card: '#fff',
    text: '#000',
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
