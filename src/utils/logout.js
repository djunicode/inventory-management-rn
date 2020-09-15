import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from '@react-navigation/native';

export const logout = async (navigation) => {
    try {
        const auth_key = await AsyncStorage.getItem('auth_key')

        await fetch('http://chouhanaryan.pythonanywhere.com/auth/token/logout/', {
            method: 'POST',
            headers: { Authorization: `Token ${auth_key}` }
        })
            .then((res) => {
                console.log('logout response', res.json())
                return res.json()
            })
            .catch((err) => {
                console.log(err)
            })

        // console.log(await AsyncStorage.getItem('auth_key'));
        await AsyncStorage.removeItem('auth_key'); //Removing the token from local storage while logging out
        // console.log(await AsyncStorage.getItem('auth_key'));
        navigation.replace('LoginScreen')

    } catch (err) {
        console.log(err)
    }

}
