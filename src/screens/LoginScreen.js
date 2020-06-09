import React, {Component, useState, useEffect} from 'react';
import {Body, Input, Container, Content, Item, Label, Icon, Header} from 'native-base';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// For Testing enter password : admin   email : admin@admin.com in text inputs
async function getLoginToken(email, password) {
  try {
    const response = await Axios.post(
      'http://chouhanaryan.pythonanywhere.com/auth/token/login/',
      {
        password: password,
        email: email,
      },
    );
    const token = await response.data;
    console.log(token.auth_token);
    return token.auth_token;
  } catch (error) {
    console.log(Object.keys(error), error.message);
    return -1; //Returning -1 for error 400
  }
}

const LoginScreen=({navigation})=> {
  const Login = async (email, password) => {
    const token = await getLoginToken(email, password);
    if (email !== '' && password !== '' && token !== -1) {
      //checking if the token is recieved and inputs arent empty
      try {
        await AsyncStorage.setItem('auth_key', token); //Storing token in local storage
      } catch (e) {
        console.log(e);
      }
      try {
        // console.log(token)
        const response = await Axios.get(
          'http://chouhanaryan.pythonanywhere.com/auth/users/me/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        const check = await response.data;
        try {
          await AsyncStorage.setItem('is_staff', check.is_staff.toString()); //Storing whether staff or not in local storage
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
      console.log(await AsyncStorage.getItem('is_staff'));
      navigation.navigate('Drawer');
    }
  };
  async function LoginCheck() {
    //checking if user has already logged in
    console.log(await AsyncStorage.getItem('auth_key'));
    if ((await AsyncStorage.getItem('auth_key')) !== null) {
      navigation.navigate('Drawer');
    } else {
      setFlag(true);
    }
  }
  LoginCheck();
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [flag, setFlag] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  return (
    <Container style={{backgroundColor: '#F3F9FB'}}>
     <Header style={{ backgroundColor: '#4796BD', flexDirection: 'row', alignItems: 'center' }}>	
        <Text style={{color: '#fff', fontSize: 20}}>Inventory Management</Text>	
      </Header>
      <Content>
        <Body>
          <Text style={styles.heading}>Login</Text>

          <Image
            style={{
              width: 274,
              height: 207,
              marginVertical: 40,
              marginRight: 10,
            }}
            source={require('../Images/Illustration.png')}
          />

          <Item floatingLabel style={styles.inputBox}>
         
            <Label style={styles.label}>Email ID</Label>
            
            <Input
              style={styles.inputArea}
              blurOnSubmit={true}
              onChangeText={value => {
                setUserEmail(value);
              }}
             
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Item>

          <Item floatingLabel style={styles.inputBox}>
         
            <Label style={styles.label}>Password</Label>
            <Input
              style={styles.inputArea}
              blurOnSubmit={true}
              onChangeText={value => {
                setUserPassword(value);
              }}
              name="password"
              secureTextEntry
            />
          </Item>

          <TouchableOpacity
            rounded
            style={styles.loginButton}
            onPress={() => {
              Login(email, password);
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Body>
      </Content>
    </Container>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  loginButton: {
    width: 280,
    height: 40,
    backgroundColor: '#4796BD',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
    alignContent: 'flex-start',
    textAlign: 'center',
  },
  heading: {
    fontSize: 30,
    color: '#122E40',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 22,
    color: '#122E40',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
  },
  inputBox: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
  },

  label: {
    paddingLeft: 10,
   alignItems: 'center',
   justifyContent: 'center',
   fontSize:15,
    color: '#828282',
  },
  inputArea: {
    paddingLeft: 20,
  },
});
