import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit,user } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableOpacity, Text, View, Image } from 'react-native'

const NavigationHead = ({onPress, onExit, centerComponent = '', rightComponent = '', ...props}) => (
    <View style={[styles.filterHeader,{
        backgroundColor: props.color && '#eeee'
    }]}>
            <TouchableOpacity style={styles.FilterLeft} onPress={onPress}>
            {
    left(scale(30), themeColor)
    }
            </TouchableOpacity>
            <View style={styles.CenterLogo}>
    <Text style={{
        fontSize: scale(18),
        fontFamily: "Roboto-Bold",
        color:themeColor,
        fontWeight: 'bold',
    }}>{centerComponent}</Text></View>
            <View style={[{
        right: scale(20),
        position: 'absolute',
    }, styles.CenterLogo]}>
    <TouchableOpacity onPress={onExit}>
    {rightComponent == 'edit' ?
        (<Image source={props.creauser ? user : whiteEdit} tintColor={themeColor} style={{
            height: scale(23),
            width: scale(23)
            
        }} resizeMode={'contain'} />) :
        (<Text style={[{
            fontSize: scale(18),
            fontFamily: "Roboto-Bold",
        }, styles.FontSty]}>{rightComponent}</Text>)}</TouchableOpacity></View>
            </View>
)
export default NavigationHead