
import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    Image,
    Animated,
    Easing, Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NotifService, { onRegister, onNotif } from './Components/NotifService';
const { width, height } = Dimensions.get('window');
export class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timePassed: false,
            registerToken: {},
            gcmRegistered: true
        };
        setTimeout(() => {
            this._loadData();
        }, 3000);
        fadeValue: new Animated.Value(0)
        // this._loadData()
    }
    _start = () => {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 2000
        }).start();
    };

    _loadData = async () => {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (isLoggedIn !== "1") {
            console.log("no")
            this.props.navigation.navigate('Auth')
        } else {
            console.log("ok")
            this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
            console.log(this.notif)
            if ('action_data' in this.notif) {
                if (this.notif.flagMsg !== "promo" && isLoggedIn) {
                    this.props.navigation.navigate("Profile", { DATA: JSON.stringify(notif) })
                } else {
                    this.props.navigation.navigate("SendNotifikasiLokal", { DATA: JSON.stringify(notif) })
                }
            } else {
                this.props.navigation.navigate('App')
            }
        }
    }

    render() {
        return (
            <View style={styles.Container}>
                <Animated.View style={[styles.imageContainer, {
                    opacity: this.state.fadeValue, flex: 2, alignItems: "center",
                    justifyContent: "center",
                }]}>
                    <Image source={require('../asset/asset1.png')} style={[styles.Images, { marginTop: 16 }]} />

                </Animated.View>
                <Animated.View style={[styles.imageContainer, { opacity: this.state.fadeValue, flex: 1 }]}>
                    <Text style={[styles.TextHead, {opacity: this.state.fadeValue, paddingHorizontal: 25, marginTop: 18 }]}>Qui laborum pariatur est cupidatat</Text>
                    <Text style={[styles.TextSubtile, { opacity: this.state.fadeValue,paddingHorizontal: 25, marginTop: 6 }]}>Sit minim nulla officia pariatur laborum eiusmod mollit aliquip enim velit ad. Anim commodo sunt culpa amet ipsum ex ut adipisicing commodo qui enim. Ea aute ea anim ipsum minim sit adipisicing tempor.</Text>
                </Animated.View>
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
        alignItems: "center",
    },
    TextHead: {
        fontWeight: "bold",
        fontSize: 26,
        color: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    TextSubtile: {
        fontSize: 12,
        color: "#f2f2f2",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    Images: {
        aspectRatio: 1,
        height: '60%',
        width: "50%",
        resizeMode: "stretch"
    },

})