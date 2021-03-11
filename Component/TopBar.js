import React from 'react'
import { left,leftVid } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit,user } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableOpacity, Text, View, Image } from 'react-native'

const TopBar = ({onPress, onExit, centerComponent = '', rightComponent = '', ...props}) => (
    <View style={[styles.filterHeader,{
        backgroundColor: props.color && themeColor
    }]}>
            <TouchableOpacity style={styles.FilterLeft} onPress={onPress}>
            {
    left(scale(30), themeWhite)
    }
            </TouchableOpacity>
            <View style={styles.CenterLogo}>
    <Text style={{
        fontSize: scale(18),
        fontFamily: "Roboto-Bold",
        color:themeWhite,
        fontWeight: 'bold',
    }}>{centerComponent}</Text></View>
            <View style={[{
        right: scale(20),
        position: 'absolute',
    }, styles.CenterLogo]}>
    <TouchableOpacity onPress={onExit} hitSlop={{top:20,bottom:20,left:20,right:20}}>
    {rightComponent == 'edit' ?
         leftVid(props.flag ? 'trash':'ellipsis-v',20,themeWhite)
            :
        (<Text style={[{
            fontSize: scale(18),
            fontFamily: "Roboto-Bold",
        }, styles.FontSty]}>{rightComponent}</Text>)}</TouchableOpacity></View>
            </View>
)
export default TopBar