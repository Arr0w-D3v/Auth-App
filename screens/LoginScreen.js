import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import apiLogin from '../services/apiLogin';
import asyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen() {

    const {login } = React.useContext(AuthContext);

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = React.useState(false);

    /* const saveToken = async (token) => {
        try {
            await asyncStorage.setItem('token', token);
        } catch (e) {
            console.log(e);
        }
    }
    const getToken = async () => {
        try {
            const value = await asyncStorage.getItem('token');
            if (value !== null) {
                console.log(value);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleLogin = async () => {
        console.log('credentials', credentials);
        setLoading(true);
        await apiLogin.get('/sanctum/csrf-cookie');
        await apiLogin.post('https://wib.preprod.wizz-art.be/api/login', credentials)
            .then((response) => {
                console.log(response.data);
                if (response.data.success === true) {
                    Alert.alert('Success', 'You have successfully logged in', [
                        {
                            text: 'OK', onPress: () => [console.log('OK Pressed'),
                            setLoading(false),
                            saveToken(response.data.data.token), 
                            getToken()]
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
    } */

    return (
        <View style={styles.container}>
            {loading !== true ? (
                <>
                    <Text style={styles.paragraph}>
                        Login Screen
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        onChangeText={(text) => {
                            setCredentials({
                                ...credentials,
                                email: text,
                            });
                        }
                        }
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        onChangeText={(text) => {
                            setCredentials({
                                ...credentials,
                                password: text,
                            });
                        }
                        }
                    />
                    <Button
                        title='Login'
                        color='#841584'
                        onPress={() => { login(credentials) }}
                    />
                </>
            ) : (
                <SafeAreaView>
                    <ActivityIndicator size={'large'} />
                </SafeAreaView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        width: "60%",
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
    },
});
