import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, processColor } from 'react-native';

import { LineChart } from 'react-native-charts-wrapper'

const Functional = () => {

  const [min_Vis, setMin_Vis] = useState(0);
  const [max_vis, setMax_vis] = useState(6);


  const getRandomColor = () => {
    let color = '#0000ff'
    return color;
  }

  let simple_data = {
    'Total profit': [
      { month: 'Jan', val: 3 },
      { month: 'Feb', val: 2 },
      { month: 'Mar', val: 6 },
      { month: 'Apr', val: 9 },
      { month: 'May', val: 5 },
      { month: 'Jun', val: 8 },
    ]
  }

  let complex_data = {
    'Total profit': [
      { month: 'Jan1', val: 3 },
      { month: 'Jan2', val: 4 },
      { month: 'Jan3', val: 1 },
      { month: 'Jan4', val: 2 },
      { month: 'Feb1', val: 5 },
      { month: 'Feb2', val: 1 },
      { month: 'Feb3', val: 6 },
      { month: 'Feb4', val: 3 },
      { month: 'Mar1', val: 4 },
      { month: 'Mar2', val: 7 },
      { month: 'Mar3', val: 3 },
      { month: 'Mar4', val: 9 },
      { month: 'Apr1', val: 10 },
      { month: 'Apr2', val: 3 },
      { month: 'Apr3', val: 6 },
      { month: 'Apr4', val: 6 },
      { month: 'May1', val: 3 },
      { month: 'May2', val: 1 },
      { month: 'May3', val: 8 },
      { month: 'May4', val: 4 },
      { month: 'Jun1', val: 10 },
      { month: 'Jun2', val: 4 },
      { month: 'Jun3', val: 3 },
      { month: 'Jun4', val: 8 },
    ]
  }



  const [final_set, setFinal_set] = useState(simple_data)


  let dummy_time = []

  for (let i = 0; i < final_set["Total profit"].length; i++) {
    dummy_time.push(final_set["Total profit"][i].month)
  }

  let time = dummy_time
  let datasetObject;
  let dataSetsValue = []
  let dataStyle = {}
  let legendStyle = {}
  let xAxisStyle = {}
  let valueLegend = []

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
    maxSizePercent: 0.5
  }

  dataStyle = {
    dataSets: dataSetsValue
  }
  xAxisStyle = {
    valueFormatter: time,
    axisMinimum: min_Vis,
    axisMaximum: max_vis,
    granularity: 1,
  }
  const markers = {
    enabled: true,
    digits: 2,
    backgroundTint: processColor('teal'),
    markerColor: processColor('#F0C0FF8C'),
    textColor: processColor('white')
  }

  for (let i = 0; i < final_set["Total profit"].length; i++) {
    valueLegend.push({ y: final_set["Total profit"][i].val })
  }


  datasetObject = {
    values: valueLegend,
    label: 'Total profit',
    config: {
      lineWidth: 1,
      drawCubicIntensity: 0.4,
      circleRadius: 5,
      drawHighlightIndicators: false,
      color: processColor(getRandomColor()),
      drawFilled: true,
      fillColor: processColor(getRandomColor()),
      fillAlpha: 40,
      circleColor: processColor(getRandomColor()),
      drawValues: true
    }
  }
  dataSetsValue.push(datasetObject)

  const renderLine = () => {
    return (
      <LineChart
        style={styles.bar}
        visibleRange={{
          x: { min: 0, max: 12 }
        }}
        onChange={(event) => {
          
          if (event.nativeEvent.scaleX > 2.2) {  
            setMax_vis(24)
            setFinal_set(complex_data)
          }
          else {
            setMax_vis(6)
            setFinal_set(simple_data)
          }
        }}
        autoScaleMinMaxEnabled={false}
        animation={{
          durationX: 300
        }}
        data={dataStyle}
        chartDescription={{ text: '' }}
        legend={legendStyle}
        marker={markers}
        xAxis={xAxisStyle}
        drawGridBackground={false}
        drawValues={false}
        dragDecelerationFrictionCoef={0}
        dragEnabled
        borderColor={processColor('teal')}
        borderWidth={1}
        drawBorders={true}
      />
    );
  }


  return (
      renderLine()
  );
}

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
    textAlign: 'center'
  },
  bar: {
    marginTop: 10,
    height: Dimensions.get('window').height * 2/5,
    width: Dimensions.get('window').width,
    padding: 10
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