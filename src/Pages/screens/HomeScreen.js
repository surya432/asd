import React, { Component } from 'react'
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
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
            dataUser: {}
        };
        this.setDate = this.setDate.bind(this);
    }
    async componentDidMount() {
        this._kondisiAwal();
    }
    async _kondisiAwal() {
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
                <Header noLeft>
                    <Body>
                        <Text style={{ color: "white", fontSize: 24, }}>To Do Task List</Text>
                    </Body>
                    <Right>
                        <View style={{ flexDirection: "row" }}>
                            <Feather size={20} active name='refresh-ccw' style={{ marginStart: 8 }} />
                            <MaterialCommunityIcons size={24} onPress={() => this.RBSheet.open()} name='filter-outline' style={{ marginStart: 8 }} />
                            <RBSheet
                                ref={ref => {
                                    this.RBSheet = ref;
                                }}
                                height={200}
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