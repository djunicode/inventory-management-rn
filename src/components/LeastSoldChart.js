import React, {Component} from 'react'
import { Dimensions, View, Text, Image, ActivityIndicator, AsyncStorage, StyleSheet } from "react-native";
import { LineChart } from 'react-native-chart-kit'
const screenWidth = Dimensions.get("window").width;
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

const blueImage = require('../Images/file_blue.png')

const chartStyle = {
  marginVertical: 16,
  borderRadius: 2,
  marginHorizontal: 16,
}

const myChartConfig = {
  backgroundColor: '#daf0ee',
  backgroundGradientFrom: '#daf0ee',
  backgroundGradientTo: '#daf0ee',
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(7, 7, 230, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
  },
  propsForDots: {
    r: "5",
    strokeWidth: "0",
    stroke: "#ffa726"
  }
}




export default class LeastSoldChart extends Component {
  state = {
    showPopup: false,
    selected_noOfItems: 0,
    selected_product: 'product  info unavailable',
    DATA: {
      labels: [],
      datasets: [{
        products: [],
        data: [],
      }]
    },
    chartReady: false,
  }

  // popup controller functions
  handleOpen = () => {
    this.setState({
      showPopup: true,
    })
  }

  handleClose = () => {
    this.setState({ showPopup: false })
  }

  itemClicked = (value, dataset) => {
    const index = dataset.data.indexOf(value)
    this.setState({
      selected_index: index,
      selected_product: dataset.products[index],
      selected_noOfItems: value,
    })
    this.handleOpen()
  }

  
  componentDidMount = async () => {
    try {
      const auth_key = await AsyncStorage.getItem('auth_key');
      const response = await fetch('http://chouhanaryan.pythonanywhere.com/api/transactions/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${auth_key}`,
        },
      })

      const responseJson = await response.json()

      // create dictiorary for items and sales
      var dict = {}
      for (let i = 0; i < responseJson.length; i++) {
        if (responseJson[i].in_or_out === "Out") {
          dict[responseJson[i].name] = responseJson[i].quantity
        }
      }

      // Create items array
      var items = Object.keys(dict).map(function (key) {
        return [key, dict[key]];
      });

      // Sort the array based on the second element
      items.sort(function (first, second) {
        return first[1] - second[1];
      });

      // make an array of top 5
      var tempProductArray = []
      var tempQuantityArray = []
      var limit = 5

      // if data has less than 5 items
      if (items.length < 5) {
        limit = items.length
      }
      for (let j = 0; j < limit; j++) {
        tempProductArray.push(items[j][0])
        tempQuantityArray.push(items[j][1])
      }

      var tempDATA = {
        labels: tempProductArray,
        datasets: [
          {
            products: tempProductArray,
            data: tempQuantityArray
          }
        ]
      }

      // store to state
      this.setState({
        DATA: tempDATA,
        chartReady: true,
      })
    } catch (err) {
      console.log('error', err)
    }
  }



  render() {
    return (
      <View>
        {
          this.state.chartReady ? 
          <LineChart
          data={this.state.DATA}
          width={Dimensions.get("screen").width * 0.92} // from react-native
          height={250}
          fromZero={true}
          chartConfig={myChartConfig}
          style={chartStyle}
          onDataPointClick={({ value, dataset, getColor }) => this.itemClicked(value, dataset)}
        />
        : 
        <ActivityIndicator size="large" color="#000" />
        }
        
        <SCLAlert
          theme="info"
          show={this.state.showPopup}
          title="Product Info"
          onRequestClose={this.handleClose}
          subtitle=""
          subtitleContainerStyle={{ height: 0 }}
          headerIconComponent={<Image source={blueImage} style={styles.popupHeaderIcon} />}
        >
          <Text style={styles.popupText}>
                    Product :  {this.state.selected_product}{'\n'}
                    Items Sold :  {this.state.selected_noOfItems}{'\n'}
          </Text>
          <SCLAlertButton theme="danger" onPress={this.handleClose} containerStyle={{ backgroundColor: '#4796BD' }}>OK</SCLAlertButton>
        </SCLAlert>
      </View>

      // #4796BD blue
    )
  }
}

const styles = StyleSheet.create({
  popupText: {
    textAlign: 'center', fontSize: 20, paddingBottom: 20, lineHeight: 30,
  },
  popupHeaderIcon: {
    height: 100, width: 100, borderRadius: 100
  }
})