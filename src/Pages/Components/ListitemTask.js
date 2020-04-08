import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import { ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Fontisto from "react-native-vector-icons/Fontisto";
import Moment from "moment"

const ListitemTask = (props) => {
    const getImageStatus = (param) => {
        switch (param) {
            case 'On Progress':
                return require('../../asset/asset1.png')
            case 'Mulai':
                return require('../../asset/asset2.png')
            case 'Selesai':
                return require('../../asset/asset3.png')
        }
    }
    const getImageStatus2 = (param) => {
        switch (param) {
            case 'On Progress':
                return "hourglass-half"
            case 'Mulai':
                return "hourglass-start"
            case 'Selesai':
                return "hourglass-end"
        }
    }
    const getcolorStatus2 = (param) => {
        switch (param) {
            case 'On Progress':
                return "green"
            case 'Mulai':
                return "gray"
            case 'Selesai':
                return "blue"
        }
    }
    const onHalderClick = (itms) => {
        props.onclick(itms)
    }
    const onHalderClickEdit = (itms) => {
        props.onclickEdit(itms)
    }
    const onHalderClickDelete = (itms) => {
        props.onclickDelete(itms)
    }
    return (
        <ListItem button avatar >
            <Left>
                <TouchableOpacity onLongPress={() => onHalderClickEdit(props.dataObject)} onPress={() => onHalderClick(props.dataObject)}>
                    <Fontisto name={getImageStatus2(props.status)} color={getcolorStatus2(props.status)} size={24} />
                </TouchableOpacity>
            </Left>
            <Body>
                <TouchableOpacity onLongPress={() => onHalderClickEdit(props.dataObject)} onPress={() => onHalderClick(props.dataObject)}>
                    <Text>{props.perkerjaan}</Text>
                    <Text note>{Moment(props.tglmulai).format("DD/M/YYYY")} - {Moment(props.tglselesai).format("DD/M/YYYY")}</Text>
                </TouchableOpacity>
            </Body>
            <Right style={styles.containerBtn}>
                <View style={styles.iconBtn}>
                    <TouchableOpacity onPress={() => onHalderClickEdit(props.dataObject)}>
                        <Icon type="FontAwesome" size={24} name="pencil" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onHalderClickDelete(props.dataObject.id)}>
                        <Icon type="MaterialCommunityIcons" size={24} name="delete" />
                    </TouchableOpacity>
                </View>
            </Right>
        </ListItem>
    )
}

export default ListitemTask
const styles = StyleSheet.create({
    containerBtn: {
        justifyContent: "center",
        alignContent: "center"
    },
    iconBtn: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 55,
    }
})
