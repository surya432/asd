import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import RandDScreen from './screens/RandDScreen';
import ProfileScreen from './screens/ProfileScreen';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
        },
        RnD: {
            screen: RandDScreen,
        },
        Profile: {
            screen: ProfileScreen,
        },

    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'ios-home';
                } else if (routeName === 'RnD') {
                    iconName = 'ios-flask';
                } else if (routeName === 'Profile') {
                    iconName = 'ios-person';
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
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: 'bottom'
    },
);
export default createAppContainer(TabNavigator);
