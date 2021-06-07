import React from 'react'
import {Listed,detailed,sort,filter,detailedgray, themeColor,FontRegular} from '../Constant'
import styles from '../src/Style'
import { scale } from '../src/Util'
import { Text, View, Image,TouchableWithoutFeedback } from 'react-native'
import Texting from '../Constant/Text'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
const TopHeader = ({data, ...props}) => (
<View style={styles.JoblistSecondViewHeading}>
            <View style={[styles.JoblistSecondViewHeadingResult,{flexDirection:"row"}]}>
              <Texting style={styles.JoblistSecondViewHeadingText} text='Results'/>
              <Text  style={styles.JoblistSecondViewHeadingText}>
              {' '}- {data}
              </Text>
            </View>
            <View style={styles.JobListUpperButtonView}>
              <View style={{right:wp(3), flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={props.detailed}>
                  <View style={styles.JobListUpperButtonIcon}>
                    <Image
                      source={Listed}
                      style={{
                        height:hp(4),
                        width:hp(4),
                        marginTop: scale(2),
                        marginRight: scale(10),
                      }}
                      tintColor={props.detailedTint ? themeColor : 'gray'  }
                      resizeMode={'contain'}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={props.Listed}>
                  <View style={styles.JobListUpperButtonIcon}>
                    <Image
                      source={props.detailedTint ? detailedgray :  detailed  }
                      style={{
                        height:hp(4),
                        width:hp(4),
                        // marginTop: scale(2),
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback onPress={props.sort}>
                <View
                  style={[
                    {
                      marginRight: scale(15),
                    },
                    styles.JobListUpperButtonIcon,
                  ]}>
                  <Image
                    source={sort}
                    style={{
                      height: scale(20),
                      width: scale(16),
                    }}
                    tintColor={props.srtTint ? themeColor : 'gray'}
                    resizeMode={'contain'}
                  />
                  <Texting style={[styles.JoblistUpperButton],{fontSize: hp(3),
    fontFamily: FontRegular,
    marginLeft: scale(2),color:props.srtTint ? themeColor:'gray'}} text='Sort'/>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={props.Filter}>
                <View style={styles.JobListUpperButtonIcon}>
                  <Image
                    source={filter}
                    tintColor={props.filTint ? themeColor : 'gray'}
                    style={{
                      height: scale(19),
                      width: scale(14),
                      marginTop: scale(1),
                    }}
                    resizeMode={'contain'}
                  />
                  <Texting style={[styles.JoblistUpperButton],{fontSize: hp(3),
    fontFamily: FontRegular,
    marginLeft: scale(2),color:props.filTint ? themeColor:'gray'}} text='Filter'/>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
)

export default TopHeader
