import React from 'react'

import styles from '../src/Style'
import { TouchableOpacity, View,} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import Texting from '../Constant/Text'

const center = {
  bottom:40,
  position:"absolute",
  // borderTopWidth:0.5,
  width:wp(100),justifyContent: 'space-around',
  flexDirection:"row",
  paddingVertical:30,
  alignItems: 'center',
  backgroundColor:"transparent"};
const ApplyFilterButton = ({onReset, onApply, ...props}) => 
(
    <View
    style={center}>
    <TouchableOpacity
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
              fontSize: hp(2.7),
            },
            styles.FontSty,
          ]} text={props.reset}/>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
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
              fontSize: hp(2.7),
            },
            styles.FontSty,
          ]} text={props.apply}/>
      </View>
    </TouchableOpacity>
  </View>
)

export default ApplyFilterButton