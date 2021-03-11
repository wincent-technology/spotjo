import React, {
  PureComponent
} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  scale
} from '../src/Util';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  StarRating
} from '../Component/ViewManager';
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
  Companyavtar,
  url,
  avtar,
  blanks,
  Fulls,
} from '../Constant/index';
import styles from '../src/Style';
const {
  height,
  width
} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

class ItemMVJobb extends PureComponent {
  // title, href, total_time, total_listen, image
  constructor(props) {
    super(props);

    console.log('this.props?????/ 54', this.props.item);
  }

  dateDiffInDays(dt) {
    const a = Date.parse(new Date(Date.now()));
    const b = Date.parse(new Date(dt));
    // global.CompanyExp = Math.floor(b - a)
    return Math.floor(a - b);
  }

  timeConversion = (millisec) => {
    let today = new Date(millisec);
    var mil = this.dateDiffInDays(today);
    let day, hour, minute, month, year, seconds;
    seconds = Math.floor(mil / 1000);
    minute = Math.floor(seconds / 60);
    hour = Math.floor(minute / 60);
    day = Math.floor(hour / 24);
    month = Math.floor(day / 30);
    year = Math.floor(month / 12);
    if (seconds < 60) {
      return seconds + ' Sec' + ' ago';
    } else if (minute < 60) {
      return minute + ' Min' + ' ago';
    } else if (hour < 24) {
      return hour + ' Hrs' + ' ago';
    } else if (day < 30) {
      return day + ' Days' + ' ago';
    } else if (month < 12) {
      return month + ' months' + ' ago';
    } else {
      return year + ' years' + ' ago';
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.push(this.props.item, this.props.index)}>
        <LinearGradient
          colors={['#fff', '#f3f2f2']}
          style={[styles.ItemMVMainView,{elevation:4}]}>
          <View style={styles.ItemMVSecondView}>
            <View
              style={{
                width: wp(80),
                justifyContent: 'center',
              }}>
              <Text style={styles.ItemMVHeader}>
                {this.props.item.first_name} {this.props.item.last_name}
              </Text>
            </View>
            <View
              style={{
                width: wp(18),
                justifyContent: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => this.props.Video(this.props.item)}>
                <View style={styles.ItemMVPlayNowView}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.ItemMVPlayNowText}>Play Now</Text>
                  </View>
                  <View style={styles.ItemMVPlayIcon}>
                    {play('videocam', scale(20), themeColor)}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.ItemMVImage}>
            <Image
              source={
                this.props.item.profile
                  ? {
                      uri: url + 'images/user/' + this.props.item.profile,
                    }
                  : avtar
              }
              style={styles.imageStyle}
              resizeMode={this.props.item.profile ? 'cover' : 'contain'}
            />
          </View>
          <View style={styles.ItemMVDetail}>
            <View>
              <Text
                style={{
                  fontSize: scale(13),
                  fontFamily: 'Roboto-Bold',
                  fontWeight: 'bold',
                }}>
                {this.props.item.Company}
              </Text>
            </View>

            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: scale(14),
                  width: scale(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={user}
                  style={styles.imageStyle}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={styles.ItemDetailLabel} numberOfLines={1}>
                Employed
              </Text>
            </View>
            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: scale(14),
                  width: scale(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={place}
                  style={styles.imageStyle}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={styles.ItemDetailLabel} numberOfLines={1}>
                {this.props.item.place ? this.props.item.place : this.props.item.address}
              </Text>
              <Text styles={styles.ItemDetailLabel}> /</Text>
              <Text style={styles.ItemMVDetailColor}> 100%</Text>
            </View>
            <View
              style={{
                marginTop: scale(-1),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: scale(14),
                  width: scale(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={edit}
                  style={styles.imageStyle}
                  resizeMode={'contain'}
                />
              </View>
              <Text
                style={{
                  marginLeft: scale(6),
                  marginTop: scale(-1),
                  width:
                    this.props.item.skills != null &&
                    this.props.item.skills.length >= 3
                      ? wp(38)
                      : 'auto',
                }}
                numberOfLines={1}>
                {this.props.item.skills != null &&
                  this.props.item.skills != undefined &&
                  this.props.item.skills.length &&
                  this.props.item.skills?.map((item, index) => {
                    return (
                      <Text
                        key={index}
                        style={{
                          fontFamily: 'Roboto-Regular',
                          fontSize: scale(12),
                          // marginTop: scale(-2)
                        }}>
                        {item.name} /{' '}
                      </Text>
                    );
                  })}
              </Text>
              <Text style={styles.ItemMVDetailColor}> 100%</Text>
            </View>
            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: scale(14),
                  width: scale(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={bag}
                  style={styles.imageStyle}
                  resizeMode={'contain'}
                />
              </View>

              <Text style={styles.ItemDetailLabel}>
                {this.props.item.totalExp != '' && this.props.item.totalExp != null
                  ? this.props.item.totalExp - 1
                  : 0 } 
                 -{ this.props.item.totalExp != '' && this.props.item.totalExp != null
                  ? this.props.item.totalExp
                  : 0 }
                Years /{' '}
              </Text>
              <Text style={styles.ItemMVDetailColor}> 100%</Text>
            </View>
          </View>
          <View style={styles.ItemMVTimeStamp}>
            <View style={styles.ItemMVTimeStampView}>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: scale(12),
                }}>
                {this.timeConversion(this.props.item.createdAt)}
              </Text>
            </View>
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
    );
  }
}

export default ItemMVJobb;