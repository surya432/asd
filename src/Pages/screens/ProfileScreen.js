import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Button, Container, Header, Content, Footer, Text } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';

class ProfileScreen extends Component {
    constructor() {
        super()
        this._getDataUser()
    }
    _getDataUser = async () => {
        const isLoggedIn = await AsyncStorage.getItem("dataUser");
        var dataUserparse = JSON.parse(isLoggedIn);
   
        this.state = {
            dataUser:  dataUserparse[0],
        }
    }
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    render() {
        console.log(this.state.dataUser);
        return (
            <Text>asdasdasd</Text>
        )
    }
}

export default ProfileScreen