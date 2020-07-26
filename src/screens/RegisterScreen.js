import React, {Component, useState, useEffect} from 'react';
import {
  Body,
  Input,
  Container,
  Content,
  Item,
  Label,
  Icon,
  Header,
} from 'native-base';
import HeaderView from '../components/HeaderView';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert,
  View,
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const RegisterScreen = ({navigation}) => {
  return (
    <Container style={{backgroundColor: '#F3F9FB'}}>
       <Header style={{ backgroundColor: '#4796BD', flexDirection: 'row', alignItems: 'center' }} androidStatusBarColor="#247095">
        <Text style={{ color: '#fff', fontSize: 20 }}>Register</Text>
      </Header>
      <Content>
        <Body>
          <Text style={styles.heading}>Register</Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 25,
              color: '#122E40',
              marginLeft: 28,
              marginTop: 25,
              marginBottom: 10,
            }}>
            Account
          </Text>

          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Full Name</Label>

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
            <Label style={styles.label}>Email-id</Label>

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
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Confirm Password</Label>

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
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 25,
              color: '#122E40',

              marginLeft: 28,

              marginTop: 25,
              marginBottom: 10,
              marginBottom: 10,
            }}>
            Shop Details
          </Text>
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Name</Label>

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
            <Label style={styles.label}>Address</Label>

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
          <TouchableOpacity
            rounded
            style={styles.loginButton}
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </Body>
      </Content>
    </Container>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  newUser: {
    fontSize: 18,
    color: '#9ca2ad',

    marginTop: 25,
    marginBottom: 10,
    marginBottom: 10,
  },
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
    fontSize: 15,
    color: '#828282',
  },
  inputArea: {
    paddingLeft: 20,
  },
});
