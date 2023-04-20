

import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext.js';
import { Dropdown } from 'react-native-element-dropdown';
import apiLogin from '../services/apiLogin.js';
import asyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function FormScreen() {
    const { logout, userToken } = React.useContext(AuthContext);
    const navigation = useNavigation();
    const config = {
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    };
    const [data, setData] = React.useState({
        name : '',
        companytype_id : 1,
        language_id : 1,
        description : '',
        bankaccount : {},
        address : '',
    });

    const local_languages = [
        { id: 1, name: 'English' },
        { id: 2, name: 'French' },
        { id: 3, name: 'Spanish' },
        { id: 4, name: 'German' },
        { id: 5, name: 'Italian' },
        { id: 6, name: 'Portuguese' },
    ];


    const submit = async () => {
        const response = await apiLogin.post('/api/companies', data, config);
        if (response.status === 200) {
            Alert.alert('Success', 'Company created', [
                { text: 'OK', onPress: () => navigation.goBack()},
            ]);
        } else {
            Alert.alert('Error', 'Something went wrong', [
                { text: 'OK' },
            ]);
        }

    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Form Screen</Text>
            <TextInput style={styles.input} placeholder='Name company'
            onChangeText={(text) => {
                setData({
                    ...data,
                    name: text,
                });
            }
            }
            />
            <TextInput style={styles.input} placeholder='Address company'
                onChangeText={(text) => {
                    setData({
                        ...data,
                        address: text,
                    });
                }
                }
            />
            <Dropdown
                
                style={styles.dropdown}
                iconStyle={styles.iconStyle}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemTextStyle}
                intemContainerStyle={styles.itemContainerStyle}
                data={local_languages}
                valueFlield={local_languages.id}
                labelFlield={local_languages.name}
                selectedTextProps={{ numberOfLines: 1 } }
                placeholder="Select Language"
                value={data.language_id}
                onChange={(value) => {
                    setData({
                        ...data,
                        language_id: value.id,
                    });
                    console.log(value.id);
                }}             
            />
            <TextInput style={styles.input} placeholder='Description'
                onChangeText={(text) => {
                    setData({
                        ...data,
                        description: text,
                    });
                }
                }
            />
            <Button title='Submit' onPress={() => {
                submit ();
            }
            }
            />


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
    input: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
    },
    dropdown: {
        margin: 16,
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        color: 'black',
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black',
    },
    itemTextStyle: {
        fontSize: 16,
        color: 'black',
    },
    itemContainerStyle: {
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
        color : 'black',
    },

    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    
});
