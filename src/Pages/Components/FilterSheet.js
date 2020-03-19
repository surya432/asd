import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Container, Content, Form, Picker, Icon, DatePicker, Button } from 'native-base'
import Moment from 'moment';
export default class FilterSheet extends Component {
    constructor(props) {
        super(props);
        // Moment.locale('en');
        this.state = {
            valueChangePicker: "",
            valueChangeDatePicker: "",
        };
    }
    onValueChangePicker(value) {
        this.setState({
            valueChangePicker: value,
        });
    }
    onValueChangeDatePicker(value) {
        this.setState({
            valueChangeDatePicker: value,
        });
    }
    onFilter(){
        const {valueChangeDatePicker, valueChangePicker} = this.state;
        const changeMoment = Moment(valueChangeDatePicker).format('YYYY/MM/DD')
        let filter = {
            tgl:changeMoment,
            status:valueChangePicker
        }
        console.log(filter)
    }
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ color: "#000", fontSize: 22, fontWeight: "bold", alignItems: "center" }}>FILTER</Text>
                        </View>
                        {/* DATEPICKER */}
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={{ color: "#000", fontSize: 18 }}>Tanggal:</Text>
                            </View>
                            <View style={{ flex: 4 }}>
                                <DatePicker
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Pilih Tanggal"
                                    textStyle={{ color: "black" }}
                                    placeHolderTextStyle={{ color: "black" }}
                                    onDateChange={this.onValueChangeDatePicker.bind(this)}
                                    disabled={false}
                                >
                                </DatePicker>
                            </View>
                        </View>
                        {/* SPINNER */}
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ flex: 1, justifyContent: "center" }}>
                                <Text style={{ color: "#000", fontSize: 18 }}>Status:</Text>
                            </View>
                            <View style={{ flex: 4 }}>
                                <Picker
                                    mode="dropdown"
                                    iosHeader="Select Status"
                                    iosIcon={<Icon name="arrow-down" />}
                                    style={{ width: undefined }}
                                    selectedValue={this.state.valueChangePicker}
                                    onValueChange={this.onValueChangePicker.bind(this)}
                                >
                                    <Picker.Item label="Semua" value="Semua" />
                                    <Picker.Item label="Mulai" value="Mulai" />
                                    <Picker.Item label="On Progress" value="On Progress" />
                                    <Picker.Item label="Selesai" value="Selesai" />
                                </Picker>
                            </View>
                        </View>
                        {/* BTNFILTER */}
                        <View style={{ alignItems: "center", alignSelf: "center", width: 200 }}>
                            <Button onPress={this.onFilter.bind(this)} style={{ backgroundColor: "#007AFF", borderRadius: 15, paddingHorizontal: 30, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: "white", fontSize: 14 }}>FILTER</Text>
                            </Button>
                        </View>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({})
