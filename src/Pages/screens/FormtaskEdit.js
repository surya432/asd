import React, { Component } from 'react'
import { Text, StyleSheet, SafeAreaView, Alert } from 'react-native'
import { Container, Content, Form, Item, Label, Input, DatePicker, Picker, Icon, Textarea, Button } from 'native-base'
import Moment from "moment"
import AsyncStorage from '@react-native-community/async-storage';
import NotifService, { onRegister, onNotif, getTokenFCM } from './../Components/NotifService';
import { ServiceTaskListFilter } from '../../services/ServiceTaskListFilter'
export default class FormtaskEdit extends Component {
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
        // this.getDataAwal()
    }
    handleChange(evt) {
        const value = evt.target.value;        this.setState({ key: value });
    }
    // getDataAwal = async () => {
    //     const isLoggedIn = await AsyncStorage.getItem('dataUser');
    //     const jsonParse = await JSON.parse(isLoggedIn);
    //     this.setState({
    //         user_id: jsonParse.id,
    //         status: "Mulai",
    //         tglmulai: Moment(new Date()).format('YYYY-MM-DD'),
    //         tglselesai: Moment(new Date()).format('YYYY-MM-DD'),
    //     })
    // }
    // async   componentDidMount() {
    //     const isLoggedIn = await AsyncStorage.getItem('dataUser');
    //     const jsonParse = await JSON.parse(isLoggedIn);

    //     const jsonDecode = JSON.parse(this.props.navigation.state.params.dataObject);
    //     this.setState({
    //         perkerjaan: jsonDecode.perkerjaan,
    //         status: jsonDecode.status,
    //         tglmulai: jsonDecode.tglmulai,
    //         tglselesai: jsonDecode.tglselesai,
    //         keterangan: jsonDecode.keterangan,
    //         id: jsonDecode.id,
    //         user_id: jsonParse.id,
    //     })
    // }
    async UNSAFE_componentWillMount() {
        const isLoggedIn = await AsyncStorage.getItem('dataUser');
        const jsonParse = await JSON.parse(isLoggedIn);

        const jsonDecode = JSON.parse(this.props.navigation.state.params.dataObject);
        this.setState({
            perkerjaan: jsonDecode.perkerjaan,
            status: jsonDecode.status,
            tglmulai: jsonDecode.tglmulai,
            tglselesai: jsonDecode.tglselesai,
            keterangan: jsonDecode.keterangan,
            id: jsonDecode.id,
            user_id: jsonParse.id,
        })
    }
    static navigationOptions = () => ({
        title: "Form Task Edit",
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
        // console.log(this.state.tglmulai)
    }
    onValueChangeDatePickertglselesai(value) {
        this.setState({
            tglselesai: Moment(value).format('YYYY-MM-DD'),
        });
        // console.log(this.state.tglmulai)
    }
    onValueChangePicker(value) {
        this.setState({
            status: value,
        });
    }
    onValueChangeKeterangan = (event) => {
        const { text } = event.nativeEvent;
        this.setState({ keterangan: text });
    };
    onHalderPerkerjaan = (event) => {
        const { text } = event.nativeEvent;
        this.setState({ perkerjaan: text });
    };

    onSubmit() {
        Alert.alert(
            'Peringatan!',
            'Apa Anda yakin ingin mengupdate?',
            [
                { text: 'Tidak', onPress: () => console.log('Cancel Delete'), style: 'cancel' },
                { text: 'Simpan', onPress: () => this.onUpdate() },
            ],
        );
    }
    onUpdate = async () => {
        const { id, perkerjaan, status, tglmulai, tglselesai, keterangan } = this.state
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
                id: id,
            }
            console.log(filter);
            const dataList = await ServiceTaskListFilter(filter, "taskUpdate2")
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
    render() {
        const { tglmulai, tglselesai, status, keterangan } = this.state
        const selectedmulai = Moment(tglmulai).format('DD/M/YYYY');
        const selectedselesai = Moment(tglselesai).format('DD/M/YYYY');
        let dtStart = selectedmulai.split('/');
        let dtEnd = selectedselesai.split('/');
        const dtStartSelect = new Date(Moment(tglmulai).format('llll'))
        const dtStartMin = new Date(parseInt(dtStart[2]), parseInt(dtStart[1] - 2), parseInt(dtStart[0]))
        const dtStartMax = new Date(parseInt(dtEnd[2]), parseInt(dtEnd[1] - 1), parseInt(dtEnd[0]))
        console.log("dtStart " + dtStartMin + " / " + dtStartMax + " / " + dtStartSelect + "/" + new Date(parseInt(dtStart[2]), parseInt(dtStart[1] - 1), parseInt(dtStart[0])))
        const dtEndSelect = new Date(Moment(tglselesai).format('llll'))
        const dtEndMin = new Date(parseInt(dtStart[2]), parseInt(dtStart[1] - 1), parseInt(dtStart[0]))
        const dtEndMax = new Date(parseInt(dtEnd[2]), parseInt(dtEnd[1]), parseInt(dtEnd[0]))
        console.log("dtEnd " + dtEndSelect + " / " + dtEndMin + " / " + dtEndMax)
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
                                    placeholder="Underline Textbox" />
                            </Item>
                            <Item stackedLabel>
                                <Label>Tanggal Mulai</Label>
                                <DatePicker
                                    minimumDate={dtStartMin}
                                    maximumDate={dtStartMax}
                                    // defaultDate={new Date(parseInt(dtStart[2]),parseInt(dtStart[1]-1),parseInt(dtStart[0]))}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    value={selectedmulai}
                                    format={"dd/mm/yyyy"}
                                    androidMode={"default"}
                                    placeHolderText={selectedmulai}
                                    placeHolderTextStyle={{ color: "#000" }}
                                    onDateChange={this.onValueChangeDatePickertglmulai.bind(this)}
                                    disabled={false}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Tanggal Selesai</Label>
                                <DatePicker
                                    minimumDate={dtEndMin}
                                    maximumDate={dtEndMax}
                                    locale={"en"}
                                    style={styles.DatePicker}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    value={selectedselesai}
                                    placeHolderText={selectedselesai}
                                    placeHolderTextStyle={{ color: "#000" }}
                                    onDateChange={this.onValueChangeDatePickertglselesai.bind(this)}
                                    disabled={false}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>Status</Label>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select Status"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: "100%" }}
                                    selectedValue={status}
                                    onValueChange={this.onValueChangePicker.bind(this)}
                                >
                                    <Picker.Item label="Mulai" value="Mulai" />
                                    <Picker.Item label="On Progress" value="On Progress" />
                                    <Picker.Item label="Selesai" value="Selesai" />
                                </Picker>
                            </Item>
                            <Item stackedLabel>
                                <Label>Keterangan</Label>
                                <Textarea
                                    rowSpan={5}
                                    style={{ width: "100%", marginHorizontal: 8 }}
                                    bordered placeholder="Textarea"
                                    value={keterangan}
                                    multiline={true}
                                    numberOfLines={4}
                                    onChange={this.onValueChangeKeterangan} />
                            </Item>
                            <Button onPress={this.onSubmit.bind(this)} primary style={{ marginTop: 16, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ justifyContent: "center", color: "white", fontSize: 18 }}>Simpan Update</Text>
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
