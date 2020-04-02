import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import GlobalStyles from '../Components/GlobalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Container, Content } from 'native-base';
import Fontisto from "react-native-vector-icons/Fontisto";
import NotifService, { onRegister, onNotif, getTokenFCM } from './../Components/NotifService';
export default class Formtask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonDataParse: {}
        }
        this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
        getTokenFCM()
    }
    getImageStatus2 = (param) => {
        switch (param) {
            case 'On Progress':
                return "hourglass-half"
            case 'Mulai':
                return "hourglass-start"
            case 'Selesai':
                return "hourglass-end"
        }
    }
    getcolorStatus2 = (param) => {
        switch (param) {
            case 'On Progress':
                return "green"
            case 'Mulai':
                return "gray"
            case 'Selesai':
                return "blue"
        }
    }
    _onPressBack = async () => {
        this.props.navigation.navigate('Dashboard');
    }
    async componentDidMount() {
        this.setState({
            jsonDataParse: JSON.parse(this.props.navigation.state.params.dataObject)
        })
    }
    render() {
        const uri =
            'https://facebook.github.io/react-native/docs/assets/favicon.png';
        const { jsonDataParse } = this.state
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container>

                    <Content padder>
                        <View style={{ alignItems: "flex-end", height: 50 }}>
                            <TouchableOpacity onPress={this._onPressBack.bind(this)}>
                                <Ionicons name="md-close-circle-outline" size={35} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 8 }}>
                            <View style={styles.containerImage}>
                                <Fontisto style={{
                                    width: 24,
                                    height: 24,
                                }} name={this.getImageStatus2(jsonDataParse.status)} color={this.getcolorStatus2(jsonDataParse.status)} size={24} />

                            </View>
                            <View
                                style={{
                                    marginTop: 8,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={{ fontSize: 20, fontWeight: '700' }}>
                                    {jsonDataParse.perkerjaan}
                                </Text>
                                <Text style={{ fontSize: 12, marginTop: 4 }}>
                                    {jsonDataParse.status}
                                </Text>
                                <Text style={{ marginTop: 4, textAlign: "justify" }}>
                                    {jsonDataParse.keterangan}
                                </Text>
                            </View>
                        </View>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1
    },
    containerImage: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: "white",
        borderColor: 'gray',
        borderWidth: 2,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
})
