import React, { PureComponent } from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { scale } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { Rating, NavigationHead, DropDownItem } from '../Component/ViewManager'
import { themeColor, themeWhite } from '../Constant/index'
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
            }}><Rating
            type='custom'
            imageSize={18}
            ratingCount={5}
            defaultRating={this.props.item['rating']}
            readonly={false}
            ratingBackgroundColor='transparent'
            startingValue={this.props.item['rating']}
            onFinishRating={(value, index) => this.props.handleChange(value, this.props.index)}
            // ratingColor={"#f1ee40"}
            // tintColor={themeWhite}
            /></View></View>
        )
    }
}

export default Items