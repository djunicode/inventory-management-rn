import React, {Component, useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import axios from 'axios';
import {Body, Container, Content, CardItem} from 'native-base';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ExpiryListItem from '../components/ExpiryListItem';

const ExpiryScreen = ({navigation}) => {
  const [expiryList, setExpiryList] = useState([]);
  // true when waiting for an response from API
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const apiFetch = async () => {
    try {
      const auth_key = await AsyncStorage.getItem('auth_key');
      console.log(auth_key);
      fetch('http://chouhanaryan.pythonanywhere.com/api/explist/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${auth_key}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setCount(data.count);
          const list = data.results.map(val => ({
            name: val.Product,
            quantity: val['No. of items'],
            daysLeft: val['Days left'],
          }));
          setExpiryList(list);
        })
        .catch(err => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.disableYellowBox = true;
    apiFetch();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    apiFetch();
     setRefreshing(false)
  }, []);
  return (
    <Container style={{backgroundColor: '#F3F9FB'}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, alignSelf: 'center'}}>
        Items expiring in next 3 days.
      </Text>
      <Content style={{marginTop: -10}}>
        {/* the entire outerpart */}
        <Body style={styles.listContainer}>
          {/* the header of table */}

          <View style={styles.tableHeader}>
            <CardItem
              style={{
                backgroundColor: 'rgba(255,255,255,0)',
                justifyContent: 'center',
              }}>
              <Text style={styles.productHeader}>Product</Text>
              <Text style={styles.itemsHeader}>Items</Text>
              <Text style={styles.daysHeader}>Days Left</Text>
            </CardItem>
          </View>

          {/* the inner list */}
{count>0?(  <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View>
              <FlatList
                style={styles.flatlist}
                data={expiryList}
                // scrollEnabled={true}
                renderItem={({item}) => <ExpiryListItem item={item} />}
                
              />
            </View>
          </ScrollView>):(null)}
         
        </Body>
      </Content>
    </Container>
  );
};

export default ExpiryScreen;

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    borderColor: '#858585',
    borderWidth: 0.5,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 16,

    width: DEVICE_WIDTH - 32,
  },
  flatlist: {
    width: DEVICE_WIDTH - 32,
    backgroundColor: '#fff',
    height: 600,
    borderRadius: 10,
  },
  tableHeader: {
    backgroundColor: '#e7eff2',
    width: DEVICE_WIDTH - 32,
  },
  itemsHeader: {
    flex: 0.25,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  productHeader: {
    flex: 0.35,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
 
  daysHeader: {
    flex: 0.4,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
