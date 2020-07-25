import React, { useState, useEffect, PureComponent } from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Body,
  Input,
  Container,
  Content,
  Item,
  Label,
  Icon,
  Header,
} from 'native-base';
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
import ProfitChart from '../components/ProfitChart';
import MostSoldChart from '../components/MostSoldChart';
import LeastSoldChart from '../components/LeastSoldChart';
import SalesOverTime from '../components/SalesOverTime';
import SalesPerItem from '../components/SalesPerItem';
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
import isAuthenticated from '../utils/isAuthenticated';

const screenWidth = Dimensions.get('window').width;


const Home = ({ navigation }) => {

  const [display, setdisplay] = useState(false);
  // const Logout = async () => {
  //   // console.log(await AsyncStorage.getItem('auth_key'));
  //   await AsyncStorage.removeItem('auth_key'); //Removing the token from local storage while logging out
  //   // console.log(await AsyncStorage.getItem('auth_key'));
  //   navigation.navigate('LoginScreen');
  // };



  return (
    <ScrollView style={{ flex: 1 }}>
      <HeaderView navigation={navigation} title={'Home'} />


      {/* <TouchableOpacity
        onPress={() => setdisplay(!display)}
        style={styles.button}>
        {
          display ?
            <Text
              style={[styles.buttonText, { fontSize: 15 }]}>
              Hide Profit Chart
        </Text> :
            <Text
              style={[styles.buttonText, { fontSize: 15 }]}>
              Show Profit Chart
      </Text>
        }

      </TouchableOpacity> */}
      {/* {display ? (
        <View style={styles.chartView}>
          <Text style={styles.heading}>Profit</Text>
          <SalesOverTime />
        </View>
      ) : (
          <Content>
            <Body>
              <Image
                style={{
                  width: DEVICE_WIDTH - 32,
                  height: 300,
                  marginVertical: 40,
                }}
                source={require('../Images/Illustration.png')}
              />
              <Text style={{ fontSize: 16 }}>
                More data needed to display Profit charts
            </Text>
            </Body>
          </Content>
        )} */}

      <View style={styles.chartView}>
        <Text style={styles.heading}>Sales over time</Text>
        <SalesOverTime />
      </View>

      <View style={styles.chartView}>
        <Text style={styles.heading}>Sales per item</Text>
        <SalesPerItem />
      </View>


      {/* <View style={styles.chartView}>
        <Text style={styles.heading}>Most Sold</Text>
        <MostSoldChart />
      </View>
      <View style={styles.chartView}>
        <Text style={styles.heading}>Least Sold</Text>
        <LeastSoldChart />
      </View> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    paddingHorizontal: 3,
  },
  chartView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
    marginTop: 30
  },
  buttonText: {
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'white',
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4796BD',
    marginHorizontal: 110,
    marginTop: 10,
    borderRadius: 40,
  }
});

export default Home;