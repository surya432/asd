import React, { PureComponent } from 'react'
import { Text, StyleSheet, PermissionsAndroid, View, SafeAreaView, TouchableOpacity } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import GlobalStyles from '../Components/GlobalStyles';
import { Content, Container } from 'native-base';
import { RNCamera } from 'react-native-camera';
export default class GeoLocation extends PureComponent {
    constructor() {
        super()
        this.getPermission()
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
    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data);

        }
    };
    render() {
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
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
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                        <Text style={{ fontSize: 14 }}> Take Photo </Text>
                                    </TouchableOpacity>
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
            backgroundColor: 'lightgreen',
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
