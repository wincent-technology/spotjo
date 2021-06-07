import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit,user } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { heightPercentageToDP as hp } from './responsive-ratio';

const NavigationHead = ({onPress, onExit, centerComponent = '', rightComponent = '', ...props}) => (
    <View style={[styles.filterHeader,{
        backgroundColor: props.color && '#eeee'
    }]}>
            <TouchableOpacity style={styles.FilterLeft} onPress={onPress}>
            {
    left(hp(4), themeColor)
    }
            </TouchableOpacity>
            <View style={styles.CenterLogo}>
    <Text style={{
        fontSize: hp(3),
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
            height: hp(3),
            width: hp(3)
            
        }} resizeMode={'contain'} />) :
        (<Text style={[{
            fontSize: hp(2.7),
            fontFamily: "Roboto-Bold",
        }, styles.FontSty]}>{rightComponent}</Text>)}</TouchableOpacity></View>
            </View>
)
export default NavigationHead