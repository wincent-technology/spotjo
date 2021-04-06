import React, { PureComponent } from 'react'
import { View, Image, Dimensions, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { scale, secondsToTime } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
// import { Rating } from '../Component/ViewManager.js'
// import { left, library, icon, play, leftVid } from './IconManager';
import { themeColor, themeWhite,blanks,Fulls } from '../Constant/index'
// import styles from './Style'
const {height, width} = Dimensions.get('window')
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import {
    StarRating
  } from '../Component/ViewManager';
import { FontBold, FontRegular } from '../Constant/index'

class ItemMV extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);

    }
    render() {
        console.log('this>>>>>>>>>>>>>',this.props.item)
        return (
            <View style={{
                flexDirection: "row",
                alignItems: "center"
            }}>
            <View style={{
                marginHorizontal: scale(5)
            }}><Icon2 name={'highlight-off'} size={scale(20)} color={themeColor} onPress={() => {
                this.props.remove(this.props.item, this.props.index)
            }}/></View>
            <View style={{
                flexDirection: "column",
                paddingTop: hp(1),
                // height: hp(4),
                width: wp('80%')
            }}><Text style={{
                fontFamily: FontBold,
                fontSize: scale(18),
                color: themeColor
            }} numberOfLines={1}>{global.language == 'english' ? this.props.item.Degree.english : this.props.item.Degree.german}</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent:"space-between",
                paddingBottom: hp(1),
            }}><View style={{alignItems:'flex-start',width:wp(55),flexDirection:"column"}}>
<Text style={{
                fontFamily: FontBold,
                fontSize: scale(11),
                color: '#000',
            }}>{global.language == 'english' ? this.props.item.University.english : this.props.item.University.german} , {this.props.item.From} - {this.props.item.To}</Text>
            </View>
            <View style={{alignItems:"flex-end",marginTop:5,marginRight:5}}>
            <StarRating
                emptyStar={blanks}
                fullStar={Fulls}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                disabled={false}
                maxStars={5}
                starSize={scale(15)}
                rating={this.props.item.rating}
            starStyle={{marginLeft:2}}
                // selectedStar={(rating) => this.props.onStarRatingPress(rating)}
                fullStarColor={'orange'}
              />
            </View>
                    </View>
                    
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: wp(78),
                alignItems: "center"
            }}/></View>
            </View>
        )
    }
}

export default ItemMV