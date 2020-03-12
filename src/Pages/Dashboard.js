import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            
        },
        Task: {
            screen: ChatScreen,
        },
        Settings: {
            screen: SettingsScreen,
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'ios-home';
                } else if (routeName === 'Task') {
                    iconName = 'ios-create';
                } else if (routeName === 'Settings') {
                    iconName = 'ios-settings';
                }
                return (
                    <Ionicons
                        name={iconName}
                        size={horizontal ? 20 : 25}
                        color={tintColor}
                    />
                );
            },
            activeTintColor: '#F44336',
            

        }),
    },
);
export default createAppContainer(TabNavigator);
