import React, { PureComponent } from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { scale, secondsToTime } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
// import { Rating } from '../Component/ViewManager.js'
// import { left, library, icon, play, leftVid } from './IconManager';
import { themeColor, themeWhite } from '../Constant/index'
// import styles from './Style'
const {height, width} = Dimensions.get('window')

import { FontBold, FontRegular } from '../Constant/index'

class ItemMV extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={{
                flexDirection: "column",
                paddingTop: hp(1),
                // height: hp(4),
                width: wp('80%')
            }}><Text style={{
                width: "100%",
            }} numberOfLines={1}>{this.props.item.heading.map((item, index) => {
                return (
                    <Text key={index} style={{
                        fontFamily: FontBold,
                        fontSize: scale(12),
                        color: themeColor
                    }}>{item}{index > 0 ? (<Text>|</Text>) : (<Text> </Text>)}</Text>
                )
            })}</Text><View style={{
                flexDirection: 'row',
                paddingBottom: hp(1),
            }}><Text style={{
                fontFamily: FontBold,
                fontSize: scale(9.27),
                color: '#000'
            }}>{this.props.item.Company} ,</Text>
                    <Text style={{
                fontFamily: FontBold,
                fontSize: scale(9.27),
                color: '#000'
            }}>{this.props.item.Experience}</Text>
                    </View>
                     <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: wp(78),
                alignItems: "center"
            }}/></View>
        )
    }
}

export default ItemMV