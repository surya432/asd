import React, { Component } from 'react'
import { Text, StyleSheet, View, Alert, Image } from 'react-native'
import { Container, Content, Icon, Footer, Thumbnail } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class TransactionScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Form Take Order",
        headerTitleStyle: {
            textAlign: "left",
            fontFamily: "OpenSans-Regular",
        },
        headerTintColor: "black",
        headerRightContainerStyle: {
            paddingRight: 10
        },
        headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "space-around" }}>
                <TouchableOpacity onPress={() => navigation.navigate("storiesList")}>
                    <Icon type="FontAwesome" size={12} name="shopping-cart" />
                </TouchableOpacity>
            </View>
        )
    });

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            totalPrice: 0,
            itemCart: false
        };
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    dataCart() {
        Alert.alert("Click", "You Click")
    }
    btnTambahBarang() {
        this.setState({
            totalPrice: 70000,
            itemCart: true
        })
    }
    render() {
        const { totalPrice, itemCart } = this.state
        return (
            <Container>
                <Content padder>
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity style={{ color: "gray" }} onPress={this.btnTambahBarang.bind(this)}>
                            <Text style={styles.tambahBarang}>Tambah Barang</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        itemCart ? <ItemList /> : <ItemNull />
                    }
                </Content>
                <Footer>
                    <View style={styles.contentFooter}>
                        <View style={styles.contentFooterRow}>
                            <Text style={styles.textLabel}>Total</Text>
                            <Text style={styles.textValue}>Rp. {totalPrice}</Text>
                        </View>
                    </View>
                </Footer>
            </Container>
        )
    }
}
const ItemNull = (props) => {
    return (
        <View style={styles.contentNotFoundOrder}>
            <View style={{ flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <Image source={require("./../../asset/cryememot.png")} style={styles.imagesData} resizeMode={"cover"} />
                <Text style={styles.textKeranjangKosong}>Yay!, Belum Ada Barang Yang Akan Di beli.. Yuk Belanja!!</Text>
            </View>
        </View>
    )
}
const ItemList = (props) => {
    return (
        <View>
            <View style={styles.designRow}>
                <View style={{ flex: 1 }}>
                    <Thumbnail large source={require("./../../asset/asset1.png")} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.textTitle}>Molto 1 Liter Cair</Text>
                    <Text style={styles.textSubTitle}>Pengharum Seterika</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <Text style={[styles.textDeskripsi]}>2 X</Text>
                        <Text style={[styles.textDeskripsi]}> @70.000</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row", alignContent: "center", justifyContent: "space-evenly", }}>
                    <Icon type="MaterialCommunityIcons" size={30} name="pencil-box-outline" />
                    <Icon type="MaterialCommunityIcons" size={30} name="delete-circle-outline" />
                </View>
            </View>
            <Text style={[styles.textDeskripsi, { marginTop: 4 }]}>Satu karton Isi 12 Biji.</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    contentFooter: {
        flex: 1
    },
    contentFooterRow: {
        flexDirection: "row",
        flex: 1,
        marginHorizontal: 8,
        marginVertical: 12,
        justifyContent: "space-between",
        alignContent: "flex-end"
    },
    textTitle: {
        fontSize: 13,
        fontWeight: "bold",
    },
    textSubTitle: {
        fontSize: 12,
        fontWeight: "400",
    },
    textDeskripsi: {
        fontSize: 12,
        fontWeight: "400",
    },
    textLabel: {
        color: "white",
        textAlign: "left",
        flexWrap: "wrap",
        fontSize: 16,
    },
    textValue: {
        color: "white",
        textAlign: "left",
        flexWrap: "wrap",
        fontSize: 16,
    },
    designRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "space-between",
    },
    tambahBarang: {
        backgroundColor: "blue",
        paddingVertical: 8,
        color: "#FFF",
        paddingHorizontal: 16,
        borderRadius: 30,
    },
    contentNotFoundOrder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imagesData: {
        width: 300,
        height: 300,
    },
    textKeranjangKosong: {
        textAlign: "center",
        fontSize: 18,
        flexWrap: "wrap",
        fontWeight: "600",
        marginHorizontal: 8,
        marginVertical: 8,
        textAlignVertical: "center"
    },
})
