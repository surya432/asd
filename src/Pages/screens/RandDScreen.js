import React, { Component } from 'react'
import { Text, SafeAreaView, StyleSheet, } from 'react-native'
import GlobalStyles from '../Components/GlobalStyles';
import { Container, Content, Separator, ListItem } from 'native-base';
import NotifService, { onRegister, onNotif, getTokenFCM } from './../Components/NotifService';

export class RandDScreen extends Component {
    constructor(props) {
        super(props)
        this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
        getTokenFCM()
    }
    _onClickGPS() {
        this.props.navigation.navigate('GeoLocationScreen');
    }
    _onClickGPSDistance() {
        this.props.navigation.navigate('GeoLocationDistance');
    }
    _onClickTakePicture() {
        this.props.navigation.navigate('CameraScreen');
    }
    _onClickTakePicturePick() {
        this.props.navigation.navigate('ImagePicker');
    }
    _onClickTakeBarcode() {
        this.props.navigation.navigate('BarcodeScreen');
    }
    _onClickGPSMap() {
        this.props.navigation.navigate('GeoLocationMap');
    }
    _onClickGeoLocationBackgroud() {
        this.props.navigation.navigate('GeoLocationBackgroud');
    }
    intentKe = (value) => {
        this.props.navigation.navigate(value);
    }
    render() {
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container >
                    <Content padder>
                        <Separator bordered>
                            <Text>Geo Location</Text>
                        </Separator>
                        <ListItem onPress={this._onClickGPS.bind(this)} >
                            <Text>Get Location</Text>
                        </ListItem>
                        <ListItem onPress={this._onClickGPSDistance.bind(this)} >
                            <Text>Get Location Distance</Text>
                        </ListItem>
                        <ListItem onPress={this._onClickGPSMap.bind(this)} >
                            <Text>Get Location With Map</Text>
                        </ListItem>
                        <ListItem onPress={this._onClickGeoLocationBackgroud.bind(this)} >
                            <Text>Get Location Background</Text>
                        </ListItem>

                        <Separator bordered>
                            <Text>Camera</Text>
                        </Separator>
                        <ListItem onPress={this._onClickTakePicture.bind(this)} >
                            <Text>Take Picture</Text>
                        </ListItem>
                        <ListItem onPress={this._onClickTakeBarcode.bind(this)} >
                            <Text>Take Barcode</Text>
                        </ListItem>
                        <ListItem onPress={this._onClickTakePicturePick.bind(this)} >
                            <Text>Picker Image</Text>
                        </ListItem>
                        <Separator bordered>
                            <Text>Notifikasi</Text>
                        </Separator>

                        <ListItem onPress={() => this.intentKe("SendNotifikasiLokal")} >
                            <Text>Send Notifikasi</Text>
                        </ListItem>
                        <Separator bordered>
                            <Text>Transaction</Text>
                        </Separator>

                        <ListItem onPress={() => this.intentKe("Transaction")} >
                            <Text>TransactionScreen</Text>
                        </ListItem>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

export default RandDScreen

