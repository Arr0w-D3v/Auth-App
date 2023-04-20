import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen.js';
import SignInScreen from './screens/SignInScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import SettingScreen from './screens/SettingScreen.js';
import CompaniesScreen from './screens/CompaniesScreen.js';
import FormScreen from './screens/FormScreen.js';
import { AuthProvider, AuthContext } from './context/AuthContext.js';
import { useNavigation } from '@react-navigation/native';

import ModalScreen from './screens/ModalScreen.js';

/* function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
} */

/* function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
} */

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {


  const AppInStack = () => {
    return (

      <Stack.Navigator>
        {/* Autres écrans de navigation */}
        <Stack.Screen name="FormScreen" component={FormScreen} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="ModalScreen" component={ModalScreen} />
        </Stack.Group>


      </Stack.Navigator>
    );
  };


  const AuthStack = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            else if (route.name === 'Sign In') {
              iconName = focused ? 'ios-person-add' : 'ios-person-add-outline';
            }
            else if (route.name === 'Login') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Login' component={LoginScreen} />
        <Tab.Screen name="Sign In" component={SignInScreen} />
      </Tab.Navigator>
    );
  };

  const AppStack = () => {

    const { logout } = React.useContext(AuthContext);

    //use navigation


    const navigation = useNavigation();

    const goFormCompany = () => {
      navigation.navigate('AppInStack', { screen: 'FormScreen' });
    }
    const goModal = () => {
      navigation.navigate('AppInStack', { screen: 'ModalScreen' });
    }


    return (
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-cog' : 'ios-cog-outline';
            }
            else if (route.name === 'Companies') {
              iconName = focused ? 'ios-business' : 'ios-business-outline';
            }
            else if (route.name === 'Users') {
              iconName = focused ? 'ios-users' : 'ios-users-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={() => { goModal() }}
                title="Logout"
                color="#000"
              />
            ),
          }}

        />

        <Tab.Screen name="Companies" component={CompaniesScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={() => { goFormCompany() }}
                title="Add"
                color="#000"
              />
            ),
          }}
        />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>

    );
  };

  const AppNav = () => {
    const { userToken, isLoading } = React.useContext(AuthContext);

    if (isLoading) {
      {
        return (
          <View style={styles.container}>
            <ActivityIndicator size={'large'} />
          </View>
        );
      }
    }

    return (
      <NavigationContainer>
        {userToken !== null ? (

          <Stack.Navigator>
            <Stack.Screen name="AppStack" component={AppStack} options={{
              headerShown: false
            }} />
            <Stack.Screen name="AppInStack" component={AppInStack} options={{
              headerShown: false
            }} />
          </Stack.Navigator>

        ) : (
          <AuthStack />
        )}
      </NavigationContainer>

    );
  };



  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});
