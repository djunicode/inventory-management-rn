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
} from 'react-native';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import InventoryListItem from '../components/InventoryListItem';
import HeaderView from '../components/HeaderView';

const DEMO_INVENTORY_DATA = [
  {
    id: '1',
    product_name: 'Pat Black',
    items: 200,
    price: '₹45',
  },
  {
    id: '2',
    product_name: 'Angel Jones',
    items: 90,
    price: '₹88',
  },
  {
    id: '3',
    product_name: 'Max Edwards',
    items: 20,
    price: '₹28',
  },
  {
    id: '4',
    product_name: 'Bruce Fox',
    items: 40,
    price: '₹150',
  },
  {
    id: '5',
    product_name: 'Devon Fisher',
    items: 10,
    price: '₹100',
  },
  {
    id: '6',
    product_name: 'Pat Black',
    items: 20,
    price: '₹96',
  },
  {
    id: '7',
    product_name: 'Angel Jones',
    items: 23,
    price: '₹45',
  },
  {
    id: '8',
    product_name: 'Max Edwards',
    items: 75,
    price: '₹50',
  },
  {
    id: '9',
    product_name: 'Bruce Fox',
    items: 78,
    price: '₹74',
  },
  {
    id: '10',
    product_name: 'Devon Fisher',
    items: 20,
    price: '₹78',
  },
  {
    id: '11',
    product_name: 'Pat Black',
    items: 20,
    price: '₹28',
  },
  {
    id: '12',
    product_name: 'Angel Jones',
    items: 20,
    price: '₹28',
  },
];

const InventoryListScreen = ({navigation}) => {
  const [inventoryList, setInventoryList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateSellPrice, setUpdateSellPrice] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [updateProd, setUpdateProd] = useState({});

  useEffect(() => {
    getInventoryList();
  }, []);

  const getInventoryList = async () => {
    const auth_key = await AsyncStorage.getItem('auth_key')
    fetch('http://chouhanaryan.pythonanywhere.com/api/productlist/', {
      method: 'GET',
      headers: {
        "Authorization": `Token ${auth_key}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setInventoryList(data)
      })
      .catch(err => console.log(err));
  };

  const deleteInventoryItem = async inventoryItem => {
    const auth_key = await AsyncStorage.getItem('auth_key')
    fetch(
      `http://chouhanaryan.pythonanywhere.com/api/productlist/${
        inventoryItem.id
      }/`,
      {
        method: 'DELETE',
        headers: {Authorization: `Token ${auth_key}`,}
      },
    );
    console.log('deleted successfully!')
  };

  const updateProductPost = () => {
    const sendObj = {};
    if (updateName !== '') sendObj.name = updateName;
    if (updateSellPrice != null) sendObj.latest_selling_price = updateSellPrice;
    sendObj.loose = updateProd.loose;
    console.log(sendObj);

    fetch(
      `http://chouhanaryan.pythonanywhere.com/api/update/${updateProd.id}/`,
      {
        method: 'POST',
        body: JSON.stringify(sendObj),
      },
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
    setUpdateName('');
    setUpdateSellPrice(null);
  };

  const onMenuPressed = inventoryItem => {
    console.log(inventoryItem);
    Alert.alert(
      `${inventoryItem.name} (Qty: ${inventoryItem.quantity})`,
      `Rs. ${inventoryItem.avg_cost_price}`,
      [
        {
          text: 'Update',
          onPress: () => {
            setUpdateProd(inventoryItem);
            setUpdateName(inventoryItem.name);
            setUpdateSellPrice(inventoryItem.latest_selling_price);
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
    {label: 'Loose', value: true},
    {label: 'Packed', value: false},
  ];

  return (
    <Container style={{backgroundColor: '#F3F9FB'}}>
      <HeaderView navigation={navigation} title={'Inventory'} />

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
            <Text style={styles.product_titles}>Product</Text>
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
                onChangeText={value => {
                  setUpdateSellPrice(value);
                }}
                value={updateSellPrice}
                keyboardType="numeric"
              />
            </Item>
            <RadioForm
              radio_props={radio_props}
              labelHorizontal={true}
              formHorizontal={false}
              buttonColor={'#50C900'}
              labelColor={'#50C900'}
              style={{padding:5}}
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

          {/* the inner list */}
          <ScrollView>
            <View>
              <FlatList
                style={styles.flatlist}
                data={inventoryList}
                // scrollEnabled={true}
                renderItem={({item}) => (
                  <InventoryListItem
                    onMenuPressed={data => onMenuPressed(data)}
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>

          {/* the add employee button */}
        
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
    height: 500,
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
    alignItems: 'center',
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
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
  },
  product_titles: {
    fontSize: 24,
    color: '#122E40',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '5%',
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
