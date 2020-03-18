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
import AsyncStorage from '@react-native-community/async-storage';
export default class SignUpScreen extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            isLoading: false,
            hobby: '',
            edtUserName: '',
            edtPass: '',
            response: "",
            dataUser: [],
            isLogin: false
        };
    }
    _onPressLogin = async () => {
        this.props.navigation.navigate('LoginScreen');
    }
    _onPressSignUp = async () => {

    }
    render() {
        return (
            <LinearGradient
                start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                colors={['#1e3c72', '#3b5998', '#1e90ff']}
                style={styles.Container}>
                <View style={styles.cardLogin} >
                    <Text style={[styles.textView]}>Sign Up</Text>
                    <View style={styles.InputContent}>
                        <TextInput style={styles.TextInput}
                            autoCompleteType={"off"}
                            autoCorrect={false}
                            autoCapitalize='none'
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.edtEmailAddress.focus(); }}
                            blurOnSubmit={false}
                            onChangeText={(edtUserName) => this.setState({ edtUserName })}
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
                            onChangeText={(edtUserName) => this.setState({ edtUserName })}
                            placeholder={"Email Address"} />
                        <TextInput
                            onChangeText={(edtPass) => this.setState({ edtPass })}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            ref={(input) => { this.edtPassword = input; }}
                            style={styles.TextInput}
                            onSubmitEditing={() => { this.edtconfirmPassword.focus(); }}
                            placeholder={"Password"} />
                        <TextInput
                            onChangeText={(edtPass) => this.setState({ edtPass })}
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