import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, DatePicker, Header, Picker, Icon, Content, Form, Item, Label, Input, } from 'native-base'
const formattedDate = moment(new Date()).format("MM/DD/YYYY");
import moment from 'moment';

const FilterSheet = (props) => {
    state: {
        chosenDate: ""
    }
    
    return (
        <Container>
            <Content>
                <Form>
                    <Picker
                        mode="dropdown"
                        iosHeader="Select your SIM"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.chosenDate}
                        onValueChange={this.onValueChange.bind(this)}
                    >
                        <Picker.Item label="Wallet" value="key0" />
                        <Picker.Item label="ATM Card" value="key1" />
                        <Picker.Item label="Debit Card" value="key2" />
                        <Picker.Item label="Credit Card" value="key3" />
                        <Picker.Item label="Net Banking" value="key4" />
                    </Picker>
                </Form>
            </Content>
        </Container>
    )
}

export default FilterSheet

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        borderColor: "black"
    },
    titleFilter: {
        fontWeight: "bold",
        fontSize: 28,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    rowContainer: {
        flexDirection: "row",
        height: 50
    }

})
