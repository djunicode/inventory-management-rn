import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import InventoryListScreen from './InventoryListScreen';
import ExpiryScreen from './ExpiryScreen'
import HeaderView from '../components/HeaderView';

const deviceHeight = Dimensions.get('window').height;

const TransactionsScreen = ({navigation}) => {
  return (
    <Container>
      <HeaderView navigation={navigation} title={'Inventory'} />

      <Tabs>
        <Tab
          
          activeTabStyle={{backgroundColor: '#4796BD'}}
          tabStyle={{backgroundColor: '#4796BD'}}
          textStyle={{color: '#fff'}}
          activeTextStyle={{color: '#fff', fontWeight: 'bold'}}
          heading="Inventory">
          <InventoryListScreen />
        </Tab>
        <Tab
          activeTabStyle={{backgroundColor: '#4796BD'}}
          tabStyle={{backgroundColor: '#4796BD'}}
          textStyle={{color: '#fff'}}
          activeTextStyle={{color: '#fff', fontWeight: 'bold'}}
          heading="Near expiry">
          <ExpiryScreen />
        </Tab>

      </Tabs>
    </Container>
  );
};

export default TransactionsScreen;
