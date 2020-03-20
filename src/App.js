import react from 'react'
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native'
import {
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from './Pages/SplashScreen';
import LoginScreen from './Pages/Auth/LoginScreen';
import DashboardScreen from './Pages/DashboardScreen';
import SignUpScreen from './Pages/Auth/SignUpScreen'
import Formtask from './Pages/screens/Formtask';
const RootStack = createStackNavigator(
    {
        Dashboard: {
            screen: DashboardScreen,
            navigationOptions: { headerShown: false },
        },
        FormTask: {
            screen: Formtask,
            navigationOptions: { headerShown: false },
        }
    },
    {
        defaultNavigationOptions: {
            headerShown: false,
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1,
                fontWeight: 'bold',
            }
        }
    }
)
const AuthStack = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: { headerShown: false },
        },
        SignUpScreen: {
            screen: SignUpScreen,
            navigationOptions: { headerShown: false },
        },
    },
    {
        navigationOptions: { headerShown: false },
    }
);


export default createAppContainer(createSwitchNavigator(
    {
        SplashScreen: SplashScreen,
        App: RootStack,
        Auth: AuthStack
    },
    {
        initialRouteName: "SplashScreen",
        navigationOptions: { headerShown: false },
    }
))