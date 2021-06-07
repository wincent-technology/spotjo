import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit,cal } from '../Constant/index'
import CustomInput from './Input';
import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableOpacity, Text, View,Image} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  vw,
  vh,
} from '../Component/responsive-ratio';

const hitSlop = {top: 40, bottom: 40, left: 50, right: 50};
const center = {justifyContent:"center",alignItems:"center",paddingTop:5};
const EducationComponent = ({onBack, onFinish , textChange , onNext, ...props}) => 
{
return (
     <><View style = {
        {
            top: hp(1),
            marginHorizontal:wp(5)
        }}>
        <CustomInput value = {props.name} placeholder={props.placeHolder} 
        inputContainerStyle={[{borderRadius:scale(20),height:hp(5.5),backgroundColor:"#fff",borderColor: "#333",
    borderWidth: 1},props.addskillStyle]}
        textChange = {textChange} inputStyle={{
            fontWeight: "bold",
            fontSize: hp(2.7),
            color: themeColor
        }}
        iconStyle={{
            height: hp(3),
            width: hp(3)
        }}
        /></View>
        {!props.show && <View style={{justifyContent:"space-between",alignItems:"flex-end",marginHorizontal:wp(8)}}>
              <TouchableOpacity 
              style={{borderWidth:0.5,paddingVertical:hp(0.5),marginTop:hp(-1),paddingHorizontal:hp(2),borderRadius:20,
              borderColor:"#333",justifyContent:"center",alignItems:"center"}} 
              onPress={onNext}>
                <Text style={{
                  fontWeight: "bold",
                fontSize: hp(2.7),
                color: themeColor

                }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>}
            <View style={{
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: 'wrap',
                marginTop: scale(1),
                marginHorizontal:wp(5),
                height: props.suggesion != [] && scale(70)
            }} /></>
)
        }

export default EducationComponent