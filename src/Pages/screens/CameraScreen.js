import React, { PureComponent } from 'react'
import { Text, StyleSheet, PermissionsAndroid, View, SafeAreaView, TouchableOpacity } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import GlobalStyles from '../Components/GlobalStyles';
import { Content, Container, Icon } from 'native-base';
import { RNCamera } from 'react-native-camera';
import RBSheet from "react-native-raw-bottom-sheet";

export default class GeoLocation extends PureComponent {
    constructor() {
        super()
        this.getPermission()
        this.state = ({
            "uripath": null,
            "flashStatus": RNCamera.Constants.FlashMode.off,
            "cameraType": RNCamera.Constants.Type.back
        })
    }
    async getPermission() {
        try {
            if (Platform.OS == 'android') {
                PermissionsAndroid.requestMultiple(
                    [PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,]
                ).then((result) => {
                    if (result['android.permission.ACCESS_COARSE_LOCATION']
                        && result['android.permission.CAMERA']
                        && result['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
                        this.setState({
                            permissionsGranted: true
                        });
                    } else if (result['android.permission.ACCESS_COARSE_LOCATION']
                        || result['android.permission.CAMERA']
                        || result['android.permission.ACCESS_FINE_LOCATION'] === 'never_ask_again') {
                        this.refs.toast.show('Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue');
                    }
                });
            }
        } catch (err) {
            console.warn(err)
        }
    }
    setFlash = async () => {
        if (this.state.flashStatus == 2) {
            this.setState({
                "flashStatus": RNCamera.Constants.FlashMode.off
            })
        } else if (this.state.flashStatus == 1) {
            this.setState({
                "flashStatus": RNCamera.Constants.FlashMode.torch
            })
        } else {
            this.setState({
                "flashStatus": RNCamera.Constants.FlashMode.on
            })
        }

        console.log(this.state.flashStatus)
    }
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.base64);
            this.setState({
                uripath: data.uri
            })
        }
    };
    setIconFlash = (param) => {
        { console.log("adasds" + param) }

        switch (param) {
            case 0:
                return "flash-off"
            case 1:
                return "flash-auto"
            case 2:
                return "flash"
        }
    }
    changePhoto = async () => {
        if (this.state.cameraType == 0) {
            this.setState({
                "cameraType": RNCamera.Constants.Type.front
            })
        } else {
            this.setState({
                "cameraType": RNCamera.Constants.Type.back
            })
        }

    }
    render() {
        const { uripath, flashStatus, cameraType } = this.state
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={cameraType}
                        flashMode={flashStatus}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onGoogleVisionBarcodesDetected={({ barcodes }) => {
                            console.log(barcodes);
                        }}
                    >
                        {({ camera, status, recordAudioPermissionStatus }) => {
                            if (status !== 'READY') return <PendingView />;
                            return (
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={styles.ContentAction}>
                                        <TouchableOpacity onPress={() => this.setFlash()} style={styles.capture}>
                                            <Icon type="MaterialCommunityIcons" name={this.setIconFlash(flashStatus)} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                            <Icon name="camera" type="FontAwesome" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.changePhoto()} style={styles.capture}>
                                            <Icon name="ios-reverse-camera" type="Ionicons" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            );
                        }}
                    </RNCamera>
                </View>
            </SafeAreaView >
        )
    }
}
const PendingView = () => (
    <View
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ContentAction: {
        flexDirection: "row",
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
})
