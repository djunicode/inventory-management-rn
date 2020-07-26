import React, { useState, useEffect, PureComponent } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, AsyncStorage, Alert, ActivityIndicator, CheckBox } from 'react-native';
import {
    Button,
    Body,
    Input, Container, Radio, Label,
    Header, Left, Right,
} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

import { isTokenValid } from '../utils/isTokenValid'
import { logout } from '../utils/logout'

const ProfilePage = ({ navigation }) => {

    const [editMode, toggleEditMode] = useState(false)

    const [firstName, updateFirstName] = useState('John')
    const [lastName, updateLastName] = useState('Doe')
    const [email, updateEmail] = useState('demo@user.com')
    const [gender, updateGender] = useState('M')
    const [age, updateAge] = useState('20')
    const [isStaff, updateIsStaff] = useState(false)

    const [isReady, setReady] = useState(false);

    
    useEffect(() => {
        getCurrentUserInfo();
    }, []);     //called only when component mounted 

    const getCurrentUserInfo = async () => {

        try {
            const tokenValidity = await isTokenValid(navigation)
            console.log('token valid? ',tokenValidity)
            if (tokenValidity){
                const auth_key = await AsyncStorage.getItem('auth_key');

                const res = await fetch('http://chouhanaryan.pythonanywhere.com/auth/users/me/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Token ${auth_key}`,
                    },
                })
    
                const data = await res.json()
                console.log(data)
                const firstName = data.first_name
                const lastName = data.last_name
                const age = data.age.toString()
                const email = data.email
                const gender = data.gender === 'F' ? 'Female' : 'Male'
                const isStaff = data.is_staff
    
                //set user details to state
                updateAge(age)
                updateEmail(email)
                updateFirstName(firstName)
                updateLastName(lastName)
                updateGender(gender)
                updateIsStaff(isStaff)
    
                if (res.status === 200) {
                    setReady(true);
                }
            } else {
                logout(navigation)
            }

        } catch (err) {
            console.log('error' , err)
        }
    }

    const onSavePressed = async () => {

        // validation
        if (firstName === "" || lastName === "" || age === "") {
            if (firstName === "")
                Alert.alert('please enter firstName')
            else if (lastName === "")
                Alert.alert('please enter lastName')
            else if (age === "")
                Alert.alert('please enter age')
        }
        else {
            try {
                let formData = new FormData()
                formData.append('email', email)
                formData.append('first_name', firstName)
                formData.append('last_name', lastName)
                formData.append('age', age)
                // console.log(formData)

                const auth_key = await AsyncStorage.getItem('auth_key');

                const res = await fetch('http://chouhanaryan.pythonanywhere.com/auth/user_update/', {
                    method: 'POST',
                    headers: {
                        Authorization: `Token ${auth_key}`,
                    },
                    body: formData,
                })
                console.log(res)
                console.log(res.status)
                const resJson = await res.json()
                console.log(resJson)
                if (res.status === 200) {
                    Alert.alert('details updated')
                } else {
                    Alert.alert('Error in updating details')
                }
                toggleEditMode(!editMode)
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <Header style={{ backgroundColor: '#4796BD', flexDirection: 'row' }} androidStatusBarColor="#247096">
                <Left>
                    <TouchableOpacity onPress={() => { navigation.navigate('Drawer') }}>
                        <Icon name="home" color="white" size={35} />
                    </TouchableOpacity>
                </Left>
                <Body>
                    <Text style={{ fontSize: 21, color: '#fff' }}>Profile</Text>
                </Body>

            </Header>

            {/* container */}

            {!isReady &&
                <Body style={{ justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                </Body>
            }

            {
                isReady &&
                <View >
                    <View style={{ alignItems:'center',marginTop: 20, }}>
                        {/* <Text style={styles.profileTitle}>  </Text> */}

                        {!editMode && <TouchableOpacity style={styles.editButton} onPress={() => toggleEditMode(!editMode)}>
                            <Icon name="edit" color="#4796BD" size={25} />
                            <Text style={styles.editText}> Edit </Text>
                        </TouchableOpacity>}


                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View floatingLabel style={styles.inputBox}>
                            <Label style={styles.label}>First Name</Label>
                            <Input
                                style={editMode ? styles.inputAreaEditMode : styles.inputAreaViewMode}
                                // placeholder="Username"
                                value={firstName}
                                disabled={editMode ? false : true}
                                onChangeText={val => updateFirstName(val.trim())}
                            />
                        </View>

                        <View floatingLabel style={styles.inputBox}>
                            <Label style={styles.label}>Last Name</Label>
                            <Input
                                style={editMode ? styles.inputAreaEditMode : styles.inputAreaViewMode}
                                // placeholder="Username"
                                value={lastName}
                                disabled={editMode ? false : true}
                                onChangeText={val => updateLastName(val.trim())}
                            />
                        </View>

                        <View style={styles.inputBox}>
                            <Label style={styles.label}>Email</Label>
                            <Input
                                style={styles.inputAreaViewMode}
                                // placeholder="Username"
                                value={email}
                                disabled={true}
                            />
                        </View>


                        <View style={styles.inputBox}>
                            <Label style={styles.label}>Gender</Label>

                            <Input
                                style={styles.inputAreaViewMode}
                                // placeholder="Username"
                                value={gender}
                                disabled={true}
                            />
                        </View>

                        <View style={styles.inputBox}>

                            <Label style={styles.label}>Age</Label>
                            <Input
                                keyboardType="numeric"
                                style={editMode ? styles.inputAreaEditMode : styles.inputAreaViewMode}
                                onChangeText={val => updateAge(val.trim())}
                                value={age}
                                disabled={editMode ? false : true}
                            />
                        </View>


                        <View style={styles.inputBox}>

                            <Label style={styles.label}>is staff?</Label>
                            <Text style={styles.inputAreaViewMode}> {isStaff ? "true" : "false"}</Text>
                        </View>



                        {/* {
                            editMode &&
                            <View style={styles.inputBox}>

                                <Label style={styles.label}> is staff? </Label>
                                <View style={styles.radioGroup}>
                                    <Text style={styles.isStaffText}> true </Text>
                                    <Radio selected={isStaff} />

                                    <Text style={styles.isStaffText}> false </Text>
                                    <Radio selected={!isStaff} />
                                </View>
                            </View>
                        } */}

                        {/* end of userinput */}

                    </View>
                    {/* end of form */}
                    {
                        editMode &&
                        <TouchableOpacity style={styles.saveButton} onPress={() => onSavePressed()}>
                            {/* <Icon name="edit" color="#4796BD" size={25} /> */}
                            <Text style={styles.editText}> Save </Text>
                        </TouchableOpacity>
                    }


                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => {
                            logout(navigation)
                        }}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                </View>}
        </ScrollView>
    );
};
const styles = StyleSheet.create({

    profileTitle: {
        fontSize: 22,
        flex: 1,
        textAlign: 'center'
    },
    editText: {
        color: '#4796BD',
    },
    editButton: {
        // flex: 0.6,
        borderColor: '#4796BD',
        borderWidth: 2,
        width: 200,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        paddingLeft: 5,
        color: '#828282',
        fontSize: 16,
        textAlignVertical: 'center',

    },
    saveButton: {
        // flex: 0.4,
        borderColor: '#4796BD',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 20,
        marginHorizontal: 60,

        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    inputAreaEditMode: {
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginRight: 28,
        marginLeft: 28,
        textAlign: 'center',

        fontSize: 20,
        height: 55,
        // width: '60%'
    },
    inputAreaViewMode: {
        backgroundColor: 'transparent',
        // backgroundColor:'green',
        borderRadius: 10,
        marginRight: 28,
        marginLeft: 28,
        textAlign: 'center',
        // marginVertical: 10,
        fontSize: 20,
        height: 55,
        // flexDirection: 'row',
        flex: 1,
    },
    radioGroup: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    inputBox: {
        flexDirection: 'row',
        borderRadius: 10,
        marginRight: 28,
        marginLeft: 28,
        textAlign: 'left',
        marginVertical: 10,
    },
    isStaffText: {
        fontSize: 20,
        marginLeft: 30,
    },

    logoutButton: {
        backgroundColor: '#4796BD',
        marginHorizontal: 100,
        paddingVertical: 10,
        // paddingHorizontal: ,
        borderRadius: 10,
        // flexDirection: 'row',
        // position:'fixed',
      },
      logoutText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlignVertical: 'center',
        textAlign:'center',
      },

})

export default ProfilePage;

