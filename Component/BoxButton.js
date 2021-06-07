import React from "react";
import {
    TouchableWithoutFeedback,
    ImageBackground,
    Text,
    View,
  } from 'react-native';
  import styles from '../src/Style';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../Component/responsive-ratio';
  import {
    themeWhite,
    canvas,
  } from '../Constant/index';
  import {
    scale,
    snack
  } from '../src/Util';
  
function BoxButton ({...props}) {
    return <TouchableWithoutFeedback onPress={props.onPress}>
    <View
      style={[
        {
          borderWidth: props.types ? scale(2) : 0,
        },
        styles.MatchersStyleTab,
      ]}>
      <ImageBackground
        source={canvas}
        style={{
          height: '100%',
          width: '100%',
          // position: "absolute",
          alignItems: 'center',
          justifyContent: 'center',
        }}
        resizeMode={'stretch'}>
        <Text
          style={{
            fontSize: hp(2.7),
            fontFamily: 'Roboto-Regular',
            color: themeWhite,
          }}>
          {props.lengthing}
        </Text>
        <View>
          <Text
            style={{
              fontSize: hp(2.5),
              fontFamily: 'Roboto-Regular',
              color: themeWhite,
            }}>
            {props.title}
          </Text>
        </View>
      </ImageBackground>
    </View>
  </TouchableWithoutFeedback>
  } 
  export default BoxButton