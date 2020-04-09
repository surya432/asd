import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import {
    Container,
    Content,
    Text,
    Thumbnail,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import GlobalStyles from '../Components/GlobalStyles';
import BackgroundTimer from 'react-native-background-timer';

import NotifService, { onRegister, onNotif, getTokenFCM } from './../Components/NotifService';
class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            dataUser: {},
        };
        AsyncStorage.getItem('dataUser')
            .then((result) => {
                this.setState({
                    dataUser: JSON.parse(result)
                })
            })
        this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
        getTokenFCM()
    }
    _logOut = async () => {
        Alert.alert(
            'Peringatan!',
            'Apa Anda yakin ingin Keluar Dari Aplikasi?',
            [
                { text: 'Tidak', onPress: () => console.log('Cancel Delete'), style: 'cancel' },
                { text: 'Lanjutkan', onPress: () => this.onLogout() },
            ],
        );
    };
    onLogout = async () => {
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('dataUser');
        await AsyncStorage.removeItem('fcmToken');
        await AsyncStorage.removeItem('dataUserTask');
        await BackgroundTimer.stopBackgroundTimer()
        this.props.navigation.navigate('Auth');
    }
    render() {
        const uri =
            'https://facebook.github.io/react-native/docs/assets/favicon.png';
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container>
                    <Content padder>
                        <View style={{ alignItems: 'center', marginBottom: 8 }}>
                            <Thumbnail large source={{ uri: uri }} />
                            <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>
                                {this.state.dataUser.nama}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 8 }}>
                                {this.state.dataUser.email}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={this._logOut}>
                            <Text>Log Out</Text>
                        </TouchableOpacity>
                    </Content>
                </Container>
            </SafeAreaView>
        );
    }
}

export default ProfileScreen;
const styles = new StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
});
