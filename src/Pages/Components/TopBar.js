import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
class TopBar extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {/* <Text>Left</Text> */}
                <Text styles={styles.TitleBar}>HOME</Text>
                {/* <Text>Right</Text> */}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: 'white',
        alignItems: 'center',
        // justifyContent: 'space-between', // center, space-around
        justifyContent: 'center', // center, space-around
        paddingLeft: 10,
        paddingRight: 10
    },
    TitleBar:{
        fontSize:28,
        fontWeight: "bold"
    }
});

export default TopBar;