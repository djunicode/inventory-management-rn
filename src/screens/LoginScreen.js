import React, {Component, useState} from 'react';
import {
  Button,
  Body,
  Input,
  Container,
  Content,
  Header,
  Item,
  Label,
} from 'native-base';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// For Testing enter password : admin   email : admin@admin.com in text inputs
async function getLoginToken(email, password) {
  try {
    const response = await Axios.post(
      'http://chouhanaryan.pythonanywhere.com/auth/token/login',
      {
        password: password,
        email: email,
      },
    );
    const token = await response.data;
    // console.log(token.auth_token);
    return token.auth_token;
  } catch (error) {
    console.log(Object.keys(error), error.message);
    return -1; //Returning -1 for error 400
  }
}

async function Login(navigation, email, password) {
  const token = await getLoginToken(email, password);
  if (email !== '' && password !== '' && token !== -1) {
    //checking if the token is recieved and inputs arent empty
    try {
      await AsyncStorage.setItem('auth_key', token); //Storing token in local storage
    } catch (e) {
      console.log(e);
    }

    navigation.navigate('HomeScreen');
  }
}

function LoginScreen({navigation}) {
  async function LoginCheck() {
    //checking if user has already logged in
    console.log(await AsyncStorage.getItem('auth_key'));
    if ((await AsyncStorage.getItem('auth_key')) !== null) {
      navigation.navigate('HomeScreen');
    }
  }
  LoginCheck();
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  const handlechange_email = value => {
    setUserEmail(value);
  };
  const handlechange_password = value => {
    setUserPassword(value);
  };

  return (
    <Container style={{backgroundColor: '#4fc3fa'}}>
      <Content>
        <ScrollView>
          <Body>
            <Text style={styles.heading}>Login</Text>

            <Text style={{padding: 80, borderWidth: 1, borderColor: '#000'}}>
              [Image will come here]
            </Text>

            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Email ID</Label>
              <Input
                onChangeText={value => {
                  handlechange_email(value);
                }}
                name="email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Item>

            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Password</Label>
              <Input
                onChangeText={value => {
                  handlechange_password(value);
                }}
                name="password"
                secureTextEntry
              />
            </Item>

            <TouchableOpacity
              rounded
              style={styles.loginButton}
              onPress={() => {
                Login(navigation, email, password);
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <View style={{marginRight: 4}}>
                <Text>New User?</Text>
              </View>
              <View style={{marginLeft: 4}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.register}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Body>
        </ScrollView>
      </Content>
    </Container>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  loginButton: {
    width: 280,
    height: 40,
    backgroundColor: '#66f',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
    alignContent: 'flex-start',
    textAlign: 'center',
  },
  heading: {
    fontSize: 25,
    color: '#119',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 22,
    color: '#119',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
  },
  inputBox: {
    backgroundColor: '#cacaca',
    borderRadius: 4,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    height: 55,
  },
  register: {
    color: '#119',
    textDecorationLine: 'underline',
  },
  label: {
    marginTop: 5,
    marginBottom: 10,
  },
});
