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
                        onPress={onPress}>
                        <View
                          key={props.index}
                          style={styles.SuggestionView}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingLeft: scale(10),
                            }}>
                            <Text
                              style={styles.SuggestionViewText}>
                              {props.elements}
                            </Text>
                          </View>
                          <View
                            style={{
                              top: scale(-7),
                              left: scale(5),
                            }}>
                            {library('highlight-off', scale(14), themeColor)}
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
)

export default SuggestionView