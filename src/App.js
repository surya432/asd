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
import Dashboard from './Pages/Dashboard';

const RootStack = createStackNavigator({
    Dashboard: Dashboard
}, {
    defaultNavigationOptions: {
        headerShown: false,
        headerStyle: {
            backgroundColor: '#1e90ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            textAlign: 'center',
            flex: 1
        }
    }
})
const AuthStack = createSwitchNavigator({ LoginScreen: LoginScreen });


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