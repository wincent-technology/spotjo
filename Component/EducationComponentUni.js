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
const EducationComponentUni = ({onBack, onFinish , textChange , onNext, ...props}) => 
{
return (
     <><View style = {
        {
            top: scale(20),
            marginHorizontal:wp(5)
        }}>
        <CustomInput value = {props.name} placeholder={props.placeHolder} 
        inputContainerStyle={{borderRadius:scale(20),height:scale(45),backgroundColor:"#fff",borderColor: "#333",
    borderWidth: 1,}}
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
        {!props.show && <View style={{flexDirection:'row',width:props.width ? wp(80) : wp(84),justifyContent:"space-between",marginBottom:10,}}>
                <View
                        style={{
                          backgroundColor: themeWhite,
                          borderColor: '#333',
                          alignItems: 'center',
                          borderWidth: scale(1),
                          borderRadius: scale(10),
                          flexDirection: 'row',
                          padding:3,width:props.width ? wp(39) : wp(41),
                          justifyContent:"space-between"

                        }}
                        onStartShouldSetResponder={props.onResponse}>
                        <View
                          style={{
                            marginLeft: props.width ? scale(15):scale(20),
                            // width: wp(30),
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: themeColor,
                              fontSize: scale(18),
                              fontFamily: 'Roboto-Bold',
                              fontWeight: 'bold',
                            }}>
                            {props.fromDate}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: scale(10),
                            // width: scale(20),
                            height: scale(20),
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={cal}
                            tintColor={themeColor}
                            style={{
                              height: scale(20),
                              width: scale(20),
                            }}
                            resizeMode={'contain'}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: themeWhite,
                          borderColor: '#333',
                          padding:3,
                          width:props.width ? wp(39) : wp(41),
                          alignItems: 'center',
                          borderWidth: scale(1),
                          borderRadius: scale(10),
                          flexDirection: 'row',
                          justifyContent:"space-between"
                        }}
                        onStartShouldSetResponder={props.onResponseTo}>
                        <View
                          style={{
                            marginLeft: scale(20),
                            // width: wp(30),
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: themeColor,
                              fontSize: scale(18),
                              fontFamily: 'Roboto-Bold',
                              fontWeight: 'bold',
                            }}>
                            {props.toDate}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: scale(10),
                            // width: scale(20),
                            height: scale(20),
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={cal}
                            tintColor={themeColor}
                            style={{
                              height: scale(20),
                              width: scale(20),
                            }}
                            resizeMode={'contain'}
                          />
                        </View>
                      </View>
                </View>}
                {!props.show && <View style={{flexDirection:"row"}}>
              <TouchableOpacity 
              style={{borderWidth:1,paddingVertical:7,marginRight:10,paddingHorizontal:15,borderRadius:20,borderColor:"#333",justifyContent:"center",alignItems:"center"}} 
              onPress={onBack}>
                <Text style={{
                  fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor

                }}>
                  back
                </Text>
              </TouchableOpacity>
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
              </View>}
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

export default EducationComponentUni