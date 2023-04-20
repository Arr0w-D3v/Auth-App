import React, { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';
import apiLogin from '../services/apiLogin';
import asyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const login = async (credentials) => {
        console.log('credentials', credentials);
        setIsLoading(true);
        await apiLogin.get('/sanctum/csrf-cookie');
        await apiLogin.post('https://wib.preprod.wizz-art.be/api/login', {
            email: credentials.email,
            password: credentials.password,
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.success === true) {
                    Alert.alert('Success', 'You have successfully logged in', [
                        {
                            text: 'OK', onPress: () => [console.log('OK Pressed'),
                            setIsLoading(false),
                            setUserToken(response.data.data.token),
                                asyncStorage.setItem('userToken' , response.data.data.token),
                            ]

                        },
                    ]
                    );
                }
                else {
                    Alert.alert('Error', 'Wrong credentials', [
                        {
                            text: 'OK', onPress: () => [console.log('OK Pressed'),
                            setIsLoading(false),
                            ]
                        },
                    ]
                    );
                }
            }
            )
            .catch((error) => {
                console.log(error);
            }
            );
    }

    const logout = () => {
        setUserToken(null);
        asyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedon = async () => {
        try {
            setIsLoading(true);
            let userToken = await asyncStorage.getItem('userToken');
            if (userToken !== null) {
                setUserToken(userToken);
            }
            setIsLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        isLoggedon();
    }, []);


    return (
        <AuthContext.Provider value={{ login, logout,  userToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}
