import React from 'react'
import { library } from '../src/IconManager';
import { themeColor } from '../Constant/index'

import styles from './Style'

import { TouchableOpacity, Text } from 'react-native'

const CheckBox = ({selected, onPress, style, textStyle, size = 20, color = themeColor, text = '', ...props}) => (
    <TouchableOpacity style={[styles.checkBox, style]} onPress={onPress} {...props}>
        <Text style={textStyle}> {text} </Text>
      {library(selected ? 'check-box' : 'check-box-outline-blank', size, color)}
    </TouchableOpacity>
)

export default CheckBox