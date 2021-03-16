import React, { PureComponent } from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { scale } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { StarRating, NavigationHead, DropDownItem } from '../Component/ViewManager'
import { themeColor, themeWhite,blanks,Fulls } from '../Constant'
const {height, width} = Dimensions.get('window')

import { FontBold, FontRegular } from '../Constant/index'

class Items extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                width: wp(85),
                justifyContent: "center",
                marginBottom: scale(2),
            // marginLeft: '3%',
            }}><View style={{
                alignItems: "flex-start",
                justifyContent: "center",
                width: '35%'
            }}><Text
            style={{
                fontSize: scale(16),
                color: themeColor,
                fontFamily: 'Roboto-Regular',
            }}>{this.props.item['name']}</Text></View><View style={{
                alignItems: "flex-end",
                justifyContent: "center",
                width: '35%'
            }}>
            <StarRating
                                emptyStar={blanks}
                                fullStar={Fulls}
                                iconSet={'MaterialIcons'}
                                disabled={false}
                                maxStars={5}
                                starSize={scale(20)}
                                rating={this.props.item['rating']}
                                selectedStar={(rating) =>
                                  this.props.handleChange(rating, this.props.index)
                                }
                                fullStarColor={'orange'}
                              />
           </View></View>
        )
    }
}

export default Items