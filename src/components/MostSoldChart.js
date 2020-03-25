import React, {Component} from 'react'
import { Dimensions, View, Text, Image } from "react-native";
import { LineChart } from 'react-native-chart-kit'
const screenWidth = Dimensions.get("window").width;
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

const blueImage = require('../Images/file_blue.png')

const productArray = ["Sanitiser", "Soap", "Tissues", "Beer", "Noodles",]
const DATA = {
  labels: productArray,
  datasets: [
    {
      products: productArray,
      sp: [100, 40, 250, 200, 30],
      data: [ 140, 125, 113, 97, 84, ]
    }
  ]
}
const chartStyle = {
  marginVertical: 16,
  borderRadius: 2,
  marginHorizontal: 16,
}

const myChartConfig = {
  backgroundColor: '#daf0ee',
  backgroundGradientFrom: '#daf0ee',
  backgroundGradientTo: '#daf0ee',
  backgroundGradientToOpacity: 0.5,

  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(7, 7, 230, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    // borderRadius: 16
  },
  propsForDots: {
    r: "5",
    strokeWidth: "0",
    stroke: "#ffa726"
  }
}



export default class MostSoldChart extends Component {
  state = {
    showPopup: false,
    selected_noOfItems: 0,
    selected_product: 'product  info unavailable',
    selected_avgSP: 0
  }
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
    // console.warn(index)
    this.setState({
      selected_index: index,
      selected_product: dataset.products[index],
      selected_noOfItems: value,
      selected_avgSP  : dataset.sp[index]
    })
    this.handleOpen()

  }
  render() {
    return (
      <View>
        <LineChart
          data={DATA}
          width={Dimensions.get("screen").width * 0.92} // from react-native
          height={250}
          fromZero={true}
          chartConfig={myChartConfig}
          style={chartStyle}
          onDataPointClick={({ value, dataset, getColor }) => this.itemClicked(value, dataset)}
        />
        <SCLAlert
          theme="info"
          show={this.state.showPopup}
          title="Product Info"
          onRequestClose={this.handleClose}
          subtitle=""
          subtitleContainerStyle={{ height: 0 }}
          headerIconComponent={<Image source={blueImage} style={{ height: 100, width: 100, borderRadius: 100 }} />}
        >
          <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 20, lineHeight: 30, }}>
                    Product :  {this.state.selected_product}{'\n'}
                    Items Sold :  {this.state.selected_noOfItems}{'\n'}
                    Average Selling Price: {this.state.selected_avgSP}</Text>
          <SCLAlertButton theme="danger" onPress={this.handleClose} containerStyle={{ backgroundColor: '#4796BD' }}>OK</SCLAlertButton>
        </SCLAlert>
      </View>

      // #4796BD blue
    )
  }
}