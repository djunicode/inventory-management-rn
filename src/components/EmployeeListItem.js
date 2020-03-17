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

const GENDER_MALE = 'Male'
const GENDER_FEMALE = 'Female'


export default class EmployeeListItem extends React.Component {
    render() {
        return (
            <View style={listItemStyles.container}>
                <CardItem>

                    <Text style={listItemStyles.name}>{this.props.item.name}</Text>
                    <Text style={listItemStyles.gender}>{this.props.item.gender}</Text>
                    <Text style={listItemStyles.age}>{this.props.item.age}</Text>

                    <View style={listItemStyles.rightButtons}>
                        <TouchableOpacity onPress={() => (this.props.onEditPressed(this.props.item.id))}>
                            <Text style={listItemStyles.rightButtonText}>
                                Edit |
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={() => (this.props.onDeletePressed(this.props.item.id))}>
                            <Text style={listItemStyles.rightButtonText}>
                                {' '}Delete
                        </Text>
                        </TouchableOpacity>
                    </View>

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
    },
    name: {
        textAlign: 'left',
        flex: 0.45,
        fontSize: 16,
    },
    gender: {
        flex: 0.25,
        fontSize: 16,
    },
    age: {
        flex: 0.15,
        fontSize: 16,
    },
    rightButtons: {
        flex: 0.25,
        flexDirection: 'row'
    },
    rightButtonText: {
        fontSize: 13,
        color: '#626262',
        // color:'red',
    },

    // backgroundColor: '#4796BD', blue
    // backgroundColor: '#E0E0E0', grey

})
