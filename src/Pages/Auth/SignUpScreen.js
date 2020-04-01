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
import { base_url } from '../../config/config';
export default class SignUpScreen extends Component {
    constructor() {
        super();
        this.state = {
            spinner: false,
            formData: {
                edtName: '',
                edtEmail: '',
                edtPass: '',
                edtPassConfirm: '',
            }
        };
    }
    _onPressLogin = async () => {
        this.props.navigation.navigate('LoginScreen');
    }
    _onPressSignUp = async () => {
        const { edtEmail, edtName, edtPass, edtPassConfirm } = this.state.formData
        if (edtName.length == 0) {
            alert("Field Nama Kosong!")
            return;
        }
        if (edtEmail.length == 0) {
            alert("Field Email Kosong!")
            return;
        }
        if (edtPass.length == 0) {
            alert("Field Password Kosong!")
            return;
        }
        if (edtPassConfirm.length == 0) {
            alert("Field Password Konfirmasi Kosong!")
            return;
        }
        if (edtPassConfirm != edtPass) {
            alert("Password Konfirmasi Tidak Sama dengan Password")
            return;
        } else {
            this.setState({
                spinner: true
            })
            setTimeout(() => {
                this._fecthSignUp();
            }, 2000);
            console.log(this.state.formData)
        }
    }
    _fecthSignUp = async () => {
        const { edtEmail, edtName, edtPass, edtPassConfirm } = this.state.formData
        var details = {
            'nama': edtName,
            'email': edtEmail,
            'password': edtPass,
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody)
        return await fetch(base_url + "create/user", {
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
                    Alert.alert("Berhasil", responseJson.keterangan)
                    this.props.navigation.goBack(null)
                    return;
                } else {
                    Alert.alert("Error", responseJson.keterangan)
                    return;
                }
            }).catch((error) => {
                alert(error)
                this.setState({
                    spinner: false
                })
                console.log(error)
            });
    }
    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                colors={['#2980B9', '#6DD5FA', "#FFFFFF"]}
                style={styles.Container}>
                <View style={styles.cardLogin} >
                    <Spinner
                        backgroundColor={"white"}
                        borderRadius="15"
                        visible={this.state.spinner}
                        textContent={'Tunggu Sebentar...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <Text style={[styles.textView]}>Sign Up</Text>
                    <View style={styles.InputContent}>
                        <TextInput style={styles.TextInput}
                            autoCompleteType={"off"}
                            autoCorrect={false}
                            autoCapitalize='none'
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.edtEmailAddress.focus(); }}
                            blurOnSubmit={false}
                            onChangeText={(edtName) => this.setState(prevState => ({
                                formData: {
                                    ...prevState.formData,
                                    edtName
                                }
                            }))}
                            placeholder={"Your Name"} />
                        <TextInput style={styles.TextInput}
                            autoCompleteType={"off"}
                            keyboardType={"email-address"}
                            autoCorrect={false}
                            autoCapitalize='none'
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.edtPassword.focus(); }}
                            blurOnSubmit={false}
                            ref={(input) => { this.edtEmailAddress = input; }}
                            onChangeText={(edtEmail) => this.setState(prevState => ({
                                formData: {
                                    ...prevState.formData,
                                    edtEmail
                                }
                            }))}
                            placeholder={"Email Address"} />
                        <TextInput
                            onChangeText={(edtPass) => this.setState(prevState => ({
                                formData: {
                                    ...prevState.formData,
                                    edtPass
                                }
                            }))}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            ref={(input) => { this.edtPassword = input; }}
                            style={styles.TextInput}
                            onSubmitEditing={() => { this.edtconfirmPassword.focus(); }}
                            placeholder={"Password"} />
                        <TextInput
                            onChangeText={(edtPassConfirm) => this.setState(prevState => ({
                                formData: {
                                    ...prevState.formData,
                                    edtPassConfirm
                                }
                            }))}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            ref={(input) => { this.edtconfirmPassword = input; }}
                            style={styles.TextInput}
                            placeholder={"Confirm Password"} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={this._onPressSignUp.bind(this)}>
                            <LinearGradient
                                start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                                colors={['#ff5722', '#ff9800']}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Create Account Now</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._onPressLogin.bind(this)}>
                            <Text style={styles.buttonTextLogin}>Back To Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        );
    }
}


const styles = new StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16
    },
    spinnerTextStyle: {
        color: '#FFF'
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