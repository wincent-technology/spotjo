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
const reviews=["Terrible","Bad", "OK", "Good", "Very Good", "Professional",]
const EducationRate = ({onBack, onFinish , onStarRatingPress , onNext, ...props}) => 
{
return (
     <><View style = {
        {
            top: scale(0),
            marginHorizontal:wp(5),
            justifyContent:"center",
            alignItems:"center",
        }}>
        <Text style={{
            fontWeight: "bold",
            fontSize: hp(3),
            color: themeColor
        }}>
            {props.name}
        </Text>
        <Text style={{
            fontWeight: "bold",
            fontSize: hp(3),
            color: themeColor
        }}>
           {props.placeHolder}
        </Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{width:wp(25)}}/>
        <View style={{width:wp(38)}}><StarRating
            emptyStar={blanks}
            starStyle={{marginHorizontal:5}}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={hp(3)}
            rating={props.starCount}
            selectedStar={(rating) => onStarRatingPress(rating)}
            fullStarColor={'orange'}
            /></View><View style={{width:wp(30),alignItems: props.starCount == 5 ? 'center':"center"}}><Text style={{
                fontSize: hp(2),
                color: themeColor}}>{reviews[props.starCount]}</Text></View>
            </View>
        </View>
        <View style={{justifyContent:"space-between",alignItems:"flex-end",marginTop:20,marginHorizontal:wp(8)}}>
        <View style={{flexDirection:"row"}}>
              <TouchableOpacity 
              style={{borderWidth:0.5,paddingVertical:hp(0.5),marginRight:10,paddingHorizontal:hp(2),borderRadius:20,borderColor:"#333",justifyContent:"center",alignItems:"center"}} 
              onPress={onBack}>
                <Text style={{
                  fontWeight: "bold",
                fontSize: hp(2.7),
                color: themeColor

                }}>
                  Back
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={{borderWidth:0.5,paddingVertical:hp(0.5),paddingHorizontal:hp(2),borderRadius:20,borderColor:"#333",justifyContent:"center",alignItems:"center"}} 
              onPress={onFinish}>
                <Text style={{
                  fontWeight: "bold",
                fontSize: hp(2.7),
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