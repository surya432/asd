import React, { Component, useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Alert, RefreshControl } from 'react-native'
import {
    Container,
    Header,
    FooterTab,
    List,
    Right,
    Content,
    Button,
    Footer,
} from 'native-base';
import GlobalStyles from "../Components/GlobalStyles"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import FilterSheet from '../Components/FilterSheet';
import { ServiceTaskListFilter } from '../../services/ServiceTaskListFilter';
import Spinner from 'react-native-loading-spinner-overlay';
import ListitemTask from '../Components/ListitemTask';
import NotifService, { onRegister, onNotif, getTokenFCM } from './../Components/NotifService';
import { HandleErrorCatch } from '../Atom/HandleError';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            dataResponse: [],
            dataFilter: {},
            spinner: false,
        };
        this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
        getTokenFCM()
    }

    CheckConnectivity = () => {
        if (Platform.OS === "android") {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    Alert.alert("You are online!");
                } else {
                    Alert.alert("You are Offline!");
                }
            });
        } else {
            NetInfo.isConnected.addEventListener(
                "connectionChange",
                this.handleFirstConnectivityChange
            );
        }
    };

    handleFirstConnectivityChange = isConnected => {
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
        );
        if (isConnected === false) {
            Alert.alert("You are Offline!");
        } else {
            Alert.alert("You are Online!");
        }
    };

    async componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('didFocus', () => {
            this._kondisiAwal();
        });
    }

    async _kondisiAwal() {
        this.setState({
            dataResponse: [],
        });
        this._calldata()
    }

    async _calldata() {
        try {
            const dataUser = await AsyncStorage.getItem('dataUser')
                .then((result) => JSON.parse(result))
            const dataList = await ServiceTaskListFilter(null, "taskAll/" + dataUser.id)
            if (dataList.kode == 1) {
                this.setState({
                    dataResponse: dataList.data,
                });
                return dataList;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Error", error.message)
        }
    }

    myCallback = async (dataFromChild) => {
        this.spanFilter.close()
        try {
            if (dataFromChild.tgl == "Pilih Tanggal" && dataFromChild.status == "Semua") {
                this._kondisiAwal()
            } else {
                const dataUser = await AsyncStorage.getItem('dataUser')
                    .then((result) => JSON.parse(result))
                const dataList = await ServiceTaskListFilter(dataFromChild, "filterNew/" + dataUser.id)
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
            this.setState({ dataResponse: [] });
            Alert.alert("Error", error.message)
        }
    }
    onDelete = async (items) => {
        console.log(items)
        try {
            this.setState({
                spinner: false
            })
            let filter = {
                id: items,
            }
            console.log(filter);
            const dataList = await ServiceTaskListFilter(filter, "taksDelete")
            console.log(dataList)
            if (dataList.kode == 1) {
                alert(dataList.keterangan);
            } else {
                alert(dataList.keterangan);
            }
            this._kondisiAwal()
        } catch (error) {
            console.log(error)
            this.setState({ dataResponse: [] });
            Alert.alert("Error", error.message)


        }
    }

    handlerOnclick = (items) => {
        this.props.navigation.navigate('FormTask', { dataObject: JSON.stringify(items) });
    }
    handlerOnclickEdit = (items) => {
        console.log(items)
        this.props.navigation.navigate('FormTaskEdit', { dataObject: JSON.stringify(items) });
    }
    handlerOnclickCreate = () => {
        this.props.navigation.navigate('FormtaskCreate');
    }
    handlerOnclickDelete = async (items) => {
        Alert.alert(
            'Peringatan!',
            'Apa Anda yakin ingin Menghapus?',
            [
                { text: 'Tidak', onPress: () => console.log('Cancel Delete'), style: 'cancel' },
                { text: 'Hapus Sekarang', onPress: () => this.onDelete(items) },
            ],
        );
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
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
                                <Button transparent onPress={() => this._kondisiAwal()} >
                                    <Feather size={24} active name='refresh-ccw' style={{ marginStart: 8 }} />
                                </Button>
                                <Button transparent onPress={() => this.spanFilter.open()}>
                                    <MaterialCommunityIcons
                                        size={24}
                                        name='filter-outline' />
                                </Button>
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
                    <Content
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.spinner}
                                onRefresh={() => this._kondisiAwal()}
                                title="Loading..."
                            />
                        }
                    >
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
                                        onclickEdit={this.handlerOnclickEdit}
                                        onclickDelete={this.handlerOnclickDelete}
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
                            <Button block onPress={this.handlerOnclickCreate.bind(this)}>
                                <Text style={{
                                    color: "white", fontSize: 16, fontWeight: "600"
                                }}>Buat Task Baru</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
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