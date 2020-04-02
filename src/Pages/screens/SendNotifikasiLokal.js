import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView } from 'react-native'
import GlobalStyles from '../Components/GlobalStyles'
import NotifService, { onRegister, onNotif, getTokenFCM } from './../Components/NotifService';
import { Button } from 'native-base';
export default class SendNotifikasiLokal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonDataParse: {}
        }
        this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
        getTokenFCM()
        if (this.props.navigation.state.params) {
            this.setState({
                jsonDataParse: JSON.parse(this.props.navigation.state.params.DATA)
            })
        }
    }

    async componentWillReceiveProps() {
        if (this.props.navigation.state.params) {
            this.setState({
                jsonDataParse: JSON.parse(this.props.navigation.state.params.DATA)
            })
        }
        console.log("yuhuuu " + JSON.stringify(this.props.navigation.state))
    }
    async componentDidMount() {
        if (this.props.navigation.state.params) {
            this.setState({
                jsonDataParse: JSON.parse(this.props.navigation.state.params.DATA)
            })
        }
        console.log("yuhuuu " + JSON.stringify(this.props.navigation.state))
    }
    sendnotifLokal() {
        console.log("ok notif")
        this.notif.localNotif()
    }
    sendnotifLokalSchedule() {
        console.log("ok notif schedule")
        this.notif.scheduleNotif()
    }
    render() {
        const { jsonDataParse } = this.state
        console.log("SendNotifikasiLokal DATA " + JSON.stringify(jsonDataParse))
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <View style={{ flex: 1, marginHorizontal: 16, marginVertical: 10 }} >
                    <Text>{
                        Object.keys(jsonDataParse).length !== 0 ? JSON.stringify(jsonDataParse) : "Pesan Kosong"
                    }</Text>
                    <Button style={{ marginTop: 8 }} onPress={this.sendnotifLokal.bind(this)} block>
                        <Text style={{ color: "white", marginHorizontal: 5 }}>Send Notif Lokal</Text>
                    </Button>
                    <Button style={{ marginTop: 8 }} onPress={this.sendnotifLokalSchedule.bind(this)} block>
                        <Text style={{ color: "white", marginHorizontal: 5 }}>Send Notif Lokal Schedule 5s</Text>
                    </Button>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({

})
