import React, {Component} from 'react';
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

export default class AddEmployee extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container style={{backgroundColor: '#F3F9FB'}}>
        <Content>
          <ScrollView>
            <Body>
              <Text style={styles.heading}>Account</Text>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>First Name</Label>
                <Input style={styles.inputArea} />
              </Item>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Last Name</Label>
                <Input style={styles.inputArea} />
              </Item>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Email ID</Label>
                <Input style={styles.inputArea} keyboardType="email-address" autoCapitalize="none" />
              </Item>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Password</Label>
                <Input style={styles.inputArea} secureTextEntry />
              </Item>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Confirm Password</Label>
                <Input style={styles.inputArea} secureTextEntry />
              </Item>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Gender</Label>
                <Input style={styles.inputArea} />
              </Item>

              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Age</Label>
                <Input style={styles.inputArea} />
              </Item>

              <TouchableOpacity
                rounded
                style={styles.regButton}
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </Body>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  regButton: {
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
    alignSelf: 'flex-start',
    marginLeft: 27,
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
    paddingLeft: 30,
    color: '#828282',
    fontSize:15,
  },
  inputArea: {
    paddingLeft: 20,
  },
});
