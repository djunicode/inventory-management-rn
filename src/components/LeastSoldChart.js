import React, { Component } from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit'
import {Dimensions} from 'react-native'

const screenWidth = Dimensions.get('window').width;

export default class LeastSoldChart extends Component {
    render() {
        return (
            <BarChart
          // style={graphStyle}
          data={{
            labels: ['Sauce', 'Chips', 'Bread', 'Juice', 'Cake'],
            datasets: [
              {
                data: [10, 10, 7, 6, 6],
              },
            ],
          }}
          chartConfig={{
            backgroundColor: '#daf0ee',
            backgroundGradientFrom: '#daf0ee',
            backgroundGradientTo: '#daf0ee',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(7, 7, 230, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              marginVertical: 8,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          width={screenWidth * 0.95}
          height={250}
          verticalLabelRotation={0}
         
        />
        )
    }
}
