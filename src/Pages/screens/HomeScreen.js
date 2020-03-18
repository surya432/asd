import React, { Component } from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import { Container, CardItem, Header, Left, Title, FooterTab, Item, DatePicker, Right, Content, Button, Col, Row, Icon, Thumbnail, Body, Footer, Grid, Card, CardSwiper, Input } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import FilterSheet from '../Components/FilterSheet';
export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date(), dataUser: {} };
        this.setDate = this.setDate.bind(this);
    }
    async componentDidMount() {
        const isLoggedIn = await AsyncStorage.getItem("dataUser");
        const jsonParse = await JSON.parse(isLoggedIn);
        this.setState({ dataUser: jsonParse[0] });
        console.log(isLoggedIn);
    }
    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        const formattedDate = moment(new Date()).format("MM/DD/YYYY");
        this.state.chosenDate = formattedDate
        return (
            <Container style={{ backgroundColor: "#gray" }}>
                <Header transparent>
                    <Body>
                        <Title>asdasd</Title>
                    </Body>
                    <Right>
                        <View style={{ flexDirection: "row" }}>
                            <Feather size={20} active name='refresh-ccw' style={{ marginStart: 8 }} />
                            <MaterialCommunityIcons size={24} onPress={() => this.RBSheet.open()} name='filter-outline' style={{ marginStart: 8 }} />
                            <RBSheet
                                ref={ref => {
                                    this.RBSheet = ref;
                                }}
                                customStyles={{
                                    container: {
                                        paddingHorizontal: 16
                                    }
                                }}
                            >
                                <FilterSheet text="hasdads" />
                            </RBSheet>
                        </View>
                    </Right>
                </Header>
                <Content padder >
                    {/* <Card >
                        <CardItem>
                            <Left>
                                <Item>
                                    <MaterialCommunityIcons size={20} active name='filter-outline' />
                                    <Body>
                                        
                                    </Body>
                                </Item>
                            </Left>

                        </CardItem>
                    </Card> */}

                    <Card style={{ marginHorizontal: 15, marginBottom: 8 }}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('./../../asset/asset2.png')} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
                            <Image source={require('./../../asset/asset3.png')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card style={{ marginHorizontal: 15, marginBottom: 8 }}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('./../../asset/asset2.png')} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
                            <Image source={require('./../../asset/asset3.png')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                    </Card>
                    <Card style={{ marginHorizontal: 15, marginBottom: 8 }}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('./../../asset/asset2.png')} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
                            <Image source={require('./../../asset/asset3.png')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                    </Card>
                </Content>
                <Footer >
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container >
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
        marginVertical: 12,
    },
    text: {
        paddingHorizontal: 8,
        paddingVertical: 5,
    }
});