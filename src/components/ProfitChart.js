import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, processColor} from 'react-native';
import {LineChart} from 'react-native-charts-wrapper';
import AsyncStorage from '@react-native-community/async-storage';

const Functional = () => {
  const [min_Vis, setMin_Vis] = useState(0);
  const [max_vis, setMax_vis] = useState(10);

  const get_month_name_from_data = data_month_string => {
    const month_name = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const year = data_month_string.substr(2, 2);
    const month = data_month_string.substr(5, 2);
    const index = parseInt(month) - 1;
    const display_string = month_name[index] + '/' + year;
    return display_string;
  };

  const getRandomColor = () => {
    let color = '#0000ff';
    return color;
  };

  let simple_data = {
    'Total profit': [
      {month: 'Jan', val: 3},
      {month: 'Feb', val: 2},
      {month: 'Mar', val: 6},
      {month: 'Apr', val: 9},
      {month: 'May', val: 5},
      {month: 'Jun', val: 8},
    ],
  };

  let complex_data = {
    'Total profit': [
      {month: 'Jan1', val: 3},
      {month: 'Jan2', val: 4},
      {month: 'Jan3', val: 1},
      {month: 'Jan4', val: 2},
      {month: 'Feb1', val: 5},
      {month: 'Feb2', val: 1},
      {month: 'Feb3', val: 6},
      {month: 'Feb4', val: 3},
      {month: 'Mar1', val: 4},
      {month: 'Mar2', val: 7},
      {month: 'Mar3', val: 3},
      {month: 'Mar4', val: 9},
      {month: 'Apr1', val: 10},
      {month: 'Apr2', val: 3},
      {month: 'Apr3', val: 6},
      {month: 'Apr4', val: 6},
      {month: 'May1', val: 3},
      {month: 'May2', val: 1},
      {month: 'May3', val: 8},
      {month: 'May4', val: 4},
      {month: 'Jun1', val: 10},
      {month: 'Jun2', val: 4},
      {month: 'Jun3', val: 3},
      {month: 'Jun4', val: 8},
    ],
  };

  const [finalData, setFinalData] = useState([]);

  const get_data = async () => {
    const auth_key = await AsyncStorage.getItem('auth_key');
    fetch('http://chouhanaryan.pythonanywhere.com/api/profit/', {
      headers: {Authorization: `Token ${auth_key}`},
    })
      .then(data => {
        // this temp variable is a dummy data object which is being used because it has more months in its data
        const total = temp;

        /* uncomment this below line to display data from endpoint in the graph and comment the above line */
        // const total = data;

        const my_data = Object.keys(total).map(key => {
          return {month: key, value: total[key]};
        });
        setFinalData(my_data);
        setMax_vis(my_data.length);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    get_data();
  }, []);

  let dummy_time = [];

  for (let i = 0; i < finalData.length; i++) {
    // console.log(i)
    if (finalData[i].month != 'Total') {
      const month_name = get_month_name_from_data(finalData[i].month);
      dummy_time.push(month_name);
    }
  }

  let time = dummy_time;
  let datasetObject;
  let dataSetsValue = [];
  let dataStyle = {};
  let legendStyle = {};
  let xAxisStyle = {};
  let valueLegend = [];

  legendStyle = {
    enabled: true,
    textColor: processColor('blue'),
    textSize: 12,
    position: 'BELOW_CHART_RIGHT',
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    formToTextSpace: 5,
    wordWrapEnabled: true,
    maxSizePercent: 0.5,
  };

  dataStyle = {
    dataSets: dataSetsValue,
  };
  xAxisStyle = {
    valueFormatter: time,
    axisMinimum: min_Vis,
    axisMaximum: max_vis,
    granularity: 1,
  };
  const markers = {
    enabled: true,
    digits: 2,
    backgroundTint: processColor('teal'),
    markerColor: processColor('#F0C0FF8C'),
    textColor: processColor('white'),
  };

  for (let i = 0; i < finalData.length; i++) {
    if (finalData[i].month != 'Total')
      valueLegend.push({y: finalData[i].value.Total.earned});
  }

  datasetObject = {
    values: valueLegend,
    label: 'Total profit',
    config: {
      lineWidth: 1,
      drawCubicIntensity: 0.4,
      circleRadius: 3,
      drawHighlightIndicators: false,
      color: processColor(getRandomColor()),
      drawFilled: true,
      fillColor: processColor(getRandomColor()),
      fillAlpha: 40,
      circleColor: processColor(getRandomColor()),
      drawValues: true,
    },
  };
  dataSetsValue.push(datasetObject);

  const renderLine = () => {
    return (
      <LineChart
        style={styles.bar}
        visibleRange={{
          x: {min: 0, max: 10},
        }}
        // onChange={event => {
        //   if (event.nativeEvent.scaleX > 2.2) {
        //     console.log('scale greater')
        //     setMax_vis(24);
        //     setFinal_set(complex_data);
        //   } else {
        //     console.log('scale smaller')
        //     setMax_vis(6);
        //     setFinal_set(simple_data);
        //   }
        // }}
        autoScaleMinMaxEnabled={false}
        animation={{
          durationX: 300,
        }}
        data={dataStyle}
        chartDescription={{text: ''}}
        legend={legendStyle}
        marker={markers}
        xAxis={xAxisStyle}
        drawGridBackground={false}
        drawValues={false}
        dragDecelerationFrictionCoef={0.95}
        dragEnabled
        borderColor={processColor('teal')}
        borderWidth={1}
        drawBorders={true}
      />
    );
  };

  return renderLine();
};

export default Functional;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bar: {
    marginTop: 10,
    height: (Dimensions.get('window').height * 2) / 5,
    width: Dimensions.get('window').width,
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// dummy data
const temp = {
  Total: {
    Total: {
      earned: 200.0,
      sold: 10,
      spent: 10000.0,
      bought: 210,
    },
    Munch: {
      earned: 50.0,
      spent: 200.0,
      sold: 5,
      bought: 20,
    },
    Kitkat: {
      earned: 300.0,
      spent: 100.0,
      sold: 0,
      bought: 10,
    },
    Lays: {
      earned: 150.0,
      spent: 600.0,
      sold: 5,
      bought: 40,
    },
    Chips: {
      earned: 200.0,
      spent: 400.0,
      sold: 0,
      bought: 20,
    },
    Milk: {
      earned: 900.0,
      spent: 700.0,
      sold: 0,
      bought: 120,
    },
    Bag: {
      earned: 1500.0,
      spent: 700.0,
      sold: 0,
      bought: 120,
    },
    Chocolate: {
      earned: 300.0,
      spent: 150.0,
      sold: 0,
      bought: 120,
    },
    Water: {
      earned: 200.0,
      spent: 100.0,
      sold: 0,
      bought: 120,
    },
    Bread: {
      earned: 1000.0,
      spent: 800.0,
      sold: 0,
      bought: 120,
    },
  },
  '2020-01': {
    Total: {
      earned: 290.0,
      sold: 10,
      spent: 380.0,
      bought: 210,
    },
  },
  '2020-02': {
    Total: {
      earned: 310.0,
      sold: 10,
      spent: 230.0,
      bought: 210,
    },
  },
  '2020-03': {
    Total: {
      earned: 340.0,
      sold: 10,
      spent: 250.0,
      bought: 210,
    },
  },
  '2020-04': {
    Total: {
      earned: 320.0,
      sold: 10,
      spent: 280.0,
      bought: 210,
    },
  },

  '2020-05': {
    Total: {
      earned: 300.0,
      sold: 10,
      spent: 300.0,
      bought: 210,
    },
  },
  '2020-06': {
    Total: {
      earned: 200.0,
      sold: 10,
      spent: 100.0,
      bought: 210,
    },
  },
  '2020-07': {
    Total: {
      earned: 355.0,
      sold: 10,
      spent: 265.0,
      bought: 210,
    },
  },
  '2020-08': {
    Total: {
      earned: 370.0,
      sold: 10,
      spent: 300.0,
      bought: 210,
    },
  },
  '2020-09': {
    Total: {
      earned: 342.0,
      sold: 10,
      spent: 296.0,
      bought: 210,
    },
  },
  '2020-10': {
    Total: {
      earned: 321.0,
      sold: 10,
      spent: 257.0,
      bought: 210,
    },
  },
  '2020-11': {
    Total: {
      earned: 361.0,
      sold: 10,
      spent: 285.0,
      bought: 210,
    },
  },
  '2020-12': {
    Total: {
      earned: 398.0,
      sold: 10,
      spent: 302.0,
      bought: 210,
    },
  },
};
