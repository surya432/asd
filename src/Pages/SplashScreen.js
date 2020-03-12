import React, { Component } from 'react'
import { } from 'react-native';
import { Text, View, Image, YellowBox, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
YellowBox.ignoreWarnings(['Warning: ...']);
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')
import AsyncStorage from '@react-native-community/async-storage';

export class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timePassed: false
        };
    }
    async getToken(keysData) {
        try {
            let userData = await AsyncStorage.getItem(keysData);
            let data = JSON.parse(userData);
            console.log(data);
            return data;
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    componentDidMount() {
        setTimeout(() => { this.setState({ timePassed: true }) }, 3000);
    }

    setTimePassed() {
        this.setState({ timePassed: true });
    }

    render() {
        if (!this.state.timePassed) {
            return <Text>ini SplashScreen</Text>;
        } else {
            let dataLogin = this.getToken("dataUser");
            if(dataLogin != null){
                return this.props.navigation.navigate('Dashboard')
            }else{
                return this.props.navigation.navigate('LoginScreen')
            }
        }

    }
}

export default SplashScreen

const styles = new StyleSheet.create({
    Container: {
        flex: 1,
    },
    wrapper: {
        backgroundColor: "#003d99",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    TextHead: {
        fontWeight: "bold",
        fontSize: 30,
    },
    TextSubtile: {
        fontSize: 12,
        color: "#f2f2f2"
    },
    Images: {
        width: 250,
        height: 250,
        resizeMode: "cover"
    },

})