import React, { Component } from 'react'
import { Text, StyleSheet, SafeAreaView, Alert } from 'react-native'
import { Container, Content, Form, Item, Label, Input, DatePicker, Textarea, Button } from 'native-base'
import Moment from "moment"
import AsyncStorage from '@react-native-community/async-storage';
import NotifService, { onRegister, onNotif, getTokenFCM } from './../Components/NotifService';
import { ServiceTaskListFilter } from '../../services/ServiceTaskListFilter'
export default class FormtaskCreate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            perkerjaan: "",
            status: "",
            tglmulai: "",
            tglselesai: "",
            keterangan: "",
            id: "",
            user_id: "",
        }
        this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
        getTokenFCM()
        this.getDataAwal()
    }
    handleChange(evt) {
        const value = evt.target.value; const key = evt.target.name;
        this.setState({ key: value });
    }
    getDataAwal = async()=>{
        const isLoggedIn = await AsyncStorage.getItem('dataUser');
        const jsonParse = await JSON.parse(isLoggedIn);
        this.setState({
            user_id: jsonParse.id,
            status: "Mulai",
            tglmulai: Moment(new Date()).format('YYYY-MM-DD'),
            tglselesai: Moment(new Date()).format('YYYY-MM-DD'),
        })
    }
    async UNSAFE_componentWillMount() {
        const isLoggedIn = await AsyncStorage.getItem('dataUser');
        const jsonParse = await JSON.parse(isLoggedIn);
        this.setState({
            user_id: jsonParse.id,
            status: "Mulai",
            tglmulai: Moment(new Date()).format('YYYY-MM-DD'),
            tglselesai: Moment(new Date()).format('YYYY-MM-DD'),
        })
    }
    static navigationOptions = ({ navigation }) => ({
        title: "Form Task Create",
        headerTitleStyle: {
            textAlign: "left",
            fontFamily: "OpenSans-Regular",
            fontSize: 24
        },
        headerTintColor: "black",
        headerRightContainerStyle: {
            paddingRight: 10
        },
    });
    onValueChangeDatePickertglmulai(value) {
        this.setState({
            tglmulai: Moment(value).format('YYYY-MM-DD'),
        });
        console.log(this.state.tglmulai)
    }
    onValueChangeDatePickertglselesai(value) {
        this.setState({
            tglselesai: Moment(value).format('YYYY-MM-DD'),
        });
        console.log(this.state.tglmulai)
    }
    onValueChangeKeterangan = (event) => {
        const { eventCount, target, text } = event.nativeEvent;
        this.setState({ keterangan: text });
    };
    onHalderPerkerjaan = (event) => {
        const { eventCount, target, text } = event.nativeEvent;
        this.setState({ perkerjaan: text });
    };

    onSubmit() {
        Alert.alert(
            'Peringatan!',
            'Apa Anda yakin ingin menyimpan?',
            [
                { text: 'Tidak', onPress: () => console.log('Cancel Delete'), style: 'cancel' },
                { text: 'Simpan', onPress: () => this.onUpdate() },
            ],
        );
    }
    onUpdate = async () => {
        const { id, perkerjaan, status, tglmulai, tglselesai, keterangan, user_id } = this.state
        if (perkerjaan.length == 0) {
            alert("Field perkerjaan Kosong!")
            return;
        }
        if (status.length == 0) {
            alert("Field status Kosong!")
            return;
        }
        if (tglmulai.length == 0) {
            alert("Field tglmulai Kosong!")
            return;
        }
        if (tglselesai.length == 0) {
            alert("Field tglselesai Kosong!")
            return;
        }
        if (keterangan.length == 0) {
            alert("Field keterangan Kosong!")
            return;
        } else {
            try {
                this.setState({
                    spinner: false
                })
                let filter = {
                    perkerjaan: perkerjaan,
                    status: status,
                    tglStart: tglmulai,
                    tglEnd: tglselesai,
                    keterangan: keterangan,
                    user_id: user_id,
                    id: id,
                }
                console.log(filter);
                const dataList = await ServiceTaskListFilter(filter, "taskcreate2")
                console.log(dataList)
                if (dataList.kode == 1) {
                    alert(dataList.keterangan);
                    this.props.navigation.navigate('Dashboard');
                } else {
                    alert(dataList.keterangan);
                    return;
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    render() {
        const selectedmulai = Moment(new Date()).format('YYYY-MM-DD');
        const selectedselesai = Moment(new Date()).format('YYYY-MM-DD');
        return (
            <SafeAreaView style={styles.Container}>
                <Container>
                    <Content>
                        <Form>
                            <Item stackedLabel>
                                <Label>Perkerjaan</Label>
                                <Input
                                    type="text"
                                    name="perkerjaan"
                                    onChange={this.onHalderPerkerjaan}
                                    value={this.state.perkerjaan}
                                    style={styles.textInput}
                                    placeholder="Perkerjaan" />
                            </Item>
                            <Item stackedLabel>
                                <Label>Tanggal Mulai</Label>
                                <DatePicker
                                    locale={"en"}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            borderBottomWidth: 2,
                                            alignItems: "flex-start"
                                        },
                                        placeholderText: {
                                            fontSize: 17,
                                            color: "white"
                                        },
                                        dateText: {
                                            fontSize: 17,
                                            color: "white",
                                        }
                                    }}
                                    selected={selectedmulai}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    value={selectedmulai}
                                    androidMode={"calendar"}
                                    placeHolderText={selectedmulai}
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#000" }}
                                    onDateChange={this.onValueChangeDatePickertglmulai.bind(this)}
                                    disabled={false}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Tanggal Selesai</Label>
                                <DatePicker
                                    selected={selectedselesai}
                                    locale={"en"}
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            borderBottomWidth: 2,
                                            alignItems: "flex-start"
                                        },
                                        placeholderText: {
                                            fontSize: 17,
                                            color: "white"
                                        },
                                        dateText: {
                                            fontSize: 17,
                                            color: "white",
                                        }
                                    }}
                                 
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    value={selectedselesai}
                                    androidMode={"default"}
                                    placeHolderText={selectedselesai}
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#000" }}
                                    onDateChange={this.onValueChangeDatePickertglselesai.bind(this)}
                                    disabled={false}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Keterangan</Label>
                                <Textarea
                                    rowSpan={5}
                                    style={{ width: "100%", marginHorizontal: 8 }}
                                    bordered placeholder="isi keterangan perkerjaan"
                                    value={this.state.keterangan}
                                    multiline={true}
                                    numberOfLines={4}
                                    onChange={this.onValueChangeKeterangan} />
                            </Item>
                            <Button onPress={this.onSubmit.bind(this)} primary style={{ marginTop: 16, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ justifyContent: "center", color: "white", fontSize: 18 }}>Simpan</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    DatePicker: {
        padding: 5,
        alignItems: 'flex-start'
    },
    textInput: {
        borderBottomColor: 'gray', // Add this to specify bottom border color
        borderBottomWidth: 0.5     // Add this to specify bottom border thickness
    }

})
