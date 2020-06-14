import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import {
  Container,
  Content,
  Tab,
  Tabs,
  Header,
  Left,
  Right,
  Body,
  Item,
  Input,
  Label,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
//http://chouhanaryan.pythonanywhere.com/api/buy/
const Buy = ({navigation}) => {
  const [product, setProduct] = useState([
    {name: '', price: 0, amount: 0, expiry: ''},
  ]);
  useEffect(() => {
    setProduct([{name: '', price: 0, amount: 0}]);
  }, []);
  const buyprod = async () => {
    product.forEach(async product => {
      const formdata = new FormData();
      formdata.append("name", product.name);
      formdata.append("avg_cost_price", product.price);
      formdata.append("quantity", product.amount);

      formdata.append("expiry", '2020-8-6');
      var myHeaders = new Headers();
      const auth_key = AsyncStorage.getItem('auth_key');
      myHeaders.append("Authorization", `Token ${auth_key}`);

      //       const token = AsyncStorage.getItem('auth_key');
      // const config = { headers: { Authorization: `Token ${token}` } };
      //       const response = await axios.post(
      //         'http://chouhanaryan.pythonanywhere.com/api/buy/',
      //         formData,
      //         config
      //       );

      fetch('http://chouhanaryan.pythonanywhere.com/api/buy/', {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
  };

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    console.log('\n');
    setDate(currentDate);
    console.log(date.toDateString());
    console.log(date.toLocaleDateString());
    console.log(date.toUTCString());
    var da = date.toLocaleDateString().split('/');
    console.log(da[2]);
    console.log(da[1]);
    console.log(da[0]);
    var d = '' + 20 + '' + da[2] + '-' + da[0] + '-' + da[1] + '';
    console.log(d);
  };

  return (
    <Container style={{backgroundColor: '#F3F9FB'}}>
      <ScrollView>
        <Body>
          <Text style={styles.heading}>Buy Items</Text>

          {product.map((item, index) => {
            //  let copy = [...product];
            return (
              <View key={index} style={{width: Dimensions.get('window').width}}>
                {/* for the separating line */}
                <View
                  style={{
                    borderColor: '#0004',
                    borderWidth: 1,
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 2,
                    marginBottom: -10,
                    marginTop: 5,
                  }}
                />

                <Text style={styles.product_titles}>
                  Product {product.length == 1 ? '' : index + 1}
                </Text>
                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>Product Name</Label>
                  <Input
                    placeholder={product[index].name}
                    style={styles.inputArea}
                    onChangeText={value => (product[index].name = value.trim())}
                  />
                </Item>

                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>Price</Label>
                  <Input
                    style={styles.inputArea}
                    keyboardType="numeric"
                    onChangeText={value =>
                      (product[index].price = parseFloat(value.trim()))
                    }
                  />
                </Item>

                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>No. of Items</Label>
                  <Input
                    style={styles.inputArea}
                    keyboardType="numeric"
                    onChangeText={value =>
                      (product[index].amount = parseInt(value.trim()))
                    }
                  />
                </Item>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={styles.dateMainView}>
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 18,
                        marginTop: 17,
                        color: 'black',
                      }}>
                      Expiry date : {date.toLocaleDateString()}
                    </Text>
                  </View>

                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Icon
                      name="calendar"
                      color="#4796BD"
                      size={30}
                      style={{
                        marginLeft: -10,
                        flex: 1,
                        marginRight: 30,
                        marginTop: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <View>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </View>
                </View>
              </View>
            );
          })}

          <TouchableOpacity
            onPress={() => {
              if (
                product[product.length - 1].name &&
                product[product.length - 1].price &&
                product[product.length - 1].amount
              ) {
                let copy = [...product];
                copy.push({name: '', price: 0, amount: 0});
                setProduct(copy);
              } else {
                Alert.alert(
                  `Please fill all details for product ${product.length}`,
                );
              }
            }}
            style={styles.addButton}>
            <Icon name="plus" color="#4796BD" size={25} style={styles.icon} />
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              if (
                product[product.length - 1].name == '' ||
                product[product.length - 1].price == 0 ||
                product[product.length - 1].amount == 0
              ) {
                Alert.alert(
                  `Please fill valid details for product ${product.length}`,
                );
              } else {
                console.log(JSON.stringify(product) + '!');
                await buyprod();
                setProduct([{name: '', price: 0, amount: 0}]);
              }
            }}
            style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>
        </Body>
      </ScrollView>
    </Container>
  );
};

export default Buy;

const styles = StyleSheet.create({
  dateMainView: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
    flex: 9,
  },
  heading: {
    fontSize: 26,
    color: '#122E40',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'center',
    marginLeft: '5%',
  },
  product_titles: {
    fontSize: 24,
    color: '#122E40',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },

  inputBox: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
  },

  label: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: '#828282',
  },
  inputArea: {
    paddingLeft: 20,
  },
  buyButton: {
    backgroundColor: '#4796BD',
    margin: 15,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    flexDirection: 'row',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  addButton: {
    borderColor: '#4796BD',
    borderWidth: 2,
    margin: 20,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  addButtonText: {
    color: '#4796BD',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  icon: {
    marginLeft: 4,
    marginRight: 10,
  },
});
