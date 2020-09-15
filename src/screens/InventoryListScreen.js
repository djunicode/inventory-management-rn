import React, {useState, useEffect} from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
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
  Modal,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-community/async-storage';
import InventoryListItem from '../components/InventoryListItem';
import HeaderView from '../components/HeaderView';
import {log} from 'react-native-reanimated';

const InventoryListScreen = ({navigation}) => {
  const [inventoryList, setInventoryList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateSellPrice, setUpdateSellPrice] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [lowerLimit, setLowerLimit] = useState('');
  const [updateProd, setUpdateProd] = useState({});
  const [limit, setLimit] = useState(8);
  const [offset, setOffset] = useState(0);
  const [end, setEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    getInventoryList(0);
  }, []);

  const getInventoryList = async offs => {
    console.log(offs);
    setIsLoading(false);
    const auth_key = await AsyncStorage.getItem('auth_key');
    fetch(
      `http://chouhanaryan.pythonanywhere.com/api/productlist/?limit=${limit}&offset=${offs}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${auth_key}`,
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        setEnd(data.count);
        console.log(data.previous, 'prev');
        if (data.previous != null) {
          const tempInventoryList = [...inventoryList, ...data.results];
          if (data.results.length !== 0) {
            setInventoryList(tempInventoryList);
          }
        } else {
          if (data.results.length !== 0) {
            setInventoryList(data.results);
          }
        }
      })
      .catch(err => console.log(err));
  };

  const deleteInventoryItem = async inventoryItem => {
    const auth_key = await AsyncStorage.getItem('auth_key');
    await fetch(
      `http://chouhanaryan.pythonanywhere.com/api/productlist/${
        inventoryItem.id
      }/`,
      {
        method: 'DELETE',
        headers: {Authorization: `Token ${auth_key}`},
      },
    )
      .then(() => {
        setOffset(0);
        getInventoryList(0);
        console.log('deleted successfully!');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const performSearch = async search => {
    console.log(search);
    if (isSearch) {
      const auth_key = await AsyncStorage.getItem('auth_key');
      fetch(
        'http://chouhanaryan.pythonanywhere.com/api/prodsearch/?search=' +
          search,
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${auth_key}`,
          },
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log(response, 'w');
          console.log(inventoryList, 'h');
          setInventoryList(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const updateProductPost = async () => {
    let formData = new FormData();
    const looseVal = updateProd.loose === true ? 'True' : 'False';
    formData.append('loose', looseVal);
    formData.append('upper', upperLimit);
    formData.append('lower', lowerLimit);
    formData.append('name', updateName);
    formData.append('latest_selling_price', updateSellPrice);
    const auth_key = await AsyncStorage.getItem('auth_key');
    console.log(formData,"form");

    fetch(
      `http://chouhanaryan.pythonanywhere.com/api/update/${updateProd.id}/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${auth_key}`,
        },
        body: formData,
      },
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setOffset(0);
        getInventoryList(0);
        Alert.alert('Success!', 'Product Updated');
      })
      .catch(err => console.log(err));
    setUpdateName('');
    setUpdateSellPrice(null);
  };
  const handleReach = () => {
    if (!isSearch) {
      false;
      const newOff = offset + limit;
      if (newOff < end) {
        setIsLoading(true);

        setOffset(newOff);
        console.log(newOff, limit, end);
        getInventoryList(newOff);
      }
    }
  };

  const onMenuPressed = inventoryItem => {
    console.log(inventoryItem,"Item");
    Alert.alert(
      `${inventoryItem.name} (Qty: ${inventoryItem.quantity})`,
      `Rs. ${inventoryItem.avg_cost_price}`,
      [
        {
          text: 'Update',
          onPress: () => {
            setUpdateProd(inventoryItem);
            setUpdateName(inventoryItem.name);
            if (inventoryItem.latest_selling_price) {
              setUpdateSellPrice(inventoryItem.latest_selling_price.toString());
            } else {
              setUpdateSellPrice('Not assigned');
            }
            console.log(inventoryItem.latest_selling_price);
            setUpperLimit(inventoryItem.upper_limit.toString());
            setLowerLimit(inventoryItem.lower_limit.toString());
            setModalVisible(true);
          },
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteInventoryItem(inventoryItem);
          },
        },
        {
          text: 'Cancel',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };
  var radio_props = [
    {label: 'Loose', value: updateProd.loose},
    {label: 'Packed', value: !updateProd.loose},
  ];

  return (
    <Container style={{backgroundColor: '#F3F9FB'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('No changes made');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.product_titles}>Update Product</Text>
            <View style={{alignItems: 'flex-start', marginVertical: 20}}>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Product Name</Label>
                <Input
                  style={styles.inputArea}
                  onChangeText={value => {
                    setUpdateName(value);
                  }}
                  value={updateName}
                />
              </Item>
              <Item floatingLabel style={styles.inputBox}>
                <Label style={styles.label}>Selling Price</Label>
                <Input
                  style={styles.inputArea}
                  value={updateSellPrice}
                  onChangeText={value => {
                    console.log(typeof(value))
                    setUpdateSellPrice(value);
                  }}
                  keyboardType="numeric"
                />
              </Item>
            </View>
            <View style={{paddingLeft: 10}}>
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 3,
                  fontSize: 17,
                  fontWeight: '800',
                }}>
                Recommended Limit
              </Text>
              <NumericInput
                value={parseInt(upperLimit)}
                onChange={value => {
                  setUpperLimit(value.toString());
                }}
                totalWidth={150}
                totalHeight={35}
                minValue={0}
                maxValue={99999}
                onLimitReached={(isMAx, msg) => console.log(msg)}
                step={1}
                iconStyle={{fontSize: 15, color: '#434A5E'}}
                inputStyle={{fontSize: 18, color: '#434A5E'}}
                valueType="real"
                borderColor="#C7CBD6"
                rightButtonBackgroundColor="#C7CBD6"
                leftButtonBackgroundColor="#C7CBD6"
              />
              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 3,
                  fontSize: 17,
                  fontWeight: '800',
                }}>
                Critical Limit
              </Text>
              <NumericInput
                value={parseInt(lowerLimit)}
                onChange={value => {
                  console.log(typeof(value))
                  setLowerLimit(value.toString());
                }}
                totalWidth={150}
                totalHeight={35}
                minValue={0}
                maxValue={99999}
                onLimitReached={(isMAx, msg) => console.log(msg)}
                step={1}
                iconStyle={{fontSize: 15, color: '#434A5E'}}
                inputStyle={{fontSize: 18, color: '#434A5E'}}
                valueType="real"
                borderColor="#C7CBD6"
                rightButtonBackgroundColor="#C7CBD6"
                leftButtonBackgroundColor="#C7CBD6"
              />
            </View>
            <Text
              style={{
                marginTop: 30,
                fontSize: 17,
                fontWeight: '800',
                paddingLeft: 10,
              }}>
              Type
            </Text>
            <RadioForm
              radio_props={radio_props}
              labelHorizontal={true}
              formHorizontal={true}
              buttonColor={'#434A5E'}
              labelColor={'#434A5E'}
              initial={(updateProd.loose===true)?0:1}
              labelStyle={{marginRight: 20}}
              style={{paddingLeft: 10, marginTop: 8}}
              onPress={value => {
                updateProd.loose = value;
                setUpdateProd(updateProd);
              }}
            />

            <TouchableOpacity
              style={styles.addEmployeeButton}
              // onPress={() => navigation.navigate('AddEmployee')}
              onPress={() => {
                updateProductPost();
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.addEmployeeButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Content>
        {/* the entire outerpart */}
        <Body style={styles.listContainer}>
          {/* the header of table */}
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.inputStyle}
            placeholder=" Search Product"
            placeholderTextColor="gray"
            multiline={false}
            onEndEditing={e => {
              console.log(e.nativeEvent.text);
              if (e.nativeEvent.text === '') {
                setOffset(0);
                console.log('bb');
                getInventoryList(0);
              }
            }}
            onChangeText={search => {
              if (search === '') {
                setIsSearch(false);
                setOffset(0);
                console.log('h');
                setIsLoading(true);
                setInventoryList([]);
                getInventoryList(0);
              } else {
                setIsSearch(true);
                setInventoryList([]);
                setTimeout(() => {
                  performSearch(search);
                }, 1500);
              }
            }}
          />
          <View style={styles.tableHeader}>
            <CardItem
              style={{
                backgroundColor: 'rgba(255,255,255,0)',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingLeft: 40,
              }}>
              <Text style={styles.productNameHeader}>Product</Text>
              <Text style={styles.itemsHeader}>Items</Text>
              <Text style={styles.priceHeader}>Price</Text>
            </CardItem>
          </View>
          <FlatList
            style={styles.flatlist}
            data={inventoryList}
            extraData={inventoryList}
            renderItem={({item}) => (
              <InventoryListItem
                onMenuPressed={data => onMenuPressed(data)}
                item={item}
              />
            )}
            keyExtractor={item => item.id}
            onEndReached={!isSearch && handleReach}
            onEndReachedThreshold={!isSearch && 0.2}
            ListFooterComponent={() => {
              if (isLoading) {
                return <ActivityIndicator size="large" color="#828282" />;
              }
              return null;
            }}
          />
        </Body>
      </Content>
    </Container>
  );
};

