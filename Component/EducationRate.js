import React from 'react'
import { left } from '../src/IconManager';
import { themeColor, themeWhite, whiteEdit,cal,blanks,Fulls } from '../Constant/index'
import {
    StarRating,
  } from './ViewManager';
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
const EducationRate = ({onBack, onFinish , onStarRatingPress , onNext, ...props}) => 
{
return (
     <><View style = {
        {
            top: scale(10),
            marginHorizontal:wp(5),
            justifyContent:"center",
            alignItems:"center"
        }}>
        <Text style={{
            fontWeight: "bold",
            fontSize: scale(18),
            color: themeColor
        }}>
            {props.name}
        </Text>
        <Text style={{
            fontWeight: "bold",
            fontSize: scale(18),
            color: themeColor
        }}>
           {props.placeHolder}
        </Text>
        <StarRating
            emptyStar={blanks}
            starStyle={{marginLeft:10}}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(25)}
            rating={props.starCount}
            selectedStar={(rating) => onStarRatingPress(rating)}
            fullStarColor={'orange'}
            />
        </View>
        <View style={{justifyContent:"space-between",alignItems:"flex-end",marginTop:30,marginHorizontal:wp(8)}}>
        <View style={{flexDirection:"row"}}>
              <TouchableOpacity 
              style={{borderWidth:1,paddingVertical:7,marginRight:10,paddingHorizontal:15,borderRadius:20,borderColor:"#333",justifyContent:"center",alignItems:"center"}} 
              onPress={onBack}>
                <Text style={{
                  fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor

                }}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={{borderWidth:1,paddingVertical:7,paddingHorizontal:15,borderRadius:20,borderColor:"#333",justifyContent:"center",alignItems:"center"}} 
              onPress={onFinish}>
                <Text style={{
                  fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor

                }}>
                  Finish
                </Text>
              </TouchableOpacity>
              </View>
            </View>
            <View style={{
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: 'wrap',
                marginTop: scale(1),
                marginHorizontal:wp(5),
                height: props.suggesion != [] && scale(70)
            }} /></>
)
        }

export default EducationRate