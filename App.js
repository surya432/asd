import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/Pages/SplashScreen';
import LoginScreen from './src/Pages/LoginScreen';
import Dashboard from './src/Pages/Dashboard';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;