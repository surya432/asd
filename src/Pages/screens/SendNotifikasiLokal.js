import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import GlobalStyles from '../Components/GlobalStyles'
import   firebase ,{RemoteMessage} from '@react-native-firebase/messaging';
import FCMService from "./../Components/FCMService";
export default class SendNotifikasiLokal extends Component {
    constructor() {
        super()
    }

    async componentDidMount() {
        FCMService();
        this.messageListener = firebase.messaging().onMessage((message) => {
            // Process your message as required
            console.log(message)
        });
    }

    
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
