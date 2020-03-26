import React, { Component } from 'react'
import { Text, StyleSheet, PermissionsAndroid, View, SafeAreaView } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import GlobalStyles from '../Components/GlobalStyles';
import { Content, Container } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
export default class GeoLocation extends Component {
    constructor() {
        super()
        this.state = {
            geolng: "",
            geolat: "",
            error: null,
            address: null,
        }
        this.requestLocationPermission()

    }

    async getLocation() {
        try {
            let lat1 = ""
            let lng1 = ""
            await Geolocation.getCurrentPosition(
                (posision) => {
                    lat1 = posision.coords.latitude;
                    lng1 = posision.coords.longitude;

                    this.setState({
                        geolat: lat1,
                        geolng: lng1,
                    })
                },
                (error) => {
                    this.setState.error = error.message
                    console.log(error.code, error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 1000
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            this.getLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'App required Location permission',
                        'message': 'We required Location permission in order to get device location' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.getLocation();
                } else {
                    alert("You don't have access for the location");
                }
            } catch (err) {
                alert(err)
            }
        }
    };

    render() {
        const { geolng, geolat, error, jarak } = this.state
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container>
                    <Content padder>
                        <MapView
                            style={{flex:1}}
                            region={{
                                latitude: 31.776685,
                                longitude: 35.234491,
                                latitudeDelta: 0.04,
                                longitudeDelta: 0.05,
                            }}
                        />
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({})
