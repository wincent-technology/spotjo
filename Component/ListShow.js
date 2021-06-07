import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit } from '../Constant/index'

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
const ListShow = ({...props}) => 
(
    <><View style={styles.CompanyDetailIcon}>
    <View style={styles.CompanyDetailProfileIcon}>
      <Image
        source={props.image}
        style={styles.imageStyle}
        resizeMode={'contain'}
      />
    </View>
    <Text style={styles.ItemDetailLabel1}>{props.name}</Text>
  </View>
  <View style={{height:0.5,width:wp(85)-wp(5),backgroundColor:themeColor,marginLeft:5,marginTop:2,}}/></>
)

export default ListShow