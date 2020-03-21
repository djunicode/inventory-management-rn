import React, {useState, useEffect, PureComponent} from 'react';
import {View, Text, Button, Dimensions, ScrollView} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-community/async-storage';
import HeaderView from '../components/HeaderView';

const screenWidth = Dimensions.get('window').width;
const Home = ({navigation}) => {
  async function Logout() {
    // console.log(await AsyncStorage.getItem('auth_key'));
    await AsyncStorage.removeItem('auth_key'); //Removing the token from local storage while logging out
    // console.log(await AsyncStorage.getItem('auth_key'));
    navigation.navigate('LoginScreen');
  }

  return (
    <ScrollView style={{flex: 1}}>
      <HeaderView navigation={navigation} title={'Home'} />
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text></Text>
        <Text></Text>
        <Text style={{fontSize: 25, paddingHorizontal: 3}}>Profit</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(200, 203, 207, ${opacity})`, // optional
                strokeWidth: 3, // optional
              },
            ],
          }}
          width={screenWidth * 0.95}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#c8cbcf',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#c8cbcf',
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(75, 79, 84, ${opacity})`,
          }}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text></Text>
        <Text></Text>
        <Text
          style={{
            fontSize: 25,
            paddingHorizontal: 3,
            justifyContent: 'center',
          }}>
          Most Sold
        </Text>
        <LineChart
          data={{
            labels: [
              'Soap',
              'Drinks',
              'Chips',
              'Mask',
              'Sanitizer',
              'Cloth',
            ],
            datasets: [
              {
                data: [17, 16, 15, 14, 14, 12, 11],
              },
            ],
          }}
          width={screenWidth*0.9} // from react-native
          height={260}
         
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#d1e0df',
            backgroundGradientFrom: '#d1e0df',
            backgroundGradientTo: '#d1e0df',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(21, 212, 50, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#00ed00',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text></Text>
        <Text></Text>
        <Text style={{fontSize: 25, paddingHorizontal: 3}}>Least Sold</Text>
        <BarChart
          // style={graphStyle}
          data={{
            labels: ['Sauce', 'Chips', 'Bread', 'Chips', 'Cake'],
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
            color: (opacity = 1) => `rgba(7, 230, 7, ${opacity})`,
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
          verticalLabelRotation={330}
         
        />
      </View>

      <Text></Text>
      <Text></Text>
    </ScrollView>
  );
};

export default Home;

