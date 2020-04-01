import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, Alert, Image } from 'react-native'
import GlobalStyles from '../Components/GlobalStyles'
import { Container, Header, Right, Button, Body, Title, Modal, Content, Icon, Footer, FooterTab, Left, Thumbnail } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default class TransactionScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
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
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("storiesList")}>
                <Icon type="FontAwesome" size={24} name="shopping-cart" />
            </TouchableOpacity>
        )
    });
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            totalPrice: 0,
        };
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    dataCart() {
        Alert.alert("Click", "You Click")
    }
    render() {
        const { totalPrice } = this.state
        return (
                <Container>
                    <Content padder>
                        <View style={styles.designRow}>
                            <View style={{ flex: 1 }}>
                                <Thumbnail large source={require("./../../asset/asset1.png")} />
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.textTitle}>Ullamco incididunt reprehenderit.</Text>
                                <Text style={styles.textSubTitle}>Ullamco incididunt reprehenderit.</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={[styles.textDeskripsi]}>Harga</Text>
                                    <View style={[{ flexDirection: "row", justifyContent: "space-around" }]}>
                                        <Text style={[styles.textDeskripsi]}>2 X</Text>
                                        <Text style={[styles.textDeskripsi]}> @70.000</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row", alignContent: "center", justifyContent: "space-evenly", }}>
                                <Icon type="MaterialCommunityIcons" size={30} name="pencil-box-outline" />
                                <Icon type="MaterialCommunityIcons" size={30} name="delete-circle-outline" />
                            </View>
                        </View>
                        <Text style={styles.textDeskripsi}>Ea in consequat reprehenderit Nostrud Lorem amet qui do tempor pariatur.</Text>

                    </Content>
                    <Footer>
                        <View style={styles.contentFooter}>
                            <View style={styles.contentFooterRow}>
                                <Text style={styles.textLabel}>Total</Text>
                                <Text style={styles.textValue}>Rp {totalPrice}</Text>
                            </View>
                        </View>
                    </Footer>
                </Container>
        )
    }
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
})
