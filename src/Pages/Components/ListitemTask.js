import React from 'react'
import { StyleSheet, Text,} from 'react-native'
import { ListItem, Left, Body, Right, Thumbnail, Icon } from 'native-base'
const ListitemTask = (props) => {

    const getImageStatus = (param) => {
        switch (param) {
            case 'On Progress':
                return require('./../../asset/asset1.png')
            case 'Mulai':
                return require('./../../asset/asset2.png')
            case 'Selesai':
                return require('./../../asset/asset3.png')
        }
    }
    const onHalderClick = (itms) => {
        props.onclick(itms)
    }
    return (
        <ListItem button avatar onPress={() => onHalderClick(props.dataObject)}>
            <Left>
                <Thumbnail source={getImageStatus(props.status)} />
            </Left>
            <Body>
                <Text>{props.perkerjaan}</Text>
                <Text note>{props.tglmulai} - {props.tglselesai}</Text>
            </Body>
            <Right>
                <Icon type="FontAwesome" name="home" />
            </Right>
        </ListItem>
    )
}

export default ListitemTask

const styles = StyleSheet.create({})
