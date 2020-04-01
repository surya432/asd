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
import FormtaskEdit from './Pages/screens/FormtaskEdit';
import GeoLocationScreen from "./Pages/screens/GeoLocation";
import FormtaskCreate from './Pages/screens/FormtaskCreate'
import GeoLocationDistance from './Pages/screens/GeoLocationDistance'
import CameraScreen from './Pages/screens/CameraScreen'
import BarcodeScreen from './Pages/screens/BarcodeScreen'
import GeoLocationMap from './Pages/screens/GeoLocationMap'
import GeoLocationBackgroud from './Pages/screens/GeoLocationBackgroud'
import SendNotifikasiLokal from './Pages/screens/SendNotifikasiLokal'
import ImagePicker from './Pages/screens/ImagePicker'
import ProfileScreen from './Pages/screens/ProfileScreen'
import TransactionScreen from './Pages/screens/TransactionScreen'
const RootStack = createStackNavigator(
    {

        Dashboard: {
            screen: DashboardScreen,
            navigationOptions: { headerShown: false },
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: { headerShown: false },
        },
        FormTask: {
            screen: Formtask,
            navigationOptions: { headerShown: false },
        },
        GeoLocationScreen: {
            screen: GeoLocationScreen,
            navigationOptions: { headerShown: false },
        },
        GeoLocationDistance: {
            screen: GeoLocationDistance,
            navigationOptions: { headerShown: false },
        },
        CameraScreen: {
            screen: CameraScreen,
            navigationOptions: { headerShown: false },
        },
        BarcodeScreen: {
            screen: BarcodeScreen,
            navigationOptions: { headerShown: false },
        },
        GeoLocationMap: {
            screen: GeoLocationMap,
            navigationOptions: { headerShown: false },
        },
        GeoLocationBackgroud: {
            screen: GeoLocationBackgroud,
            navigationOptions: { headerShown: false },
        },
        SendNotifikasiLokal: {
            screen: SendNotifikasiLokal,
            navigationOptions: { headerShown: false },
        },
        ImagePicker: {
            screen: ImagePicker,
            navigationOptions: { headerShown: false },
        },
        FormTaskEdit: {
            screen: FormtaskEdit,
        },
        Transaction: {
            screen: TransactionScreen,
        },
        FormtaskCreate: {
            screen: FormtaskCreate,
        }
    },
    {
        defaultNavigationOptions: {
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