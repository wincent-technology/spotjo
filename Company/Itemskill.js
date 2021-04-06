import React, { Component } from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { scale, secondsToTime } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { StarRating, NavigationHead, DropDownItem } from '../Component/ViewManager'
// import { Rating } from '../Component/ViewManager.js'
// import { left, library, icon, play, leftVid } from './IconManager';
import { themeColor, themeWhite,blanks,Fulls } from '../Constant/index'
// import styles from './Style'
const {height, width} = Dimensions.get('window')
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
const Items = global.language =='english' ? true : false

import { FontBold, FontRegular } from '../Constant/index'

class Itemskill extends Component {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                width: wp(80),
                justifyContent: "space-around",
                marginBottom: scale(2),
                marginTop: scale(1.5),
                height: scale(15),
                // paddingHorizontal:5,
                alignItems: "center"
            }}><View style={{
                height: scale(20),
                // width: scale(20),
                justifyContent: "center",
                alignItems: "center",
                marginTop: scale(-2)
            }}><Icon2 name={'highlight-off'} size={scale(15)} color={themeColor} onPress={() => {
                this.props.remove(this.props.item.cell, this.props.index)
            }}/></View><View style={{
                alignItems: "flex-start",
                justifyContent: "center",
                width: '45%',
                // marginLeft: '3%',
                // marginTop: scale(2)

            }}><Text
            style={{
                fontSize: scale(16),
                color: themeColor,
                fontFamily: 'Roboto-Regular',
            }} numberOfLines={1}>
                      {Items ? this.props.item.cell.english : this.props.item.cell.german}
                    </Text></View><View style={{
                alignItems: "flex-end",
                justifyContent: "center",
                width: '30%',
                alignItems: "center"

            }}>
           <StarRating
                                emptyStar={blanks}
                                fullStar={Fulls}
                                // halfStar={'star-half'}
                                iconSet={'MaterialIcons'}
                                disabled={false}
                                maxStars={5}
                                starSize={scale(20)}
                                rating={this.props.item.rating}
                                selectedStar={(rating) =>
                                  this.props.handleChange(rating, this.props.index)
                                }
                                fullStarColor={'orange'}
                              /></View></View>
        )
    }
}

export default Itemskill