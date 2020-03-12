import React, { Component } from 'react'
import { Text, View ,SafeAreaView,StyleSheet} from 'react-native'

export class HomeScreen extends Component {
    render() {
        return (
            <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.content} >
                    <Text> SettingsScreen </Text>
                </View>
            </View>
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
        marginVertical: 12,
    },
    text: {
        paddingHorizontal: 8,
        paddingVertical: 5,
    }
});