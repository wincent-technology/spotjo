import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableOpacity, Text, View, Image } from 'react-native'

const NavigationHead = ({onPress, onExit, centerComponent = '', rightComponent = '', ...props}) => (
    <View style={styles.filterHeader}>
            <TouchableOpacity style={styles.FilterLeft} onPress={onPress}>
            {
    left(scale(30), themeWhite)
    }
            </TouchableOpacity>
            <View style={styles.CenterLogo}>
    <Text style={[{
        fontSize: scale(18),
        fontFamily: "Roboto-Bold"
    }, styles.FontSty]}>{centerComponent}</Text></View>
            <View style={[{
        right: scale(20),
        position: 'absolute',
    }, styles.CenterLogo]}>
    <TouchableOpacity onPress={onExit}>{rightComponent == 'edit' ?
        (<Image source={whiteEdit} style={{
            height: scale(23),
            width: scale(23)
        }} resizeMode={'contain'} />) :
        (<Text style={[{
            fontSize: scale(18),
            fontFamily: "Roboto-Bold"
        }, styles.FontSty]}>{rightComponent}</Text>)}</TouchableOpacity></View>
            </View>
)
export default NavigationHead