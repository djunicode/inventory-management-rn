
import React, { Component } from 'react';
import { Button, Body, Input, Container, Content, Header, Item, Label, } from 'native-base';
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

function LoginScreen({ navigation }) {

  return (
    <Container style={{ backgroundColor: '#4fc3fa' }}>
      <Content>
        <ScrollView>

          <Body>
            <Text style={styles.heading}>Login</Text>
            
            <Text style={{ padding: 80, borderWidth: 1, borderColor: '#000' }}>[Image will come here]</Text>
            
            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Email ID</Label>
              <Input keyboardType='email-address' autoCapitalize='none' />
            </Item>
            
            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Password</Label>
              <Input secureTextEntry />
            </Item>
            
            <TouchableOpacity rounded style={styles.loginButton} onPress={() => { navigation.navigate('HomeScreen') }} >
              <Text style={styles.buttonText} >Login</Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ marginRight: 4, }}><Text>New User?</Text></View>
              <View style={{ marginLeft: 4, }}>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
    marginBottom: 10
  }

})