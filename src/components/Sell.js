import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
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
  Picker,
  Label,
  Form,
} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
//http://chouhanaryan.pythonanywhere.com/api/sell/

const Sell = ({navigation}) => {
  const [product, setProduct] = useState([]);
  const [selected, setSelected] = useState('key1');
  const [list, setProductsList] = useState([]);

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const onPickerValueChange = (item_name, item_index, product_index) => {
    setSelected(item_name);
    console.log('this is name:', item_name);
    console.log('this is index:', item_index);
    console.log('which prod no.?:', product_index);
    let copy = [...product];
    copy[product_index].name = item_name;
    console.log(copy);
    setProduct(copy);
  };

  useEffect(() => {
    setProduct([{name: 'Pick a value', price: '', amount: ''}]);
    apiFetch();
  }, []);

  const apiFetch = async () => {
    const auth_key = await AsyncStorage.getItem('auth_key');
    fetch('http://chouhanaryan.pythonanywhere.com/api/productlist/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${auth_key}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProductsList(data.results);
      })
      .catch(err => console.log(err));
  };
  const sellprod = async () => {
    await product.forEach(async product => {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('quantity', parseInt(product.amount));
      formData.append('latest_selling_price', parseFloat(product.price));
      var myHeaders = new Headers();
      const auth_key = await AsyncStorage.getItem('auth_key');

      myHeaders.append('Authorization', `Token ${auth_key}`);

      fetch('http://chouhanaryan.pythonanywhere.com/api/sell/', {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow',
      })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    
    });
  };

  return (
    <Container style={{backgroundColor: '#F3F9FB'}}>
      <Content>
        <Body>
          <Text style={styles.heading}>Sell Items</Text>
          
          {/* separator line above name, phone no. and address fields */}
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
            <View
              style={{
                borderColor: '#0004',
                borderWidth: 1,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 2,
                marginBottom: -10,
                marginTop: 5,
              }}
            />
          </View>

          {/* customer name */}
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Customer Name</Label>
            <Input
              style={styles.inputArea}
              value={customerName}
              onChangeText={value => setCustomerName(value)}
            />
          </Item>

          {/* phone number */}
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Phone number</Label>
            <Input
              style={styles.inputArea}
              keyboardType='number-pad'
              value={phoneNumber}
              onChangeText={value => setPhoneNumber(value)}
            />
          </Item>

          {/* address */}
          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Address</Label>
            <Input
              style={styles.inputArea}
              value={address}
              onChangeText={value => setAddress(value)}
            />
          </Item>

          {product.map((product_item, product_index) => {
            return (
              <View
                key={product_index}
                style={{width: Dimensions.get('window').width}}>
                {/* for the separating line */}
                <View
                  style={{
                    borderColor: '#0004',
                    borderWidth: 1,
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 2,
                    marginBottom: -10,
                    marginTop: 5,
                  }}
                />

                <Text style={styles.product_titles}>
                  Product {product.length == 1 ? '' : product_index + 1}
                </Text>
                <View
                  style={{
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                  }}>
                  {/* <Label style={styles.label}>Product Name</Label> */}
                  <Text style={[styles.label, {alignSelf: 'center'}]}>
                    Product Name
                  </Text>
                  <Form
                    style={{
                      borderWidth: 1,
                      borderColor: '#0006',
                      flex: 0.8,
                      borderRadius: 5,
                    }}>
                    <Picker
                      note
                      mode="dropdown"
                      selectedValue={product[product_index].name}
                      onValueChange={(item_name, item_index) => {
                        onPickerValueChange(
                          item_name,
                          item_index,
                          product_index,
                        );
                      }}>
                      {/* <Picker.Item label='plz pick' value={-1} /> */}
                      {list.map((picker_item, picker_index) => (
                        <Picker.Item
                          key={picker_index}
                          // label={picker_item.name + " ("+picker_item.quantity+")"}
                          label={picker_item.name}
                          value={picker_item.name}
                        />
                      ))}
                    </Picker>
                  </Form>
                </View>

                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>Price</Label>
                  <Input
                    style={styles.inputArea}
                    keyboardType="numeric"
                    onChangeText={value =>
                      (product[product_index].price = parseFloat(value.trim()))
                    }
                  />
                </Item>

                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>No. of Items</Label>
                  <Input
                    style={styles.inputArea}
                    keyboardType="numeric"
                    onChangeText={value =>
                      (product[product_index].amount = parseInt(value.trim()))
                    }
                  />
                </Item>
              </View>
            );
          })}

          <TouchableOpacity
            onPress={() => {
              console.log(product);
              if (
                product[product.length - 1].name &&
                product[product.length - 1].price &&
                product[product.length - 1].amount
              ) {
                let copy = [...product];
                copy.push({name: '', price: '', amount: ''});
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
              let all_unique = true;
              console.log('product', product);
              console.log('list', list);
              if (product.length != 1) {
                for (let i = 0; i < product.length; i++) {
                  for (let j = i + 1; j < product.length; j++) {
                    if (product[i].name == product[j].name) {
                      all_unique = false;
                      break;
                    }
                  }
                }
              }
              if (!all_unique) {
                console.log('same names');
                Alert.alert('please select all unique items');
              } else if (
                product[product.length - 1].name == '' ||
                product[product.length - 1].price == '' ||
                product[product.length - 1].amount == ''
              ) {
                Alert.alert(
                  `Please fill valid details for product ${product.length}`,
                );
              } else {
                let enough_stock = true;
                let shortage_products = [];

                for (let i = 0; i < product.length; i++) {
                  const product_object = product[i];
                  for (let j = 0; j < list.length; j++) {
                    const list_item_object = list[j];
                    if (
                      product_object.name == list_item_object.name &&
                      product_object.amount > list_item_object.quantity
                    ) {
                      shortage_products.push(product_object.name);
                      enough_stock = false;
                      break;
                    }
                  }
                }
                if (!enough_stock) {
                  Alert.alert(
                    `Not enough stock in inventory for ${shortage_products}`,
                  );
                } else {
                  console.log('finally sold!!');
                  await sellprod();
                  await setProduct([]);
                  await setProduct([{name: '', price: '', amount: ''}]);
                  await setAddress();
                await setAddress('');
                await  setCustomerName();
                await setCustomerName('');
                await setPhoneNumber();
                await setPhoneNumber('')
                }
              }
            }}
            style={styles.sellButton}>
            <Text style={styles.sellButtonText}>Sell</Text>
          </TouchableOpacity>
        </Body>
      </Content>
    </Container>
  );
};

export default Sell;

const styles = StyleSheet.create({
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
  sellButton: {
    backgroundColor: '#4796BD',
    margin: 15,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    flexDirection: 'row',
  },
  sellButtonText: {
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
