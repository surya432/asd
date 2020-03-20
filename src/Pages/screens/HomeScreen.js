import React, { Component, useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Alert } from 'react-native'
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
import { ServiceTaskListFilter } from '../../services/ServiceTaskListFilter';
import Spinner from 'react-native-loading-spinner-overlay';
import ListitemTask from '../Components/ListitemTask';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            dataUser: {},
            dataResponse: [],
            dataFilter: {},
            spinner: true
        };
        this.setDate = this.setDate.bind(this);
    }
    async componentDidMount() {
        this._kondisiAwal();
    }

    async _kondisiAwal() {
        this.setState({
            spinner: true
        })
        const isLoggedIn = await AsyncStorage.getItem("dataUser");
        const jsonParse = await JSON.parse(isLoggedIn);
        this.setState({ dataUser: jsonParse });
        this._calldata()
    }
    async _calldata() {
        const { dataUser } = this.state
        const dataList = await ServiceTaskListFilter(null, "taskAll/" + dataUser.id)
        console.log(dataList)
        if (dataList.kode == 1) {
            this.setState({
                spinner: false
            })
            this.setState({ dataResponse: dataList.data });
            return dataList;
        } else {
            this.setState({
                spinner: false
            })
            return null;
        }

    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    myCallback = async (dataFromChild) => {
        try {

            const { dataUser } = this.state
            if (dataFromChild.tgl == "Pilih Tanggal" && dataFromChild.status == "Semua") {
                this._kondisiAwal()
            } else {
                this.setState({
                    spinner: false
                })
                const dataList = await ServiceTaskListFilter(dataFromChild, "filterNew/" + dataUser.id)
                console.log(dataList)
                if (dataList.kode == 1) {
                    this.setState({ dataResponse: dataList.data });
                    return dataList;
                } else {
                    this.setState({ dataResponse: [] });

                    alert(dataList.keterangan);
                    return;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    handlerOnclick = (items) => {
        this.props.navigation.navigate('FormTask', { dataObject: JSON.stringify(items) });
    }
    render() {
        const formattedDate = moment(new Date()).format("MM/DD/YYYY");
        this.state.chosenDate = formattedDate
        const { dataResponse } = this.state;
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container style={{ backgroundColor: "#gray" }}>
                    <Header noLeft translucent noShadow>
                        <Right>
                            <View style={{ flexDirection: "row" }}>
                                <Feather size={20} active name='refresh-ccw' style={{ marginStart: 8 }} />
                                <MaterialCommunityIcons
                                    size={24}
                                    onPress={() => this.spanFilter.open()}
                                    name='filter-outline'
                                    style={{ marginStart: 8 }} />
                                <RBSheet
                                    ref={ref => {
                                        this.spanFilter = ref;
                                    }}
                                    height={200}
                                    customStyles={{
                                        container: {
                                            paddingHorizontal: 16
                                        }
                                    }}
                                >
                                    <FilterSheet
                                        callbackFromParent={
                                            this.myCallback
                                        }
                                    />
                                </RBSheet>
                            </View>
                        </Right>
                    </Header>
                    <Content>
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Tunggu Sebentar...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <List>
                            {
                                dataResponse.map(item => {
                                    return <ListitemTask
                                        key={item.id}
                                        dataObject={item}
                                        onclick={this.handlerOnclick}
                                        status={item.status}
                                        perkerjaan={item.perkerjaan}
                                        tglmulai={item.tglmulai}
                                        tglselesai={item.tglselesai}
                                    />
                                })
                            }
                        </List>
                    </Content>
                    <Footer >
                        <FooterTab>
                            <Button full>
                                <Text style={{
                                    color: "white", fontSize: 16, fontWeight: "400"
                                }}>Buat Task Baru</Text>
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