import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
    Button, Body, Input, Container, Content, Header, Right, Left, Item, Label, Card, CardItem,} from 'native-base';
import {Alert, FlatList, SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity,
    KeyboardAvoidingView, Dimensions,
} from 'react-native';
import HistoryListItem from '../components/HistoryListItem';
import HeaderView from '../components/HeaderView';

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
    },
    {
        id: '3',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '4',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '5',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '6',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '7',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '8',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '9',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '10',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '11',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
    {
        id: '12',
        date: '23 Dec',
        type: 'Buy',
        product: 'Pat Black',
        items: 20,
        price: '₹45',
    },
];

const HistoryScreen = ({ navigation }) => {
    // export default class InventoryListScreen extends Component {
    // componentDidMount() {
    //   console.disableYellowBox = true;
    // }

    // constructor(props) {
    //   super(props);
    // }

    return (
        <Container style={{ backgroundColor: '#F3F9FB' }}>

            <Content>
                {/* the entire outerpart */}
                <Body style={styles.listContainer}>
                    {/* the header of table */}
                    <View style={styles.tableHeader}>
                        <CardItem style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
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
                                data={DEMO_HISTORY_DATA}
                                // scrollEnabled={true}
                                renderItem={({ item }) => (
                                    <HistoryListItem
                                        item={item}
                                    />
                                )}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </ScrollView>
                
                </Body>
            </Content>
        </Container>
    );

}

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
        // flexDirection: 'column',
        // backgroundColor: 'blue',
    },
    flatlist: {
        width: DEVICE_WIDTH - 32,
        backgroundColor: '#fff',
        height: 600,
        borderRadius:10,
    },
    tableHeader: {
        backgroundColor: '#e7eff2',
        width: DEVICE_WIDTH - 32,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    itemsHeader: {
        flex: 0.2,
        fontSize: 18,
        fontWeight: 'bold',
    },
    productHeader: {
        flex: 0.26,
        fontSize: 18,
        fontWeight: 'bold',
    },
    typeHeader: {
        flex: 0.22,
        fontSize: 18,
        fontWeight: 'bold',
    },
    dateHeader: {
        flex: 0.22,
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceHeader: {
        flex: 0.15,
        fontSize: 18,
        fontWeight: 'bold',
    },
});