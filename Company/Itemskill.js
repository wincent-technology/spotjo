import React, { PureComponent } from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { scale, secondsToTime } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { Rating, NavigationHead, DropDownItem } from '../Component/ViewManager'
// import { Rating } from '../Component/ViewManager.js'
// import { left, library, icon, play, leftVid } from './IconManager';
import { themeColor, themeWhite } from '../Constant/index'
// import styles from './Style'
const {height, width} = Dimensions.get('window')
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';


import { FontBold, FontRegular } from '../Constant/index'

class Itemskill extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <View style={{
                flexDirection: 'row',
                width: wp(80),
                justifyContent: "center",
                marginBottom: scale(2),
                marginTop: scale(1.5),
                height: scale(15),
                alignItems: "center"
            }}><View style={{
                height: scale(20),
                width: scale(20),
                justifyContent: "center",
                alignItems: "center",
                marginTop: scale(-2)
            }}><Icon2 name={'highlight-off'} size={scale(15)} color={themeColor} onPress={() => {
                this.props.remove(this.props.item.name, this.props.index)
            }}/></View><View style={{
                alignItems: "flex-start",
                justifyContent: "center",
                width: '40%',
                marginLeft: '3%',
                // marginTop: scale(2)

            }}><Text
            style={{
                fontSize: scale(16),
                color: themeColor,
                fontFamily: 'Roboto-Regular',
            }} numberOfLines={1}>
                      {this.props.item.name}
                    </Text></View><View style={{
                alignItems: "flex-end",
                justifyContent: "center",
                width: '35%',
                alignItems: "center"

            }}><Rating
            type='custom'
            imageSize={20}
            ratingCount={5}
            defaultRating={this.props.item['rating']}
            readonly={false}
            // ratingBackgroundColor='transparent'
            startingValue={this.props.item['rating']}
            onFinishRating={(value, index) => this.props.handleChange(value, this.props.index)}
            ratingBackgroundColor='#B0B0B0'
            ratingColor={'orange'}
            tintColor={'#fff'}

            /></View></View>
        )
    }
}

export default Itemskill