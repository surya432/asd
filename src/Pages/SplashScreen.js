
import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timePassed: false
        };
        setTimeout(() => {
            this._loadData();
        }, 7000);
        // this._loadData()
    }
    _loadData = async () => {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        this.props.navigation.navigate(isLoggedIn !== "1" ? 'Auth' : 'App')
    }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.imageContainer}>
                    <Image source={require('../asset/asset1.png')} style={styles.Images}></Image>
                    <Text style={[styles.TextHead, { paddingHorizontal: 25, marginTop: 18 }]}>Qui laborum pariatur est cupidatat</Text>
                    <Text style={[styles.TextSubtile, { paddingHorizontal: 25, marginTop: 6 }]}>Sit minim nulla officia pariatur laborum eiusmod mollit aliquip enim velit ad. Anim commodo sunt culpa amet ipsum ex ut adipisicing commodo qui enim. Ea aute ea anim ipsum minim sit adipisicing tempor.</Text>
                </View>
            </View>
        )
    }
}

export default SplashScreen

const styles = new StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "#003d99",
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    TextHead: {
        fontWeight: "bold",
        fontSize: 26,
        color: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
        textAlign:"center",
    },
    TextSubtile: {
        fontSize: 12,
        color: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center",
    },
    Images: {
        width: 300,
        height: 300,
        resizeMode: "stretch"
    },

})