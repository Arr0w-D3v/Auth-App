import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';


const apiLogin = axios.create({
    baseURL: 'https://wib.preprod.wizz-art.be/',
    withCredentials: true,
    /* headers: {
        Authorization: `Bearer ${token}`,   //'Bearer ' + token,
    }, */
});

export default apiLogin;
