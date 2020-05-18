import React, {Component} from 'react';
import {CardItem} from 'native-base';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

export default class HistoryListItem extends React.Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  parseDate = date => {
    //console.log(date)=>2020-05-07T13:19:40.442654Z
    const newDate = new Date(date).toDateString().slice(4);//=>May 07 2020
    const forMonthAndDate = newDate.split(' ');//convert to array and take only May 7
    const finalDate = forMonthAndDate[0] + ' \n ' + forMonthAndDate[1];//join May and 7
    return finalDate;
  };

  parsePrice = transactions => {//accumulator mei store karo from left to right
    return transactions.reduce((acc, obj) => acc + obj.rate * obj.quantity,0);
  };
 //row=this.props.item could have done this rather than writing this.props.item evrywhere
  render() {
    return (
      <View style={listItemStyles.container}>
        <CardItem>
          <Text style={listItemStyles.date}>
            {this.parseDate(this.props.item.date_time)}
          </Text>
          <Text style={listItemStyles.type}>
            {this.props.item.in_or_out == 'In' ? 'Buy' : 'Sell'}
          </Text>
          <Text style={listItemStyles.product}>
            {this.props.item.transaction.map((val, index) =>
              index === this.props.item.transaction.length - 1
                ? val.name
                : `${val.name}, `,
            )}
          </Text>
          <Text style={listItemStyles.items}>
            {this.props.item.transaction.map((val, index) =>
              index === this.props.item.transaction.length - 1
                ? val.quantity
                : `${val.quantity}, `,
            )}
          </Text>
          <Text style={listItemStyles.price}>
            {this.parsePrice(this.props.item.transaction)}
          </Text>
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
