import React, {Component, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Button,
  Body,
  Input,
  Container,
  Content,
  Header,
  Right,
  Left,
  Item,
  Label,
  Card,
  CardItem,
} from 'native-base';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import HistoryListItem from '../components/HistoryListItem';
import HeaderView from '../components/HeaderView';
import axios from 'axios';
const DEMO_HISTORY_DATA = [
    {
        id: '1',
        date: '23 Dec',
        type: 'Sell',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '2',
        date: '23 Dec',
        type: 'Sell',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },]
const HistoryScreen = ({navigation}) => {
  
    const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    apiFetch();
  }, []);
  const apiFetch = async () => {
    try {
      const response = await axios.get(
        'http://chouhanaryan.pythonanywhere.com/api/bill',
      );
      const {data} = response;
      //   const list = data.map(val => ({
      //     name: val.name,
      //     quantity: val.quantity,
      //     price: val.latest_selling_price,
      //     id: val.id,
      //   }));

      
      setTransactionList(data);
    } catch (e) {
      console.log(e);
    }
  };
  const parseDate = date => {
      const newDate =Date(date).split(' ');

   const k=newDate[1]+' '+newDate[2];
    return k;
  };

  // parse price to proper format
  const parsePrice = transactions => {
    return transactions.reduce((acc, obj) => acc + obj.rate * obj.quantity, 0);
  };

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
        
          
            <View>
              <FlatList
                style={styles.flatlist}
                data={transactionList}
                // scrollEnabled={true}
                renderItem={(row) => (
                    
                  <View style={styles.container} key={(row.id )}>
                    <CardItem style={{justifyContent:'space-evenly'}}>
                  
                      <Text style={styles.date}>{parseDate(row.date_time)}</Text>
                      <Text style={styles.type}> {row.in_or_out =='In' ? 'Buy' : 'Sell'}</Text>
                   <Text style={styles.product}>Lays,{'\n'}Lassi,{'\n'}Sanitizer
                   {/* {row.transaction.map((val, index) =>
    index === row.transaction.length - 1
      ? val.name
      : `${val.name}, `
  )} */}
  </Text>
                     <Text style={styles.items}>12,{'\n'}34,{'\n'}56
                      {/* {row.transaction.map((val, index) =>
    index === row.transaction.length - 1
      ? val.quantity
      : `${val.quantity}, `
  )} */}
  </Text>
  
                       <Text style={styles.price}>
                       1234
                       {/* {parsePrice(row.transaction)} */}
                       
                       </Text> 
                                           </CardItem>
                  
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </View>
         
        </Body>
      </Content>
    </Container>
  );
};

export default HistoryScreen;

const DEVICE_WIDTH = Dimensions.get('screen').width;
const DEVICE_HEIGHT = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    
  },
  date: {
    flex: 0.24,
    fontSize: 16,
    borderColor:'black',
    
  },
  type: {
    flex: 0.19,
    fontSize: 16,
  },
  product: {
    flex: 0.32,
    fontSize: 16,
  },
  items: {
    flex: 0.15,
    fontSize: 16,
  },
  price: {
    flex: 0.15,
    fontSize: 16,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderColor: '#858585',
    borderWidth: 0.5,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
    width: DEVICE_WIDTH - 32,
    // flexDirection: 'column',
    // backgroundColor: 'blue',
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
