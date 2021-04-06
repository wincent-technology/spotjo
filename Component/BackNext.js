import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit } from '../Constant/index'

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
const BackNext = ({onBack, onNext, ...props}) => 
(
    <View style={styles.BackNextRootView}>
              <View
                style={styles.BackNextButtonView}>
                  <View style={styles.BackTouchableView}>
                  <TouchableOpacity
                  style={[styles.Size],{justifyContent:"center",alignItems:"center",}}
                  onPress={onBack}
                  hitSlop={hitSlop}>
                  <View style={center}>
                  <Texting style={[{fontSize: scale(20)},styles.FontSty]} text='Back'/>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
              <View 
                style={{width:1,height:30,marginVertical:10,backgroundColor:"white"}}
              />
              <View
                style={styles.BackNextButtonView}>
                 <View style={styles.BackTouchableView}>
                  <TouchableOpacity
                  style={[styles.Size],{justifyContent:"center",alignItems:"center"}}
                  onPress={onNext}
                  hitSlop={hitSlop}>
                  <View style={center}>
                  <Texting style={[{fontSize: scale(20)},styles.FontSty]} text='Next'/>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
            </View>
)

export default BackNext