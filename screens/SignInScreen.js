import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import apiLogin from '../services/apiLogin';
import axios from 'axios';

export default function SignInScreen() {
    const [credentials, setCredentials] = React.useState({
        firstname: '',
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const [isSubmitting, setIsSubmitting] = React.useState(true);
    const resetPassword = () => {
        setCredentials({
            ...credentials,
            password: '',
            confirm_password: '',
        });
        this.passwordInput.clear();
        this.confirmPasswordInput.clear();
        this.passwordInput.focus();
    }

    const submit = () => {
        if (credentials.name && credentials.firstname && credentials.email && credentials.password && credentials.confirm_password !== '') {
            setIsSubmitting(false);
        }
        else {
            setIsSubmitting(true);
        }
    }

    const handleSignIn = async () => {
        if (credentials.password !== credentials.confirm_password) {
            Alert.alert('Password error', 'Passwords do not match', [
                { text: 'OK', onPress: () => [resetPassword(), submit()] },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
            ]
            );
        }
        else {
            console.log('credentials', credentials);
            await apiLogin.get('/sanctum/csrf-cookie');
            await apiLogin.post('https://wib.preprod.wizz-art.be/api/register', credentials)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.success === true) {
                        Alert.alert('Success', 'You have successfully registered', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
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
    }



    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>
                Sign In Screen
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Firstname'
                onChangeText={(text) => {
                    setCredentials({
                        ...credentials,
                        firstname: text,
                    });
                    submit();
                }
                }
            />
            <TextInput
                style={styles.input}
                placeholder='Lastname'
                onChangeText={(text) => {
                    setCredentials({
                        ...credentials,
                        name: text,
                    });
                    submit();
                }
                }
            />
            <TextInput
                style={styles.input}
                placeholder='Email'
                onChangeText={(text) => {
                    setCredentials({
                        ...credentials,
                        email: text,
                    });
                    submit();
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
                    submit();
                }
                }
                ref={input => { this.passwordInput = input; }}
            />
            <TextInput
                style={styles.input}
                placeholder='Confirm Password'
                onChangeText={(text) => {
                    setCredentials({
                        ...credentials,
                        confirm_password: text,
                    });
                    submit();
                }
                }
                ref={input => { this.confirmPasswordInput = input; }}
            />
            <Button
                title='Sign In'
                color='#841584'
                onPress={handleSignIn}
            //disabled={isSubmitting}
            />
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
