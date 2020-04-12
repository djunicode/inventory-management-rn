import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
    Button,
    Body, Input, Container, Content,
    Header, Right,
    Left, Item, Label, Card, CardItem, ActionSheet
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

const GENDER_MALE = 'Male'
const GENDER_FEMALE = 'Female'

const BUTTONS = [
    { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
    { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
    { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
    { text: "Delete", icon: "trash", iconColor: "#fa213b" },
    { text: "Cancel", icon: "close", iconColor: "#25de5b" }
  ];


export default class EmployeeListItem extends React.Component {


    componentDidMount() {
        console.disableYellowBox = true;
    }

    // this.props.onEditPressed(this.props.item.id))}
    render() {

        const {first_name, last_name, gender, age, email} = this.props.item
        return (
            <View style={listItemStyles.container}>
                <CardItem>
                    <TouchableOpacity onPress={() => this.props.onMenuPressed(this.props.item.id)}>
                        <Icon name="menu" color="grey" size={22} style={listItemStyles.icon} />
                    </TouchableOpacity>

        <Text style={listItemStyles.name}>{first_name} {last_name}</Text>
                    <Text style={listItemStyles.gender}>{gender === 'M' ? 'Male' : 'Female'}</Text>
                    <Text style={listItemStyles.email}>{email}</Text>
                    <Text style={listItemStyles.age}>{age}</Text>
                </CardItem>
            </View>
        )
    }
}

const listItemStyles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        borderColor: '#E0E0E0',
        borderWidth: 0.5,
        justifyContent: 'center',
        // backgroundColor:'red',
    },
    icon: {
        paddingRight: 8,
        flex: 0.12,
    },
    name: {
        textAlign: 'left',
        flex: 0.30,
        fontSize: 16,
        paddingHorizontal: 4,
        // backgroundColor:'red',
    },
    gender: {
        flex: 0.25,
        fontSize: 16,
        marginHorizontal: 4,
        // backgroundColor:'cyan',
    },
    email: {
        flex: 0.30,
        fontSize: 13,
        paddingHorizontal: 4,
        flexWrap: 'wrap'
        // backgroundColor:'green',
    },
    age: {
        flex: 0.10,
        fontSize: 15,
        paddingLeft: 10,
        // backgroundColor:'yellow',
    },


    // backgroundColor: '#4796BD', blue
    // backgroundColor: '#E0E0E0', grey

})
