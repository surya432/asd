import React, { Component } from 'react'
import { Text, SafeAreaView,PermissionsAndroid, StyleSheet } from 'react-native'
import GlobalStyles from '../Components/GlobalStyles';
import { Container, Content, Button,List, ListItem } from 'native-base';

export class RandDScreen extends Component {
    constructor(props) {
        super(props)
    }
    _onClickGPS() {
        this.props.navigation.navigate('GeoLocationScreen');
    }
    render() {
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container >
                    <Content padder>
                        <List>
                            <ListItem>
                                <Button primary onPress={this._onClickGPS()}>
                                    <Text>RND Location</Text>
                                </Button>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

export default RandDScreen

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