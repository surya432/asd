import React, { PureComponent } from 'react'
import { Text, StyleSheet, PermissionsAndroid, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import GlobalStyles from '../Components/GlobalStyles';
import { Content, Container } from 'native-base';
import { RNCamera } from 'react-native-camera';
export default class GeoLocation extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            shouldReadBarCode: false,
        }
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
            console.log(data.uri);
        }
    };

    render() {
        const { shouldReadBarCode } = this.state;
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
                            if (this.scanSuccess) return;
                            console.log("bar code detected", JSON.stringify(barcodes));
                            this.scanSuccess = true;
                            if (barcodes[0]) {
                                Alert.alert(
                                    'Success...',
                                    "Hasil Barcode: " + barcodes[0].data,
                                    [
                                        { text: 'OK', onPress: () =>  this.scanSuccess = false },
                                    ],
                                );
                            }

                        }}
                    />
                </View>
            </SafeAreaView >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
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
