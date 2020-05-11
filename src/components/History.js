import React, {Component, useState, useEffect} from 'react';

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
} from 'react-native';
import HistoryListItem from '../components/HistoryListItem';

const HistoryScreen = ({navigation}) => {
  const [transactionlist, setTransactionList] = useState([]);
  const apiFetch = async () => {
    try {
      const response = await axios.get(
        'http://chouhanaryan.pythonanywhere.com/api/bill/',
      );
      const {data} = response;
      await setTransactionList(data);
      await console.log(transactionlist);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.disableYellowBox = true;
    apiFetch();
  }, []);

  return (
    <Container style={{backgroundColor: '#F3F9FB'}}>
      <Content>
        {/* the entire outerpart */}
        <Body style={styles.listContainer}>
          {/* the header of table */}
          <View style={styles.tableHeader}>
            <CardItem style={{backgroundColor: 'rgba(255,255,255,0)'}}>
              <Text style={styles.dateHeader}>Date</Text>
              <Text style={styles.typeHeader}>Type</Text>
              <Text style={styles.productHeader}>Product</Text>
              <Text style={styles.itemsHeader}>Items</Text>
              <Text style={styles.priceHeader}>Price</Text>
            </CardItem>
          </View>

          {/* the inner list */}
          <ScrollView>
            <View>
              <FlatList
                style={styles.flatlist}
                data={transactionlist}
                // scrollEnabled={true}
                renderItem={({item}) => <HistoryListItem item={item} />}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>
        </Body>
      </Content>
    </Container>
  );
};

export default HistoryScreen;

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    borderColor: '#858585',
    borderWidth: 0.5,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  itemsHeader: {
    flex: 0.2,
    fontSize: 16,
    fontWeight: 'bold',
  },
  productHeader: {
    flex: 0.26,
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeHeader: {
    flex: 0.22,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateHeader: {
    flex: 0.22,
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceHeader: {
    flex: 0.15,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
