import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableOpacity, Text, View } from 'react-native'

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
    <TouchableOpacity onPress={onExit}><Text style={[{
        fontSize: scale(18),
        fontFamily: "Roboto-Bold"
    }, styles.FontSty]}>{rightComponent}</Text></TouchableOpacity></View>
            </View>
)
export default NavigationHead