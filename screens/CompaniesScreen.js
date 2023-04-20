import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext.js';
import apiLogin from '../services/apiLogin.js';
import asyncStorage from '@react-native-async-storage/async-storage';

export default function CompaniesScreen() {
    const { logout, userToken } = React.useContext(AuthContext);
    const [companies, setCompanies] = useState([]);


    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };


    useEffect(() => {
        const getCompanies = async () => {
            const response = await apiLogin.get('/api/companies', config);
            setCompanies(response.data.data);
        }
        getCompanies();
    }, []);




    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Companies Screen</Text>
            {companies.map((company) => (
                <View key={company.id} style={styles.companiesCard}>
                    <Text style={styles.text}>ID: {company.id}</Text>
                    <Text style={styles.text}>Reference:  {company.reference}</Text>
                    <Text style={styles.text}>Name: {company.name}</Text>
                </View>
            ))}
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    text: {
        fontSize: 18,
        marginBottom: 12,
    },
    companiesCard: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 3,
    },
});
