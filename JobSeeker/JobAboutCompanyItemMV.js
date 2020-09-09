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

class JobAboutCompanyItemMv extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={{
                flexDirection: 'column',
                width: wp(96),
                marginTop: hp(1),
                marginHorizontal: wp(2),
            }}><View style={{
                flexDirection: "row",
                width: wp(96),
                justifyContent: "center",

            }}><View style={{
            }}><Text style={{
                fontFamily: FontRegular,
                fontSize: scale(18),
                color: '#000',
                width: wp(80)
            }}>{this.props.item}</Text></View></View></View>
        )
    }
}

export default JobAboutCompanyItemMv