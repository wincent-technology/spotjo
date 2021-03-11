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
            top: scale(20),
            marginHorizontal:wp(5)
        }}>
        <CustomInput value = {props.name} placeholder={props.placeHolder} 
        inputContainerStyle={[{borderRadius:scale(20),height:scale(45),backgroundColor:"#fff",borderColor: "#333",
    borderWidth: 1},props.addskillStyle]}
        textChange = {textChange} inputStyle={{
            fontWeight: "bold",
            fontSize: scale(18),
            color: themeColor
        }}
        iconStyle={{
            height: 25,
            width: 25
        }}
        /></View>
        <View style={{justifyContent:"space-between",alignItems:"flex-end",marginHorizontal:wp(8)}}>
              <TouchableOpacity 
              style={{borderWidth:1,paddingVertical:7,paddingHorizontal:15,borderRadius:20,borderColor:"#333",justifyContent:"center",alignItems:"center"}} 
              onPress={onNext}>
                <Text style={{
                  fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor

                }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
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