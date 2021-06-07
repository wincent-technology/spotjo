import React from 'react'
import { library } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableWithoutFeedback, Text, View,} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  vw,
  vh,
} from '../Component/responsive-ratio';

const hitSlop = {top: 40, bottom: 40, left: 50, right: 50};
const center = {justifyContent:"center",alignItems:"center",paddingTop:5};
const SuggestionView = ({onPress, ...props}) => 
(
    <TouchableWithoutFeedback
                        onPress={onPress} key={props.index}>
                        <View
                          key={props.index}
                          style={{
                            alignItems: 'flex-start',borderWidth:1,borderColor:themeColor,
                borderRadius:10,paddingHorizontal:10,height:'auto',
                width: 'auto',backgroundColor:props.backGroundC ? props.backGroundC : 'white',borderColor:"#fff",flexDirection:"row",
                justifyContent:"space-around",alignItems:"center",margin:2,flexShrink:1
                          }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingLeft: scale(10),
                            }}>
                            <Text
                              style={{
                                fontWeight: 'bold',
                  fontSize: props.fontscale ? props.fontscale:hp(2.7),
                  color:props.textColor ? props.textColor : themeColor,
                              }}>
                              {props.elements}
                            </Text>
                          </View>
                          <View
                            style={{
                              left: scale(5),justifyContent:"center",alignItems:"center"
                            }}>
                            {library('highlight-off', scale(14), props.textColor ? props.textColor : themeColor)}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
)

export default SuggestionView