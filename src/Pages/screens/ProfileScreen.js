import React, { Component } from 'react'
import { View, StyleSheet, Alert, SafeAreaView, TouchableOpacity } from 'react-native'
import { Button, Container, Header, Content, Footer, Text, Thumbnail } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date(), dataUser: {} };
    }
    async componentDidMount() {
        const isLoggedIn = await AsyncStorage.getItem("dataUser");
        const jsonParse = await JSON.parse(isLoggedIn);
        this.setState({ dataUser: jsonParse[0] });

        console.log(isLoggedIn);
    }
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";

        console.log(this.state.dataUser);
        return (
            <Container  >
                <Header transparent />
                <Content padder >
                    <View style={{ alignItems: "center", marginBottom: 8 }}>
                        <Thumbnail large source={{ uri: uri }} />

                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._logOut}
                    >
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        )
    }
}

export default ProfileScreen
const styles = new StyleSheet.create({

    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
})