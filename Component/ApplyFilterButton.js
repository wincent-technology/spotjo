import React from 'react'
import { left } from '../src/IconManager';
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
import Texting from '../Constant/Text'

const hitSlop = {top: 40, bottom: 40, left: 50, right: 50};
const center = {bottom:40,position:"absolute",
borderTopWidth:1,
width:wp(100),justifyContent: 'space-around',
flexDirection:"row",
paddingVertical:30,
alignItems: 'center',
backgroundColor:"rgba(255,255,255,0.2)"};
const ApplyFilterButton = ({onReset, onApply, ...props}) => 
(
    <View
    style={center}>
    <TouchableWithoutFeedback
      style={[
        {
          width: wp('40%')
        },
        styles.SaveFilterButton,
      ]}
      onPress={onReset}>
      <View
        style={[
          styles.SaveFilterButtonView,
          styles.SaveFilterButton,
        ]}>
        <Texting
          style={[
            {
              fontSize: hp(3),
            },
            styles.FontSty,
          ]} text={props.reset}/>
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback
      style={[
        {
          width: wp('40%'),
        },
        styles.SaveFilterButton,
      ]}
      onPress={onApply}>
      <View
        style={[
          styles.SaveFilterButtonView,
          styles.SaveFilterButton,
        ]}>
        <Texting
          style={[
            {
              fontSize: hp(3),
            },
            styles.FontSty,
          ]} text={props.apply}/>
      </View>
    </TouchableWithoutFeedback>
  </View>
)

export default ApplyFilterButton