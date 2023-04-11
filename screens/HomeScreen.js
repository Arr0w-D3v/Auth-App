import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext.js';


export default function HomeScreen() {

    const { logout } = React.useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <Button title="Logout" onPress={() => logout()} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    text: {
        fontSize: 18,
        marginBottom: 12,
    },
});
