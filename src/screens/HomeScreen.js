import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  StatusBar,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  Container,
  Button,
  H3,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title,
} from 'native-base';

const deviceHeight = Dimensions.get('window').height;

export default class HomeScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{backgroundColor: '#22252a'}}>
          <Body style={{marginLeft: 40}}>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>

        <Button
          style={styles.button}
          onPress={() => this.props.navigation.openDrawer()}>
          <Text>Lets Go!</Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#db6574', //red
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
  },
  container: {
    // backgroundColor: "#22252a", //black
  },
  text: {
    fontFamily: 'sans-serif-light',
    margin: 16,
    fontSize: 22,
    includeFontPadding: true,
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  paragraph: {
    fontFamily: 'sans-serif-light',
    margin: 16,
    fontSize: 16,
    // backgroundColor:'rgba(219, 101, 116, 0.7)',
    borderRadius: 10,
    padding: 20,
    includeFontPadding: true,
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  paragraphBlock: {
    fontFamily: 'sans-serif-light',
    margin: 16,
    fontSize: 16,
    backgroundColor: 'rgba(219, 101, 116, 0.9)',
    borderRadius: 10,
    padding: 20,
    includeFontPadding: true,
    marginVertical: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    // color: 'white',
  },
});
