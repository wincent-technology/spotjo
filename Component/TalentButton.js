import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit,FontRegular } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableOpacity, Text, View,} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  vw,
  vh,
} from '../Component/responsive-ratio';
import Texting from '../Constant/Text'
const hitSlop = {top: 40, bottom: 40, left: 50, right: 50};
const center = {justifyContent:"center",alignItems:"center",paddingTop:5};
const TalentButton = ({onPress, ...props}) => 
(
    <>{
        !props.job ?
        (
    <View style={[styles.PersonalInfoStartChoose, {
        alignItems:"center",width: wp(42),
    }]}><TouchableOpacity style={{
        borderRadius: props.bool ? 20 : 0,backgroundColor: props.bool ? "#fff" : 0,paddingHorizontal:scale(10),}} 
    onPress={onPress}>
            <Texting style={{
        fontSize: props.height ? hp(2.7) : hp(3),
        color: props.bool ? themeColor : themeWhite,
        fontFamily: FontRegular,
       fontWeight: 'bold',
    }} text={props.name}/>
    </TouchableOpacity>
    {props.name != 'FullTime' && props.name != 'Part_time' && <View style={{height:0.5,backgroundColor:"#fff",width:wp(35),marginTop: props.height ? scale(10) : scale(10)}}/>}
</View>
        ) : (
<View style={[styles.PersonalInfoStartChoose, {
        alignItems:"center",width: wp(42),
    }]}><TouchableOpacity style={{
        borderRadius: props.bool ? 20 : 20,backgroundColor: props.bool ? themeColor : 'transparent',paddingHorizontal:scale(10),borderWidth: props.job ? 1 : 0,borderColor : props.bool ? themeColor : 'black',        }} 
    onPress={onPress}>
            <Texting style={{
        fontSize:props.height ? hp(2.7) : hp(3),
        color: props.bool ? themeWhite : "#333",
        fontFamily: FontRegular,
    //    fontWeight: 'bold',
    }} text={props.name}/>
    </TouchableOpacity>
    {props.name != 'FullTime' && props.name != 'Part_time' && <View style={{height:0.5,backgroundColor:themeColor,width:wp(35),marginTop:props.height ? scale(10) :scale(10)}}/>}
</View>
        )
    }</>
)

export default TalentButton