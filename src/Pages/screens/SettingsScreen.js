import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
class SettingsScreen extends Component {
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

export default SettingsScreen
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