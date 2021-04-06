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
    scale
} from '../src/Util'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    Rating,
    StarRating
} from '../Component/ViewManager.js'
import {
    left,
    library,
    icon,
    play,
    leftVid
} from '../src/IconManager';
import {
    themeColor,
    themeWhite,
    place,
    edit,
    employedtheme,
    bag,
    url,
    Companyavtar,
    mailtheme,
    male,
    blanks,
    Fulls
} from '../Constant/index'
import styles from '../src/Style'
const {
    height,
    width
} = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'

class User extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);
    }
    dateDiffInDays(dt) {
        const a = Date.parse(new Date(Date.now()))
        const b = Date.parse(new Date(dt))
        // global.CompanyExp = Math.floor(b - a)
        return Math.floor(a - b)

    }

    timeConversion = (millisec) => {
        let today = new Date(millisec);
        var mil = this.dateDiffInDays(today)
        let day,
            hour,
            minute,
            month,
            year,
            seconds;
        seconds = Math.floor(mil / 1000);
        minute = Math.floor(seconds / 60);
        hour = Math.floor(minute / 60);
        day = Math.floor(hour / 24);
        month = Math.floor(day / 30)
        year = Math.floor(month / 12)
        if (seconds < 60) {
            return seconds + " Sec" + " ago";
        } else if (minute < 60) {
            return minute + " Min" + " ago";
        } else if (hour < 24) {
            return hour + " Hrs" + " ago";
        } else if (day < 30) {
            return day + " Days" + " ago"
        } else if (month < 12) {
            return month + " months" + " ago"
        } else {
            return year + ' years' + ' ago'
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.push(this.props.item)}>
            <LinearGradient colors={['#fff', '#f3f2f2']} style={styles.ItemMVMainView}>
            <View style={styles.ItemMVSecondView}>
            <View style={{
                width: wp(80),
                justifyContent: "center",
            }}>
            <Text style={styles.ItemMVHeader}>{this.props.item.firstName} {this.props.item.lastName}</Text></View>
            <View style={{
                width: wp(18),
                justifyContent: "center",
            }}><TouchableWithoutFeedback onPress={() => this.props.Video(this.props.item)}>
            <View style={styles.ItemMVPlayNowView}>
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}><Text style={styles.ItemMVPlayNowText}>Play Now</Text></View>
            <View style={styles.ItemMVPlayIcon}>
            {play('videocam', scale(20), themeColor)}
            </View></View></TouchableWithoutFeedback></View></View>
            <View style={styles.ItemMVImage}><Image
            source = {this.props.item.logo ? {
                uri: url + 'images/company/' + this.props.item.logo
            } :
                male
            }
            style={styles.imageStyle}
            resizeMode={'contain'}
            /></View>
            <View style={[styles.ItemMVDetail], {
                marginTop: scale(61),
                marginLeft: scale(140),
                position: "absolute"

            }}>
            <View style={styles.ItemMVDetailIcon}>
            <View style={styles.CompanyProfileIcon}>
            <Image source ={employedtheme} style={styles.imageStyle} resizeMode={'contain'} /></View>
            <Text style={styles.ItemDetailLabel}>
            {this.props.item.role == 4 && 'Staff'}</Text>
            </View>
            <View style={styles.ItemMVDetailIcon}><View style={styles.CompanyProfileIcon}>
            <Image source ={mailtheme} style={styles.imageStyle} resizeMode={'contain'} /></View>
            <Text style={styles.ItemDetailLabel} numberOfLines={1}>{this.props.item.email}</Text>
            </View>
      </View>
            <View style={styles.ItemMVTimeStamp}><View style={styles.ItemMVTimeStampView}><Text style={{
                fontFamily: 'Roboto-Regular',
                fontSize: scale(12)
            }}>{this.timeConversion(this.props.item.createdAt)}</Text></View>
            <View style={styles.ItemMVRatingView}>
             <StarRating
            emptyStar={blanks}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(20)}
            rating={5}
            selectedStar={(rating) => this.props.onStarRatingPress(rating)}
            fullStarColor={'orange'}
            /></View>
            </View>
            </LinearGradient>
            </TouchableWithoutFeedback>
        )
    }
}

export default User