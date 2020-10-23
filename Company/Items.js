import React, {
    PureComponent
} from 'react'
import {
    View,
    Image,
    Dimensions,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native'
import {
    scale,
    secondsToTime
} from '../src/Util'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    Rating,
    NavigationHead,
    DropDownItem,
    StarRating
} from '../Component/ViewManager'
// import { Rating } from '../Component/ViewManager.js'
// import { left, library, icon, play, leftVid } from './IconManager';
import {
    themeColor,
    themeWhite,
    blanks,
    Fulls
} from '../Constant/index'
// import styles from './Style'
const {
    height,
    width
} = Dimensions.get('window')
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
// import StarRating from 'react-native-star-rating';
// import StarRating from '../Component/StarRating'
import {
    FontBold,
    FontRegular
} from '../Constant/index'

class Items extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);


    }
    render() {
        console.log('this.props.', this.props.item.rating);
        return (
            <View style={{
                flexDirection: 'row',
                width: wp(85),
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
            }}><Icon2 name={'highlight-off'} size={scale(20)} color={themeWhite} onPress={() => {
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
                color: themeWhite,
                fontFamily: 'Roboto-Regular',
            }} numberOfLines={1}>
                      {this.props.item.name}
                    </Text></View><View style={{
                alignItems: "flex-end",
                justifyContent: "center",
                width: '35%',
                alignItems: "center"

            }}>
            <StarRating
            emptyStar={blanks}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(20)}
            rating={this.props.item.rating}
            selectedStar={(rating, index) => this.props.handleChange(rating, this.props.index)}
            fullStarColor={'orange'}
            />
            </View></View>
        )
    }
}

export default Items