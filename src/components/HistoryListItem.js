import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Button,
  Body,
  Input,
  Container,
  Content,
  Header,
  Right,
  Left,
  Item,
  Label,
  Card,
  CardItem,
} from 'native-base';
import {
  Alert,
  FlatList,
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

export default class HistoryListItem extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }

  render() {
    return (
      <View style={listItemStyles.container}>
        <CardItem>
          <Text style={listItemStyles.date}>{this.props.item.date}</Text>
          <Text style={listItemStyles.type}>{this.props.item.type}</Text>
          <Text style={listItemStyles.product}>{this.props.item.product}</Text>
          <Text style={listItemStyles.items}>{this.props.item.items}</Text>
          <Text style={listItemStyles.price}>{this.props.item.price}</Text>
        </CardItem>
      </View>
    );
  }
}

const listItemStyles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
  },
  date: {
    flex: 0.24,
    fontSize: 16,
  },
  type: {
    flex: 0.19,
    fontSize: 16,
  },
  product: {
    flex: 0.32,
    fontSize: 16,
  },
  items: {
    flex: 0.15,
    fontSize: 16,
  },
  price: {
    flex: 0.15,
    fontSize: 16,
  },

  // backgroundColor: '#4796BD', blue
  // backgroundColor: '#E0E0E0', grey
});
