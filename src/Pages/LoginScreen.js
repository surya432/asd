import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            hobby: '',
            edtUserName: '',
            edtPass: '',
            response: "",
            dataUser: [],
            isLogin: false
        };
    }

    _onPressLogin = async () => {
        const { edtUserName, edtPass, dataUser } = this.state;

        if (edtUserName.length < 1 && edtPass.length < 1) {
            alert("Form Belum Di isi Semua")
        } else if (edtUserName.length < 1) {
            alert("Email belum di isi");
        } else if (edtPass.length < 1) {
            alert("Password Belum Di isi");
        } else {
            // console.log(loginResponse);
            this._fectLogin();
            // console.log(dataUser);
        }

    }
    componentWillMount() {
        console.log(this.getToken("dataUser"));
        let dataLogin = this.getToken("dataUser");
        if(dataLogin != null){
            this._goDashboard()
        }
    }
    _goDashboard(){
        this.props.navigation.navigate('Dashboard')

    }
    _fectLogin() {
        const { edtUserName, edtPass, dataUser } = this.state;
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
        formBody = formBody.join("&");
        fetch("http://47.75.169.97/todo/public/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.kode == 1) {
                    console.log(responseJson.data);
                    this.storeToken("dataUser",JSON.stringify(responseJson.data))
                    this._goDashboard()
                } else {
                    alert(responseJson.keterangan)
                }
            })
            .catch((error) => {
                console.error("error " + error);
                return null;

            });

    }
    async storeToken(keysData,values) {
        try {
            await AsyncStorage.setItem(keysData, JSON.stringify(values));
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    async getToken(keysData) {
        try {
            let userData = await AsyncStorage.getItem(keysData);
            let data = JSON.parse(userData);
            console.log(data);
            return data;
        } catch (error) {
            console.log("Something went wrong", error);
        }
    }
    render() {
        return (
            <LinearGradient
                start={{ x: 1, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#1e3c72', '#3b5998', '#192f6a']}
                style={styles.Container}>
                <View style={styles.cardLogin} >
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
                                colors={['#ff5722', '#ff9800', '#ffc107']}
                                style={styles.button}>
                                <Text style={styles.button}>LOGIN</Text>
                            </LinearGradient>
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
        padding: 16,
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
        width: 150,
        height: 50,
        marginVertical: 8,

        paddingVertical: 10,

    },
    button: {
        textAlign: "center",
        borderRadius: 8,
        marginVertical: 5,
        color: "white",
        alignContent: "center",
        padding: 5,

    },
});
