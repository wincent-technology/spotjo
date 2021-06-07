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
  Fulls,FontRegular
} from '../Constant/index';
import styles from '../src/Style';
const {
  height,
  width
} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Texting from '../Constant/Text'
const Items  = global.language == 'english' ? true : false;
import TimeAgo from '../Component/TimeAgo'
class ItemMVJobb extends React.Component {
  // title, href, total_time, total_listen, image
  constructor(props) {
    super(props);

    // console.log('this.props?????/ 54', this.props.item);
  }
  timeConversion = (a,b,c,d,e) => {
    let result = []
   if (a == 1) result.push('Employed')
   if (b == 1) result.push('FreeLancer')
   if (c == 1) result.push('Helping Vacancies')
   if (d == 1) result.push('Internship')
   if (e == 1) result.push('StudentJob')

   result = result.reduce((name,arr,index) => name + (result.length != 1 && index != 0 ? ' / ' + arr : arr),'')
    return result.length ? result : 'Fresher'
}
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.push(this.props.item, this.props.index)}>
        <LinearGradient
          colors={['#fff', '#f3f2f2']}
          style={[styles.ItemMVMainView,{elevation:4,overflow:"hidden"}]}>
          <View style={styles.ItemMVSecondView}>
            <View
              style={{
                width: wp(80),
                justifyContent: 'center',
              }}>
              <Text style={styles.ItemMVHeader}>
                {this.props.item.first_name || 'Unknown'} {this.props.item.last_name || 'Unknown'}
              </Text>
            </View>
            <View
              style={{
                width: wp(9),
                justifyContent: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => this.props.Video(this.props.item)}>
                <View style={styles.ItemMVPlayNowView}>
                 <View style={styles.ItemMVPlayIcon}>
                    {play('videocam', hp(3), themeColor)}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{
                width: wp(9),
                justifyContent: 'center',
              }}>
              <TouchableWithoutFeedback

                onPress={() => this.props.select(this.props.item,this.props.index)}>
                <View style={styles.ItemMVPlayNowView}>
                  <View style={styles.ItemMVPlayIcon}>
                    {play(this.props.item.heart ? 'heart' : 'heart-outline', hp(3),this.props.item.heart ? themeColor : '#333')}
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
                  fontSize: hp(2),
                  fontFamily: 'Roboto-Bold',
                  fontWeight: 'bold',
                }}>
                {this.props.item.Company || 'Unknown'}
              </Text>
            </View>

            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: hp(2.6),
                  width: hp(2.6),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={user}
                  style={styles.imageStyle}
                  resizeMode={'contain'}
                />
              </View>
              <Text style={{ marginLeft: scale(6),
    fontFamily: FontRegular,
    fontSize: hp(2),width:wp(35)}} numberOfLines={1}>
              {this.timeConversion(this.props.item.isEmployed,this.props.item.isFreelancer,this.props.item.isHelping,this.props.item.isInternship,
                this.props.item.isStudentJob)}
              </Text>
            </View>
            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: hp(2.6),
                  width: hp(2.6),
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
                {this.props.item.place ? this.props.item.place || 'Unknown' : this.props.item.address || 'Unknown'}
              </Text>
            </View>
            <View
              style={{
                marginTop: scale(-1),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: hp(2.6),
                  width: hp(2.6),
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
                  // marginTop: scale(-1),
                  maxWidth: wp(35),
                      flexWrap:'wrap',
                      overflow:"hidden"
                }}
                numberOfLines={1}>
                {(!this.props.item.skills || this.props.item.skills.length === 0  ) && 'Unknown /'}
                {this.props.item.skills &&
                  this.props.item.skills.length &&
                  this.props.item.skills.map((item, index) => {
                    return (
                      <Text
                        key={index}
                        style={{
                          fontFamily: 'Roboto-Regular',
                          fontSize: hp(2),
                          // marginTop: scale(-2)
                        }}>
                        {global.language == 'english' ? item.english : item.german} /{' '}
                      </Text>
                    );
                  })}
              </Text>
            </View>
            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: hp(2.6),
                  width: hp(2.6),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={bag}
                  style={styles.imageStyle}
                  resizeMode={'contain'}
                />
              </View>
                {this.props.item.totalExp != '' && this.props.item.totalExp != null ?
              <><Text style={styles.ItemDetailLabel}>
                {this.props.item.totalExp != '' && this.props.item.totalExp != null
                  ? this.props.item.totalExp - 1
                  : 0 } 
                 -{ this.props.item.totalExp != '' && this.props.item.totalExp != null
                  ? this.props.item.totalExp
                  : 0 }
                  {' '}Years /{' '}
              </Text>
              </>
              :
              <>
              <Texting style={styles.ItemDetailLabel} text='Years_Not_Defined'/>
              </>
              }
            </View>
          </View>
          <View style={styles.ItemMVTimeStamp}>
            <View style={styles.ItemMVTimeStampView}>
                <TimeAgo style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: hp(2.1),
                }} time={this.props.item.createdAt}/>
                
            </View>
            <Text style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: hp(2),
                }} >Status: {this.props.item.status}</Text>
            <View style={styles.ItemMVRatingView}>
              <StarRating
                emptyStar={blanks}
                fullStar={Fulls}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                disabled={false}
                maxStars={5}
                starSize={hp(2.8)}
                rating={0}
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