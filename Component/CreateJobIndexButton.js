

import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import {  Text, View,} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  vw,
  vh,
} from '../Component/responsive-ratio';
import Texting from '../Constant/Text'
import { isNumber } from 'underscore';

const hitSlop = {top: 40, bottom: 40, left: 50, right: 50};
const center = {justifyContent:"center",alignItems:"center",paddingTop:5};
const CreateJobIndexButton = ({...props}) => {
return (
    <View
      style={{
        flexDirection: 'column',
        // width: wp(20)
      }}>
      <View
        style={{
          flexDirection: 'row',marginHorizontal:3,alignItems:'center'
        }}>
        <Texting
          style={{
            fontSize: hp(2.5),
            fontWeight: 'bold',
            color: isNumber(props.index)  ? themeColor : '#333',
            // textDecorationLine: props.index == 0 ? 'underline' : 'none'
          }} text = {props.name}/>
        <Text
          style={{
            fontSize: hp(2),
            fontWeight: 'bold',
          }}>
          {'>'}
        </Text>
      </View>
      <View
        style={{
          height: scale(1),
          marginTop: scale(1),
          width: 'auto',
          backgroundColor:
            isNumber(props.index) ? '#000' : '#fff',
        }}
      />
    </View>
)}

export default CreateJobIndexButton