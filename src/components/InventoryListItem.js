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

export default class InventoryListItem extends React.Component {

    componentDidMount() {
        console.disableYellowBox = true;
      }
      
    render() {
        return (
            <View style={listItemStyles.container}>
                <CardItem>

                    <Text style={listItemStyles.name}>{this.props.item.product_name}</Text>
                    <Text style={listItemStyles.items}>{this.props.item.items}</Text>
                    <Text style={listItemStyles.price}>{this.props.item.price}</Text>

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
        flex: 0.44,
        fontSize: 16,
    },
    items: {
        flex: 0.18,
        fontSize: 16,
    },
    price: {
        flex: 0.18,
        fontSize: 16,
    },
    rightButtons: {
        flex: 0.15,
        flexDirection: 'row'
    },
    rightButtonText: {
        fontSize: 12,
        color: '#626262',
        // color:'red',
    },

    // backgroundColor: '#4796BD', blue
    // backgroundColor: '#E0E0E0', grey

})
