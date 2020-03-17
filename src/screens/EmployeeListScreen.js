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
    Alert, FlatList,SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity,KeyboardAvoidingView, Dimensions,
} from 'react-native';
import EmployeeListItem from '../components/EmployeeListItem'

const GENDER_MALE = 'Male'
const GENDER_FEMALE = 'Female'

const DEMO_DATA = [
    {
        id: '1',
        name: 'Pat Black',
        gender: GENDER_MALE,
        age: 28,
    },
    {
        id: '2',
        name: 'Angel Jones',
        gender: GENDER_FEMALE,
        age: 36,
    },
    {
        id: '3',
        name: 'Max Edwards',
        gender: GENDER_FEMALE,
        age: 35,
    },
    {
        id: '4',
        name: 'Bruce Fox',
        gender: GENDER_MALE,
        age: 28,

    },
    {
        id: '5',
        name: 'Devon Fisher',
        gender: GENDER_MALE,
        age: 30,

    },
    {
        id: '6',
        name: 'Pat Black',
        gender: GENDER_MALE,
        age: 28,
    },
    {
        id: '7',
        name: 'Angel Jones',
        gender: GENDER_FEMALE,
        age: 36,
    },
    {
        id: '8',
        name: 'Max Edwards',
        gender: GENDER_FEMALE,
        age: 35,
    },
    {
        id: '9',
        name: 'Bruce Fox',
        gender: GENDER_MALE,
        age: 28,

    },
    {
        id: '10',
        name: 'Devon Fisher',
        gender: GENDER_MALE,
        age: 30,

    },
    {
        id: '11',
        name: 'Pat Black',
        gender: GENDER_MALE,
        age: 28,
    },
    {
        id: '12',
        name: 'Angel Jones',
        gender: GENDER_FEMALE,
        age: 36,
    },
];

export default class EmployeeListScreen extends Component {
    constructor(props) {
        super(props);
    }

    onEditPressed = (selectedID) => {
        // console.warn(selectedID)
        Alert.alert(
            `edit pressed of id ${selectedID}`,
            '',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }

    onDeletePressed = (selectedID) => {
        console.warn(selectedID)
        Alert.alert(
            `delete pressed of id ${selectedID}`,
            '',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#F3F9FB' }}>
                <Content >
                    {/* the entire outerpart */}
                    <Body style={styles.listContainer} >

                         {/* the header of table */}
                        <View style={styles.tableHeader}>
                            <CardItem style={{ backgroundColor: 'rgba(255,255,255,0)' }}>
                                <Text style={styles.nameHeader}>Name</Text>
                                <Text style={styles.genderHeader}>Gender</Text>
                                <Text style={styles.ageHeader}>Age</Text>
                            </CardItem>
                        </View>

                        {/* the inner list */}
                        <ScrollView>
                            <View>
                                <FlatList
                                    style={styles.flatlist}
                                    data={DEMO_DATA}
                                    // scrollEnabled={true}
                                    renderItem={({ item }) => <EmployeeListItem
                                        onEditPressed={(data) => this.onEditPressed(data)}
                                        onDeletePressed={(data) => this.onDeletePressed(data)}
                                        item={item} />}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                        </ScrollView>

                        {/* the add employee button */}
                        <TouchableOpacity style={styles.addEmployeeButton}>
                            <Icon name="plus" color="white" size={25} />
                            <Text style={styles.addEmployeeButtonText}>
                                Add Employee
                                </Text>
                        </TouchableOpacity>
        
                    </Body>

                </Content>
            </Container >
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height

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
    nameHeader: {
        flex: 0.39,
        fontSize: 18,
        paddingLeft: 6,
        fontWeight: 'bold',
    },
    genderHeader: {
        flex: 0.25,
        fontSize: 18,
        fontWeight: 'bold',
    },
    ageHeader: {
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
