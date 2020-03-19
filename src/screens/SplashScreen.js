import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Body, } from 'native-base'
import { StackActions } from '@react-navigation/native';


export default class SplashScreen extends React.Component {

    componentDidMount = async () => {
        try {
            const checkVar = await AsyncStorage.getItem('is_staff');
            console.log(checkVar)
            if (checkVar) {
                setTimeout(() => this.props.navigation.dispatch(
                    StackActions.replace('Drawer')), 2000)
            }
            else {
                setTimeout(() => this.props.navigation.dispatch(
                    StackActions.replace('LoginScreen')), 2000)
            }
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        return (
            <Container>
                <Content >
                    <Body style={styles.container}>
                        <Text style={styles.heading}>INVENTORY {'\n'} MANAGEMENT</Text>
                        <Image
                            style={{
                                width: 374,
                                height: 300,
                                justifyContent: 'center',
                                marginVertical: 40,
                                marginRight: 10,
                            }}
                            source={require('../Images/Illustration.png')}
                        />

                    </Body>
                </Content>
            </Container>
        )

    }
}
const DEVICE_WIDTH = Dimensions.get('screen').width
const DEVICE_HEIGHT = Dimensions.get('screen').height
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor:'blue',
        height: DEVICE_HEIGHT,
        width: DEVICE_WIDTH,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        textAlign: 'center',
        fontSize: 30,
        color: '#122E40',
        fontWeight: 'bold',
        marginTop: 65,
        lineHeight:50,
        // marginBottom: 10,
        // marginBottom: 10,
    },
})