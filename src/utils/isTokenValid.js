import AsyncStorage from '@react-native-community/async-storage';
import { logout } from './logout'

export const isTokenValid = async () => {
    try {
        const auth_key = await AsyncStorage.getItem('auth_key')   // gets auth token from async storage
        // console.log('authkey', auth_key)
        const data = await fetch('http://chouhanaryan.pythonanywhere.com/auth/users/me/', {
            method: "GET",
            headers: {
                "Authorization": `Token ${auth_key}`,
            },
        })
        if (data.ok){
            return true
        } else {
            return false
        }
    } catch (err) {
        return false
    }

}