export default InventoryListScreen;

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
    // flexDirection: 'column',
    // backgroundColor: 'blue',
  },
  flatlist: {
    width: DEVICE_WIDTH - 32,
    backgroundColor: '#fff',
    height: 488,
    alignSelf: 'center',
  },
  tableHeader: {
    backgroundColor: '#e7eff2',
    // backgroundColor: 'red',
    // alignSelf: 'stretch',
    width: DEVICE_WIDTH - 32,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignContent: 'stretch',
  },
  inputStyle: {
    marginVertical: 16,
    marginHorizontal: 20,
    height: 55,
    paddingHorizontal: 25,
    alignSelf: 'stretch',
    borderWidth: 2,
    fontSize: 23,
    borderColor: '#4796BD',
    borderRadius: 28,
    color: 'black',
  },
  productNameHeader: {
    fontSize: 18,
    paddingLeft: 6,
    fontWeight: 'bold',
    // marginLeft: 50
  },
  itemsHeader: {
    // flex: 0.2,
    fontSize: 18,
    fontWeight: 'bold',
    // marginLeft: 30
  },
  priceHeader: {
    // flex: 0.15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addEmployeeButton: {
    backgroundColor: '#4796BD',
    margin: 40,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    // position:'fixed',
  },
  addEmployeeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    // padding:6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  inputBox: {
    borderRadius: 10,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
  },
  product_titles: {
    fontSize: 24,
    color: '#122E40',
    marginTop: 25,
    marginBottom: 20,
    alignSelf: 'center',
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
});
