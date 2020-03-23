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

export default class MostSoldChart extends Component {
    render() {
        return (
            <BarChart
          // style={graphStyle}
          data={{
            labels: ['Sanitizer', 'Soaps', 'Napkins', 'Handwash', 'Cake'],
            datasets: [
              {
                data: [104, 85, 77, 64, 61],
              },
            ],
          }}
          chartConfig={{
            backgroundColor: '#daf0ee',
            backgroundGradientFrom: '#daf0ee',
            backgroundGradientTo: '#daf0ee',
            decimalPlaces: 0, // optional, defaults to 2dp
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
