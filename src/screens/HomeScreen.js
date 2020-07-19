import React, {useState, useEffect, PureComponent} from 'react';
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
// import MostSoldChart from '../components/MostSoldChart';
// import LeastSoldChart from '../components/LeastSoldChart';
const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;
import isAuthenticated from '../utils/isAuthenticated';

const screenWidth = Dimensions.get('window').width;


const Home = ({navigation}) => {
  
  const [display, setdisplay] = useState(false);
  const Logout = async () => {
    // console.log(await AsyncStorage.getItem('auth_key'));
    await AsyncStorage.removeItem('auth_key'); //Removing the token from local storage while logging out
    // console.log(await AsyncStorage.getItem('auth_key'));
    navigation.navigate('LoginScreen');
  };
  
  

  return (
    <ScrollView style={{flex: 1}}>
      <HeaderView navigation={navigation} title={'Home'} />
      <TouchableOpacity
        onPress={() => setdisplay(!display)}
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#857562',
          marginHorizontal: 110,
          marginTop: 10,
          borderRadius: 40,
        }}>
        <Text
          style={{
            fontSize: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginHorizontal: 10,
          }}>
          Show charts
        </Text>
      </TouchableOpacity>
      {display ? (
        <View style={styles.chartView}>
          <Text style={styles.heading}>Profit</Text>
          <ProfitChart />
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
            <Text style={{fontSize: 16}}>
              More data needed to display charts
            </Text>
          </Body>
        </Content>
      )}
      <TouchableOpacity
        onPress={() => {AsyncStorage.removeItem('auth_key')
        navigation.navigate('LoginScreen')}}
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#857562',
          marginHorizontal: 110,
          marginTop: 10,
          borderRadius: 40,
        }}>
        <Text
          style={{
            fontSize: 20,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginHorizontal: 10,
          }}>
          Logout
        </Text>
      </TouchableOpacity>
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
  },
});

export default Home;
