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
} from './Util';
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
} from './IconManager';
import {
  themeColor,
  themeWhite,
  place,
  edit,
  user,
  bag,
  Companyavtar,
  url,
  blanks,
  Fulls,
} from '../Constant/index';
import styles from './Style';
const {
  height,
  width
} = Dimensions.get('window');
import TimeAgo from '../Component/TimeAgo'
import LinearGradient from 'react-native-linear-gradient';
import Texting from '../Constant/Text'


  const ItemMV = (props) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => props.push(props.item, props.index)}>
        <LinearGradient
          colors={['#fff', '#f3f2f2']}
          style={[styles.ItemMVMainView,{elevation:4}]}>
          <View style={styles.ItemMVSecondView}>
            <View
              style={{
                width: wp(80),
                justifyContent: 'center',
              }}>
              <Text style={styles.ItemMVHeader}>{props.item.title}</Text>
            </View>
            <View
              style={{
                width: wp(9),
                marginRight:scale(3),
                justifyContent: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => props.Video(props.item)}>
                <View style={styles.ItemMVPlayNowView}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {play('videocam', scale(20), themeColor)}
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
                onPress={() => props.heart(props.index)}>
                <View style={styles.ItemMVPlayNowView}>
                  <View style={styles.ItemMVPlayIcon}>
                    {play(props.item.heart ? 'heart' : 'heart-outline', scale(20), props.item.heart ? themeColor : '#333')}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.ItemMVImage}>
            <Image
              source={
                props.item.logo
                  ? {
                      uri: url + 'images/company/' + props.item.logo,
                    }
                  : Companyavtar
              }
              style={styles.imageStyle}
              resizeMode={props.item.logo ? 'cover' : 'contain'}
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
                {props.item.name}
              </Text>
            </View>

            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: scale(18),
                  width: scale(18),
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
                {props.item.isEmployed == 1 ? (
                  <Texting style={styles.ItemDetailLabel} text='Employed'/>
                ) : (
                  ''
                )}
              </Text>
              <Text style={styles.ItemDetailLabel} numberOfLines={1}>
                {props.item.isFreelancer == 1 ? (
                  <Texting style={styles.ItemDetailLabel} text='Freelancer'/>
                ) : (
                  ''
                )}
              </Text>
            </View>
            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: scale(18),
                  width: scale(18),
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
                {props.item.city != null && props.item.city.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: scale(12),
                        // marginTop: scale(-2)
                      }}>
                      {item} /{' '}
                    </Text>
                  );
                })}
              </Text>
              <Text style={styles.ItemMVDetailColor}> 100%</Text>
            </View>
            <View
              style={{
                marginTop: scale(-1),
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: scale(18),
                  width: scale(18),
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
                  width: wp(35),
                }}
                numberOfLines={1}>
                {props.item.skills && props.item.skills.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: scale(12),
                        // marginTop: scale(-2)
                      }}>
                      {global.language == 'english' ? item.english : item.german} /{' '}
                    </Text>
                  );
                })}
              </Text>
              <Text style={styles.ItemMVDetailColor}>{props.item.skills && props.item.skills.length ==1 && <Text style={{color:'rgba(0,0,0,0.6)'}}>/</Text>} 100%</Text>
            </View>
            <View style={styles.ItemMVDetailIcon}>
              <View
                style={{
                  height: scale(18),
                  width: scale(18),
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
                {props.item.minExp}-{props.item.maxExp}
              </Text>
              <Texting style={styles.ItemDetailLabel} text='Years'/>
              <Text style={styles.ItemDetailLabel}>
                {' '}/{' '}
              </Text>
              <Text style={styles.ItemMVDetailColor}> 100%</Text>
            </View>
          </View>
          <View style={styles.ItemMVTimeStamp}>
            <View style={styles.ItemMVTimeStampView}>
                <TimeAgo   style={{
                  fontFamily: 'Roboto-Regular',}}
                   time={props.item.createdAt} />
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
                // selectedStar={(rating) => props.onStarRatingPress(rating)}
                fullStarColor={'orange'}
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    );
}

export default ItemMV;