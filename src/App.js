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
const RootStack = createStackNavigator(
    {
        Dashboard: {
            screen: DashboardScreen,
            navigationOptions: { headerShown: false },
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#1e90ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: 'center',
                flex: 1
            }
        }
    }
)
const AuthStack = createStackNavigator(
    {
        LoginScreen: LoginScreen,
        SignUp: SignUpScreen,
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
    }
))