import React, { Component } from 'react';
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

const InventoryListScreen = ({ navigation }) => {
  // export default class InventoryListScreen extends Component {
  // componentDidMount() {
  //   console.disableYellowBox = true;
  // }

  // constructor(props) {
  //   super(props);
  // }

  const onEditPressed = selectedID => {
    // console.warn(selectedID)
    Alert.alert(
      `edit pressed of id ${selectedID}`,
      '',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false },
    );
  };

  const onDeletePressed = selectedID => {
    console.warn(selectedID);
    Alert.alert(
      `delete pressed of id ${selectedID}`,
      '',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false },
    );
  };


  return (
    <Container style={{ backgroundColor: '#F3F9FB' }}>
      <HeaderView navigation={navigation} title={"Inventory"} />
      <Content>
        {/* the entire outerpart */}
        <Body style={styles.listContainer}>
          {/* the header of table */}
          <View style={styles.tableHeader}>
            <CardItem style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
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
                data={DEMO_INVENTORY_DATA}
                // scrollEnabled={true}
                renderItem={({ item }) => (
                  <InventoryListItem
                    onEditPressed={data => onEditPressed(data)}
                    onDeletePressed={data => onDeletePressed(data)}
                    item={item}
                  />
                )}
                keyExtractor={item => item.id}
              />
            </View>
          </ScrollView>

          {/* the add employee button */}
          <TouchableOpacity
            style={styles.addEmployeeButton}
            // onPress={() => navigation.navigate('AddEmployee')}
            onPress={() => {
              Alert.alert(
                'Product addition page to be added here',
                '',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
              );
            }}
          >
            <Icon name="plus" color="white" size={25} />
            <Text style={styles.addEmployeeButtonText}>Add Employee</Text>
          </TouchableOpacity>
        </Body>
      </Content>
    </Container>
  );

}

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
  },
  productNameHeader: {
    flex: 0.39,
    fontSize: 18,
    paddingLeft: 6,
    fontWeight: 'bold',
  },
  itemsHeader: {
    flex: 0.2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceHeader: {
    flex: 0.15,
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
});