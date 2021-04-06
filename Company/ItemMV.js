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
    StarRating
} from '../Component/ViewManager'
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
    user,
    bag,
    url,
    Companyavtar,
    blanks,
    Fulls
} from '../Constant/index'
import styles from '../src/Style'
const {
    height,
    width
} = Dimensions.get('window')
import LinearGradient from 'react-native-linear-gradient'


const CompanyProfileIcon = {
    height: scale(20),
    width: scale(20),
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
const Items  = global.language == 'english' ? true : false;

class ItemMV extends PureComponent {
    // title, href, total_time, total_listen, image
    constructor(props) {
        super(props);
        console.log('this',this.props)
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
            <TouchableWithoutFeedback onPress={() => this.props.push(this.props.item,this.props.index)}>
            <LinearGradient colors={['#fff', '#f3f2f2']} style={styles.ItemMVMainView}>
            <View style={styles.ItemMVSecondView}>
            <View style={{
                width: wp(80),
                justifyContent: "center",
            }}>
            <Text style={styles.ItemMVHeader}>{this.props.item.title}</Text></View>
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
                Companyavtar
            }
            style={styles.imageStyle}
            resizeMode={this.props.item.logo ? 'contain' : 'cover'}
            /></View>
            <View style={styles.ItemMVDetail}>
            <View><Text style={{
                fontSize: scale(13),
                fontFamily: 'Roboto-Bold',
                fontWeight: "bold"
            }}>{this.props.item.name}</Text></View>
        
            <View style={styles.ItemMVDetailIcon}>
            <View style={CompanyProfileIcon}>
            <Image source ={user} style={styles.imageStyle} resizeMode={'contain'} /></View>
            <Text style={styles.ItemDetailLabel}>
            {this.props.item.isEmployed == 1 ? <Text>Employed</Text> : ''}</Text>
            <Text style={styles.ItemDetailLabel}>
            {this.props.item.isFreelancer == 1 ? <Text>/ Freelancer</Text> : ''}</Text>
            </View>
            <View style={styles.ItemMVDetailIcon}><View style={CompanyProfileIcon}>
            <Image source ={place} style={styles.imageStyle} resizeMode={'contain'} /></View>
            <Text style={styles.ItemDetailLabel} numberOfLines={1}>
            {this.props.item.city && this.props.item.city.map((item, index) => {
                return (
                    <Text  key={index} style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: scale(12)
                    }}>{item} / </Text>
                )
            })}
            </Text>
            <Text style={styles.ItemMVDetailColor}> 100%</Text></View>
            <View style={[styles.ItemMVDetailIcon,{maxWidth:wp(35)}]}><View style={CompanyProfileIcon}><Image source ={edit} style={styles.imageStyle} resizeMode={'contain'} /></View><Text style={{
                marginLeft: scale(5)
            }} numberOfLines={1} >{this.props.item.skills && this.props.item.skills.map((item, index) => {
                return (
                    <Text  key={index} style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: scale(12)
                    }}>{Items ? item.english : item.german} / </Text>
                )
            })}</Text>
            <Text style={styles.ItemMVDetailColor}>{this.props.item.skills && this.props.item.skills.length ==1 && <Text style={{color:'rgba(0,0,0,0.6)'}}>/</Text>} 100%</Text></View>
            <View style={styles.ItemMVDetailIcon}>
                
                <View style={CompanyProfileIcon}><Image source ={bag} style={styles.imageStyle} resizeMode={'contain'} /></View>
                
                <Text style={styles.ItemDetailLabel}>{this.props.item.minExp ? this.props.item.minExp : 0 }-{this.props.item.maxExp ?this.props.item.maxExp : 0} Years / </Text><Text style={styles.ItemMVDetailColor}> 100%</Text></View>
   
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
            // selectedStar={(rating) => this.props.onStarRatingPress(rating)}
            fullStarColor={'orange'}
            />
            </View>
            </View>
            </LinearGradient>
            </TouchableWithoutFeedback>
        )
    }
}

export default ItemMV