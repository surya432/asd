import React, { Component } from 'react'
import { Text, StyleSheet, PermissionsAndroid, View } from 'react-native'
import Geolocation from 'react-native-geolocation-service';

export default class GeoLocation extends Component {
    constructor() {
        super()
        this.state = {
            geolng: "",
            geolat: "",
            error: null,
            address: null,
        }
    }
    async getLocation() {
        try {
            Geolocation.getCurrentPosition(
                (posision) => {
                    this.setState({
                        geolat: posision.coords.latitude,
                        geolng: posision.coords.longitude,
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
    async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            alert("You've access for the location");
        } else {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Cool Location App required Location permission',
                        'message': 'We required Location permission in order to get device location ' +
                            'Please grant us.'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    alert("You've access for the location");
                    this.getLocation();
                } else {
                    alert("You don't have access for the location");
                }
            } catch (err) {
                alert(err)
            }
        }
    };
    async UNSAFE_componentWillMount() {
        this.requestLocationPermission()
    }
    render() {
        const { geolng, geolat, error, address } = this.state
        return (
            <View>
                {
                    error ? <Text>Error: {error}</Text> : <Text>{geolat},{geolng}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({})
