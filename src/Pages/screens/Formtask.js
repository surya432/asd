import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import GlobalStyles from '../Components/GlobalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Container, Content, Thumbnail } from 'native-base';
export default class Formtask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonDataParse: {}
        }
    }
    _onPressBack = async () => {
        this.props.navigation.navigate('Dashboard');
    }
    async componentDidMount() {
        this.setState({
            jsonDataParse: JSON.parse(this.props.navigation.state.params.dataObject)
        })
    }
    render() {
        const uri =
            'https://facebook.github.io/react-native/docs/assets/favicon.png';
        const { jsonDataParse } = this.state
        return (
            <SafeAreaView style={GlobalStyles.droidSafeArea}>
                <Container>

                    <Content padder>
                        <View style={{ alignItems: "flex-end", height: 50 }}>
                            <TouchableOpacity onPress={this._onPressBack.bind(this)}>
                                <Ionicons name="md-close-circle-outline" size={35} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 8 }}>
                            <Thumbnail large source={{ uri: uri }} />
                            <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>
                                {jsonDataParse.status}
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: '400', marginTop: 8 }}>
                                {jsonDataParse.status}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.button}>
                            <Text>Log Out</Text>
                        </TouchableOpacity>
                    </Content>
                </Container>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({})
