import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, processColor, View, Text } from 'react-native';
import { LineChart, BarChart } from 'react-native-charts-wrapper';
import AsyncStorage from '@react-native-community/async-storage';
import { Picker, Form, Content } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Functional = () => {
  const [min_Vis, setMin_Vis] = useState(0);
  const [max_vis, setMax_vis] = useState(10);


  let datasetObject;
  let dataSetsValue = [];
  let dataStyle = {};
  let legendStyle = {};
  let xAxisStyle = {};
  let valueLegend = [];

  const [dropdownSelect, setDropdownSelect] = useState('earned');

  

  const getRandomColor = () => {
    let color = '#0000ff';
    return color;
  };

  

  const [finalData, setFinalData] = useState([]);

  const get_data = async () => {
    const auth_key = await AsyncStorage.getItem('auth_key');
    fetch('http://chouhanaryan.pythonanywhere.com/api/profit/', {
      headers: { Authorization: `Token ${auth_key}` },
    })
      .then((res) => res.json())
      .then(data => {
        // this temp variable is a dummy data object which is being used because it has more months in its data
        // const total = temp['Total'];

        /* uncomment this below line to display data from endpoint in the graph and comment the above line */
        const total = data['Total'];

        const my_data = Object.keys(total).map(key => {
          return { product: key, value: total[key] };
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


  // for x axis values
  for (let i = 0; i < finalData.length; i++) {
    // console.log(i)
    if (finalData[i].product != 'Total') {
      dummy_time.push(finalData[i].product);
    }
  }

  // for y axis values
  for (let i = 0; i < finalData.length; i++) {
    if (finalData[i].product != 'Total')
      valueLegend.push({ y: finalData[i].value[dropdownSelect] });
  }

  let time = dummy_time;


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



  datasetObject = {
    values: valueLegend,
    // label: 'Total profit',
    label: dropdownSelect === 'earned' ? 'Earned' : 'Spent',
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
      <View style={{ alignItems: 'center' }}>
        <Content style={{ height: 100, marginTop: -70 }}>
          <Form
            style={{
              borderWidth: 1,
              borderColor: '#0006',
              flex: 0.8,
              borderRadius: 5,
              marginTop: 70
            }}>
            <Picker
              note
              style={{ borderColor: '#0f0', borderWidth: 1, width: 200 }}
              mode='dropdown'
              selectedValue={dropdownSelect}
              onValueChange={(value, index) => setDropdownSelect(value)}
            >
              <Picker.Item label="Earned" value="earned" />
              <Picker.Item label="Spent" value="spent" />
            </Picker>
          </Form>
        </Content>
        <TouchableOpacity onPress={() => console.log(dropdownSelect)}>
        </TouchableOpacity>
        <BarChart
          style={styles.bar}
          visibleRange={{
            x: { min: 0, max: 10 },
          }}
          autoScaleMinMaxEnabled={false}
          animation={{
            durationX: 300,
          }}
          data={dataStyle}
          chartDescription={{ text: '' }}
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
      </View>
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
