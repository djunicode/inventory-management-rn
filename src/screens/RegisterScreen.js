
import React, { Component } from 'react';
import { Button, Body, Input, Container, Content, Header, Item, Label } from 'native-base';
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

function RegisterScreen({ navigation }) {


  return (
    <Container style={{ backgroundColor: '#4fc3fa' }}>
      <Content>
        <ScrollView>
          <Body>
            <Text style={styles.heading}>Register</Text>
            <Text style={styles.subHeading}>Account</Text>

            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Full Name</Label>
              <Input />
            </Item>
            
            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Email ID</Label>
              <Input keyboardType='email-address' autoCapitalize='none' />
            </Item>
            
            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Password</Label>
              <Input secureTextEntry />
            </Item>
            
            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Confirm Password</Label>
              <Input secureTextEntry />
            </Item>
            
            <Text style={styles.subHeading}>Shop Details</Text>
            
            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Name</Label>
              <Input />
            </Item>
            
            <Item floatingLabel style={styles.inputBox}>
              <Label style={styles.label}>Address</Label>
              <Input />
            </Item>
            
            <TouchableOpacity rounded style={styles.regButton} onPress={() => { navigation.navigate('HomeScreen') }} >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <View style={{ marginRight: 4, }}><Text>Already a User?</Text></View>
              <View style={{ marginLeft: 4, marginBottom: 20, }}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.register}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          
          </Body>
        </ScrollView>
      </Content>
    </Container>
  );

}


export default RegisterScreen;

const styles = StyleSheet.create({

  regButton: {
    width: 280,
    height: 40,
    backgroundColor: '#66f',
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
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
    marginTop: 6,
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