import React, {Component} from 'react';
import {
  ImageBackground,
  View,
  StatusBar,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import {Container, Button, H3, Text} from 'native-base';

const deviceHeight = Dimensions.get('window').height;

export default class DrawerScreen2 extends Component {
  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" androidStatusBarColor="#000000" />

        <View style={styles.container}>
          <H3 style={styles.text}>Transactions</H3>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: 'black',
  },
});
