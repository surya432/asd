import React, { Component, useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import {
    Container,
    Header,
    Left,
    FooterTab,
    List,
    Right,
    Content,
    Button,
    Thumbnail,
    Body,
    Footer,
    ListItem,
} from 'native-base';
import GlobalStyles from "./../Components/GlobalStyles"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import FilterSheet from '../Components/FilterSheet';
export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            dataUser: {},
            dataResource: []
        };
        this.setDate = this.setDate.bind(this);
    }
    async componentDidMount() {
        this._kondisiAwal();
    }
    async _kondisiAwal() {
        const isLoggedIn = await AsyncStorage.getItem("dataUser");
        const jsonParse = await JSON.parse(isLoggedIn);
        this.setState({ dataUser: jsonParse });
        this.setState({ dataResponse: this._calldata() });
    }
    async _calldata() {
        const { dataUser } = this.state;
        try {
            let response = await fetch('http://10.0.2.2/todoTask/public/taskAll/' + dataUser.id);
            let responseJson = await response.json();
            console.log(responseJson)
            return responseJson.movies;
        } catch (error) {
            console.error(error);
        }
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    _onFilter(value) {
        console.log(value)
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
    render() {
        const formattedDate = moment(new Date()).format("MM/DD/YYYY");
        this.state.chosenDate = formattedDate
        const { dataResponse } = this.state;
        console.log(dataResponse)
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container style={{ backgroundColor: "#gray" }}>
                    <Header noLeft translucent noShadow>
                        <Right>
                            <View style={{ flexDirection: "row" }}>
                                <Feather size={20} active name='refresh-ccw' style={{ marginStart: 8 }} />
                                <MaterialCommunityIcons size={24} onPress={() => this.RBSheet.open()} name='filter-outline' style={{ marginStart: 8 }} />
                                <RBSheet
                                    ref={ref => {
                                        this.RBSheet = ref;
                                    }}
                                    parentCallback={this._onFilter}
                                    height={200}
                                    customStyles={{
                                        container: {
                                            paddingHorizontal: 16
                                        }
                                    }}
                                >
                                    <FilterSheet />
                                </RBSheet>
                            </View>
                        </Right>
                    </Header>
                    <Content>
                        <List>
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail source={require('./../../asset/asset1.png')} />
                                </Left>
                                <Body>
                                    <Text>Kumar Pratik</Text>
                                    <Text note>Doing what you like will always keep you happy . .</Text>
                                </Body>
                                <Right>
                                    <Text note>3:43 pm</Text>
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                    <Footer >
                        <FooterTab>
                            <Button full>
                                <Text>Footer</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container >

            </SafeAreaView>
        )
    }
}

export default HomeScreen

const styles = new StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        marginHorizontal: 15,
    },
    text: {
        paddingHorizontal: 8,
        paddingVertical: 5,
    }
});