import React, { Component } from 'react'
import { Text, StyleSheet, PermissionsAndroid, View, SafeAreaView } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import GlobalStyles from '../Components/GlobalStyles';
import { Content, Container } from 'native-base';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
export default class GeoLocationMap extends Component {
    constructor() {
        super()
        this.state = {
            geolng: "",
            geolat: "",
            error: null,
            address: null,
            logPosisi: null,
        }
    }
    async UNSAFE_componentWillMount() {
        await this.requestLocationPermission()
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
                        logPosisi: posision
                    })
                },
                (error) => {
                    this.setState.error = error.message
                    console.log(error.code, error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 100
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
    regionFrom(lat, lon, accuracy) {
        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;
        const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
        const lonDelta = (accuracy / oneDegreeOfLongitudeInMeters);

        return {
            latitude: lat,
            longitude: lon,
            latitudeDelta: Math.max(0, latDelta),
            longitudeDelta: Math.max(0, lonDelta)
        };
    }
    render() {
        const { geolng, geolat, error, jarak, logPosisi } = this.state
        
        // console.log()
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <View style={{ flex: 1 }}>
                    {this.viewMap()}

                </View>
            </SafeAreaView>
        )
    }
    viewMap() {
        const { geolat, geolng, logPosisi } = this.state
        if (geolat != "" && geolng != "" & logPosisi != null) {
            const regis = this.regionFrom(logPosisi.coords.latitude,logPosisi.coords.longitude,logPosisi.coords.accuracy)
            return (
                
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={regis}
                    defaultZoom={12}
                    mapType={"hybrid"}
                >
                    <Marker coordinate={{ latitude: geolat, longitude: geolng }}
                        pinColor={"purple"} // any color
                        title={"title"}
                        description={"description"} />
                </MapView>
            )

        } else {
            return (
                <Text>Waiting Get Location</Text>
            )
        }
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})