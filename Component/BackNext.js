import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit } from '../Constant/index'

import styles from '../src/Style'
import { scale } from '../src/Util'
import { TouchableOpacity, Text, View,Keyboard} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  vw,
  vh,
} from '../Component/responsive-ratio';
import Texting from '../Constant/Text'
const hitSlop = {top: 40, bottom: 40, left: 50, right: 50};
const center = {justifyContent:"center",alignItems:"center",paddingTop:5};
const BackNext = ({onBack, onNext, ...props}) => {
  
  const [showText, setShowText] = React.useState(true);

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => setShowText(false);
  const _keyboardDidHide = () => setShowText(true);

  if (showText && props.show){
return (
    <View style={styles.BackNextRootView}>
              <View
                style={styles.BackNextButtonView}>
                  <View style={styles.BackTouchableView}>
                  <TouchableOpacity
                  style={[styles.Size],{justifyContent:"center",alignItems:"center",}}
                  onPress={onBack}
                  hitSlop={hitSlop}>
                  <View style={center}>
                  <Texting style={[{fontSize: hp(3)},styles.FontSty]} text='Back'/>
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
                  <Texting style={[{fontSize: hp(3)},styles.FontSty]} text='Next'/>
                  </View>
                </TouchableOpacity>
                </View>
              </View>
            </View>
)}
else if(showText && !props.show){
return (<View style={styles.BackNextRootView}>
  <View
    style={styles.BackNextButtonView}>
      <View style={styles.BackTouchableView}>
      <TouchableOpacity
      style={[styles.Size],{justifyContent:"center",alignItems:"center",}}
      onPress={onBack}
      >
      <View style={center}>
      <Texting style={[{fontSize: hp(3)},styles.FontSty]} text='Back'/>
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
      onPress={props.done}
      >
      <View style={center}>
      <Texting style={[{fontSize: hp(3)},styles.FontSty]} text='Done'/>
      </View>
    </TouchableOpacity>
    </View>
  </View>
</View>)
} else return null
}

export default BackNext