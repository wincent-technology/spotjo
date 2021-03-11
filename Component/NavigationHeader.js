import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite } from '../Constant/index'
import styles from '../src/Style'
import { TouchableOpacity, Text, View, Image } from 'react-native'
import { scale } from '../src/Util';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';

const NavigationHeader = ({onPress, text = '', ...props}) => (
    <View style={styles.JoblistMainView}>
            <TouchableOpacity style={{
        backgroundColor: 'transparent',
        alignItems: "flex-start",
    }}  onPress={onPress}>
            {
    left(scale(30), themeColor)
    }</TouchableOpacity>
            <View style={styles.HeaderLayer}><View style={styles.JoblistLogo}>
    <Image
    source = {require('../Img/search.png')}
    style={styles.JoblistLogoImageSize}
    resizeMode={'contain'}
    /></View>
            <View style={[styles.JoblistMainViewHeading], {
        width: wp(70),
        marginLeft: scale(35),
        justifyContent: "center",
        alignItems: "flex-start",
    }}>
    <Text style={styles.JoblistMainViewHeadingText} numberOfLines={1}>{text}</Text></View></View>
            </View>
)

export default NavigationHeader