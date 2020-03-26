import React, { Component } from 'react'
import { Text, StyleSheet, PermissionsAndroid, View, SafeAreaView } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import GlobalStyles from '../Components/GlobalStyles';
import { Content, Container } from 'native-base';
import { getDistance, getPreciseDistance } from 'geolib';
export default class GeoLocation extends Component {
    constructor() {
        super()
        this.state = {
            geolng: "",
            geolat: "",
            error: null,
            address: null,
            jarak: null,
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

                    let jarakDistance = getDistance(
                        { latitude: lat1, longitude: lng1 },
                        { latitude: -7.446792, longitude: 112.697697 }, 1
                    );
                    this.setState({
                        geolat: lat1,
                        geolng: lng1,
                        jarak: jarakDistance
                    })
                },
                (error) => {
                    this.setState.error = error.message
                    console.log(error.code, error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    async _ditDistance(jarak) {
        return jarak
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
                        <View style={{ flex: 1 }}>
                            {
                                error ? <Text>{error}</Text> : <Text>Koordinat Sekarang: {geolat},{geolng}. </Text>
                            }
                            <Text>Koordinat Tujuan: -7.446792, 112.697697 . </Text>
                            <Text>Jarak {jarak} M</Text>
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({})
