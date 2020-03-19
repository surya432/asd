import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            spinner: false,
            isLoading: false,
            hobby: '',
            edtUserName: '',
            edtPass: '',
            response: "",
            dataUser: [],
            isLogin: false
        };
    }
    _onPressSignUp = async () => {
        this.props.navigation.navigate('SignUpScreen');
    }

    _onPressLogin = async () => {
        
        const { edtUserName, edtPass } = this.state;
        if (edtUserName.length == 0 && edtPass.length == 0) {
            alert("Form Belum Di isi Semua")
        } else if (edtUserName.length == 0) {
            alert("Email belum di isi");
        } else if (edtPass.length == 0) {
            alert("Password Belum Di isi");
        } else {
            this.setState({
                spinner: true
            })
            setTimeout(() => {
                this._fectLogin();
            }, 2000);
        }
    }
    _fectLogin = async () => {
        const { edtUserName, edtPass } = this.state;
        var details = {
            'email': edtUserName,
            'password': edtPass,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        this.setState.isLoading = true
        formBody = formBody.join("&");
        return await fetch("http://10.0.2.2/todoTask/public/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    spinner: false
                })
                if (responseJson.kode == 1) {

                    try {
                        AsyncStorage.setItem("dataUser", JSON.stringify(responseJson.data))
                        AsyncStorage.setItem("isLoggedIn", "1");
                        this.props.navigation.navigate('Dashboard');

                    } catch (error) {
                        console.log("error " + error)
                    }
                    return
                } else {
                    alert(responseJson.keterangan)
                    return
                }
            }).catch((error) => {
                this.setState.spinner = false
                alert(error)
                console.log(error)
            });

    }

    render() {
        if (this.state.isLoading) {
            return (<StatusBar
                backgroundColor="#b3e6ff"
                barStyle="dark-content"
                hidden={false}
                translucent={true}
            />);
        } else {
            return (
                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                    colors={['#1e3c72', '#3b5998', '#1e90ff']}
                    style={styles.Container}>
                    <View style={styles.cardLogin} >
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Tunggu Sebentar...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <Text style={[styles.textView]}> LOGIN</Text>
                        <View style={styles.InputContent}>
                            <TextInput style={styles.TextInput}
                                autoCompleteType={"off"}
                                keyboardType={"email-address"}
                                autoCorrect={false}
                                autoCapitalize='none'
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                                onChangeText={(edtUserName) => this.setState({ edtUserName })}
                                placeholder={"Email Addres"} />
                            <TextInput
                                onChangeText={(edtPass) => this.setState({ edtPass })}
                                secureTextEntry={true}
                                autoCapitalize='none'
                                ref={(input) => { this.secondTextInput = input; }}
                                style={styles.TextInput}
                                placeholder={"Password"} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={this._onPressLogin.bind(this)}>
                                <LinearGradient
                                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                                    colors={['#ff5722', '#ff9800']}
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this._onPressSignUp.bind(this)}>

                                <Text style={styles.buttonTextLogin}>Sign Up</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </LinearGradient>
            );
        }
    }
}
const styles = new StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16
    },
    cardLogin: {
        backgroundColor: 'white',
        flexWrap: "wrap",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        borderRadius: 10,
        elevation: 8,
    },
    textView: {
        fontSize: 26,
        marginBottom: 16,
        color: "blue",
        fontWeight: "700",

    },
    InputContent: {
        width: "100%",
    },
    TextInput: {
        height: 50,
        marginBottom: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 16,
        padding: 15,

    },
    buttonContainer: {
        alignContent: "center",
        justifyContent: "center",
        width: 170,
        marginVertical: 8,
        paddingVertical: 10,

    },
    buttonText: {
        textAlign: "center",
        borderRadius: 8,
        marginVertical: 5,
        paddingHorizontal: 15,
        color: "white",
        fontSize: 12,
        alignContent: "center",
        padding: 5,
    },
    buttonTextLogin: {
        textAlign: "center",
        borderRadius: 8,
        marginVertical: 5,
        paddingHorizontal: 15,
        color: "black",
        fontSize: 12,
        alignContent: "center",
        padding: 5,
    },
    button: {
        borderRadius: 8,
        marginBottom: 8
    }
});
