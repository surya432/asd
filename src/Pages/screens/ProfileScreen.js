import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import {
    Button,
    Container,
    Header,
    Content,
    Footer,
    Text,
    Thumbnail,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import GlobalStyles from '../Components/GlobalStyles';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            dataUser: {
                nama: '',
                email: '',
            },
        };
    }
    async componentDidMount() {
        const isLoggedIn = await AsyncStorage.getItem('dataUser');
        const jsonParse = await JSON.parse(isLoggedIn);
        this.setState({
            dataUser: {
                nama: jsonParse.nama,
                email: jsonParse.email,
            },
        });

        console.log(isLoggedIn);
    }
    _logOut = async () => {
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('dataUser');
        this.props.navigation.navigate('Auth');
    };

    render() {
        const uri =
            'https://facebook.github.io/react-native/docs/assets/favicon.png';
        console.log(this.state.dataUser);
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
