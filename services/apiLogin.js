import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const token = AsyncStorage.getItem('token');

const apiLogin = axios.create({
    baseURL: 'https://wib.preprod.wizz-art.be/',
    headers: {
        Authorization: `Bearer ${token}`,   //'Bearer ' + token,
    },
});

export default apiLogin;
