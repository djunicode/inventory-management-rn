import React, { useState, useEffect, PureComponent } from 'react';
import { View, Text, Button, Dimensions, ScrollView, StyleSheet } from 'react-native';
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

const screenWidth = Dimensions.get('window').width;
const Home = ({ navigation }) => {
  async function Logout() {
    // console.log(await AsyncStorage.getItem('auth_key'));
    await AsyncStorage.removeItem('auth_key'); //Removing the token from local storage while logging out
    // console.log(await AsyncStorage.getItem('auth_key'));
    navigation.navigate('LoginScreen');
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <HeaderView navigation={navigation} title={'Home'} />

      <View style={styles.chartView}>
        <Text style={styles.heading}>Profit</Text>
        <ProfitChart />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    paddingHorizontal: 3
  },
  chartView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginVertical:20,
    marginHorizontal:10,
  }
})

export default Home;

