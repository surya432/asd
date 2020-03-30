import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import GlobalStyles from '../Components/GlobalStyles'
// import messaging, { firebase } from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
export default class SendNotifikasiLokal extends Component {
    constructor() {
        super()
    }

    async componentDidMount() {
        this._registerFcm();
    }

    _registerFcm = () => {
        this._checkPermissionAndReturnFcmToken()
            .then((fcmToken) => {
                // put your logic to send fcmToken to server or store it in asyncStorage
            })
            .catch((err) => {
                // handle error
            });
    }

    ReturnFcmToken = () => new Promise(async (resolve) => {
        try {
            const fcmToken = await firebase.messaging().getToken();
            // you can put here some logic like storing fcmToken in sharedpreferences
            resolve(fcmToken);
        } catch (err) {
            reject(err);
        }
    });

    _requestPermission = () => new Promise(async (resolve, reject) => {
        try {
            await firebase.messaging().requestPermission();
            resolve();
        } catch (error) {
            // User has rejected permissions
            reject(error);
        }
    })

    _checkPermissionAndReturnFcmToken = () => new Promise(async (resolve, reject) => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            const fcmToken = await this.ReturnFcmToken();

            console.log(fcmToken);
            resolve(fcmToken);
        } else {
            try {
                await RequestPermission();
                const fcmToken = await this.ReturnFcmToken();
                console.log(fcmToken);
                resolve(fcmToken);
            } catch (e) {
                reject(e);
            }
        }
    });
    render() {
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <View style={{ flex: 1 }}>
                    <Text>Hello World</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})
