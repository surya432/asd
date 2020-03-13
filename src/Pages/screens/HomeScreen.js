import React, { Component } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { Container, CardItem, Header, Left, Item, DatePicker, Right, Content, Button, Col, Row, Icon, Thumbnail, Body, Footer, Grid, Card, CardSwiper, Input } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
export class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    render() {
        const formattedDate = moment(new Date()).format("MM/DD/YYYY");
        this.state.chosenDate = formattedDate
        return (
            <Container style={{ backgroundColor: "#gray " }}>
                <Content style={{ marginHorizontal: 15 }}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Item>
                                    <MaterialCommunityIcons size={20} active name='filter-outline' />
                                    <Body>
                                        <DatePicker
                                            locale={"en"}
                                            timeZoneOffsetInMinutes={undefined}
                                            modalTransparent={false}
                                            animationType={"slide"}
                                            androidMode={"spinner"}
                                            placeHolderText={formattedDate}
                                            textStyle={{ color: "#d3d3d3" }}
                                            placeHolderTextStyle={{ color: "#d3d3d3" }}
                                            onDateChange={this.setDate}
                                            disabled={false}
                                            animationType="fade"
                                        />
                                    </Body>
                                    <Feather size={20} active name='refresh-ccw' />
                                </Item>
                            </Left>

                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={require('./../../asset/asset2.png')} />
                                <Body>
                                    <Text>NativeBase</Text>
                                    <Text note>GeekyAnts</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={require('./../../asset/asset3.png')} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                    </Card>
                </Content>
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