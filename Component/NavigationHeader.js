import React from 'react'
import { left } from '../src/IconManager';
import { FontRegular, themeColor, themeWhite } from '../Constant/index'
import styles from '../src/Style'
import { TouchableOpacity, Text, View, Image,TextInput } from 'react-native'
import { scale } from '../src/Util';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';

const NavigationHeader = ({Search,onPress, text = '', ...props}) => 
{
        return (
    <View style={styles.JoblistMainView}>
            <TouchableOpacity style={{
        backgroundColor: 'transparent',
        alignItems: "flex-start",
        height:'auto',
        // width:wp(10)
    }}  onPress={onPress}>
            {
    left(hp(4), themeColor)
    }</TouchableOpacity>
            <View style={styles.HeaderLayer}>
            <View style={styles.JoblistLogo}>
    <TouchableOpacity onPress={Search}><Image
    source = {require('../Img/search.png')}
    style={styles.JoblistLogoImageSize}
    resizeMode={'contain'}
    /></TouchableOpacity></View>
            <View style={[styles.JoblistMainViewHeading], {
        width: wp(80),
        marginLeft: wp(10),
        justifyContent: "center",
        alignItems: "flex-start",
    }}>
    <TextInput placeholder={text.length ? text : 'Search'} placeholderTextColor={'#333'} style={{height:hp(8),width:'80%',color:'#333',fontFamily:FontRegular,fontSize:hp(2.3)}} 
    />
    </View></View>
            </View>
)}

export default NavigationHeader