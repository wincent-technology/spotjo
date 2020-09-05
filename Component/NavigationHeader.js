import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite } from '../Constant/index'
import styles from '../src/Style'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { scale } from '../src/Util';

const NavigationHeader = ({onPress, text = '', ...props}) => (
    <View style={styles.JoblistMainView}>
            <TouchableOpacity style={{
        backgroundColor: 'transparent',
        alignItems: "flex-start",
    }}  onPress={onPress}>
            {
    left(scale(30), themeWhite)
    }</TouchableOpacity>
            <View style={styles.HeaderLayer}><View style={styles.JoblistLogo}>
    <Image
    source = {require('../Img/icon-search-blue.png')}
    style={styles.JoblistLogoImageSize}
    resizeMode={'contain'}
    /></View>
            <View style={styles.JoblistMainViewHeading}>
    <Text style={styles.JoblistMainViewHeadingText}>{text}</Text></View></View>
            </View>
)

export default NavigationHeader