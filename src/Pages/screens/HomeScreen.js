import React, { } from 'react'
import { Text, View, StyleSheet, SafeAreaView, Alert, RefreshControl } from 'react-native'
import {
    Container,
    Header,
    FooterTab,
    List,
    Right,
    Content,
    Button,
    Spinner,
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
import Spinner2 from 'react-native-loading-spinner-overlay';
import ListitemTask from '../Components/ListitemTask';
import NotifService, { onRegister, onNotif, getTokenFCM } from './../Components/NotifService';
import CheckConnectivity from './../../Helper/CheckConnectivity'
import BackgroundTimer from 'react-native-background-timer';

export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
            dataResponse: [],
            dataFilter: {},
            spinner: false,
            isRefresh: false,
            countData: 0,
        };
        // BackgroundTimer.runBackgroundTimer(() => {
        //     //code that will be called every 3 seconds 
        //     this._kondisiAwalRefesh()
        // },
        //     1000 * 60 * 15
        // );

        this._kondisiAwal()
    }
    UNSAFE_componentWillMount() {
        this.notif = new NotifService(onRegister.bind(this), onNotif.bind(this));
        getTokenFCM()
        CheckConnectivity()

    }
    async componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('didFocus', () => {
            this._kondisiAwalRefesh()
        });
    }

    async _kondisiAwal() {
        this.setState({
            dataResponse: [],
            countData: 0,
        });
        this._calldata()
    }
    async _kondisiAwalRefesh() {
        try {
            await AsyncStorage.getItem('dataUserTask')
                .then((result) => JSON.parse(result))
                .then((result) => {
                    if (result && result.length > 0) {
                        this.setState({
                            dataResponse: result,
                            isRefresh: true,
                        });
                    } else {
                        this.setState({
                            dataResponse: [],
                            isRefresh: false
                        });
                    }
                })
            this.setState({
                isRefresh: true,
            });
        } catch (error) {
            console.log("_kondisiAwalRefesh" + error)
            Alert.alert("Error", error.message)
        }
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
                await AsyncStorage.setItem('dataUserTask', JSON.stringify(dataList.data))
                return dataList;
            } else {
                await AsyncStorage.setItem('dataUserTask', "[]")
                return null;
            }
        } catch (error) {
            console.log("_calldata" + error)
            Alert.alert("Error", error.message)
        }
    }

    myCallback = async (dataFromChild) => {
        this.spanFilter.close()
        try {
            if (dataFromChild.tgl == "Pilih Tanggal" && dataFromChild.status == "Semua") {
                this._kondisiAwalRefesh()
            } else {
                const dataUser = await AsyncStorage.getItem('dataUser')
                    .then((result) => JSON.parse(result))
                const dataList = await ServiceTaskListFilter(dataFromChild, "filterNew/" + dataUser.id)
                if (dataList.kode == 1) {
                    this.setState({
                        dataResponse: dataList.data,
                        isRefresh: true,
                    });
                    return dataList;
                } else {
                    this.setState({ dataResponse: [] });
                    alert(dataList.keterangan);
                    return;
                }
            }
        } catch (error) {
            console.log(error)
            this.setState({ dataResponse: [], countData: 0 });
            Alert.alert("Error", error.message)
        }
    }
    async updateArray(data) {
        try {
            const dataUser = await AsyncStorage.getItem('dataUserTask')
            const dataUserJson = await JSON.parse(dataUser);
            var index = dataUserJson.findIndex(x => x.id == data.id);
            console.log("Delete Index " + index + dataUserJson.length)
            if (index > -1) {
                dataUserJson.splice(index, 1);
            }
            await AsyncStorage.setItem('dataUserTask', JSON.stringify(dataUserJson))
            this.setState({
                isRefresh: true,
            });
            console.log(dataUserJson.length)
        } catch (error) {
            console.log("updateArray " + error.massage)
        }
    }
    onDelete = async (items) => {
        this.setState({
            spinner: true
        })
        console.log(items)
        try {
            let filter = {
                id: items,
            }
            console.log(filter);
            const dataList = await ServiceTaskListFilter(filter, "taksDelete")
            console.log(dataList)
            if (dataList.kode == 1) {
                this.updateArray(filter).then(() => {
                    this._kondisiAwalRefesh()
                }).then(() => {
                    alert(dataList.keterangan);
                })
            } else {
                alert(dataList.keterangan);
            }
            this.setState({
                spinner: false
            })
        } catch (error) {
            console.log(error)
            Alert.alert("Error", error.message)
        }
    }
    handlerOnclick = (items) => {
        this.props.navigation.navigate('FormTask', { dataObject: JSON.stringify(items) });
    }
    handlerOnclickEdit = (items) => {
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
                {
                    text: 'Hapus Sekarang', onPress: () => this.onDelete(items)
                },
            ],
        );
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        const formattedDate = moment(new Date()).format("MM/DD/YYYY");
        this.state.chosenDate = formattedDate
        const { dataResponse, isRefresh, countData } = this.state;
        console.log("count DataRespond " + dataResponse.length + " " + isRefresh + " " + countData)
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container style={{ backgroundColor: "#gray" }}>
                    <Header noLeft translucent noShadow>
                        <Right>
                            <View style={{ flexDirection: "row" }}>
                                <Button transparent onPress={() => this._kondisiAwalRefesh()} >
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
                                onRefresh={() => this._kondisiAwalRefesh()}
                                title="Loading..."
                            />
                        }
                    >
                        <Spinner2
                            visible={this.state.spinner}
                            textContent={'Tunggu Sebentar...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <List>
                            {
                                dataResponse.length > 0 && dataResponse ?
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
                                    : null
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
const WaitingData = (props) => {
    console.log(props)
    return (
        <View style={styles.ContentWaiting}>
            {props.dataObject < 1 ? <DataKosong /> : <DataWaiting />

            }            {/* {
                
                props.dataObject < 1  ? null : null
            } */}

        </View>
    )
}
const DataKosong = () => {
    return (
        <View style={styles.ContentWaiting}>
            <Text>Data Kosong....</Text>
        </View>
    )
}
const DataWaiting = () => {
    return (
        <View style={styles.ContentWaiting}>
            <Spinner />
            <Text>Tunggu Sebentar....</Text>
        </View>
    )
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
    },
    ContentWaiting: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    }
});