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
  FontRegular
} from '../Constant/index';
import styles from './Style';
const {
  height,
  width
} = Dimensions.get('window');
import TimeAgo from '../Component/TimeAgo'
import LinearGradient from 'react-native-linear-gradient';
import Texting from '../Constant/Text'
let i = 0;

const timeConversion = (a,b,c,d,e,props) => {
  
  let result = []
 if (a == 1) result.push('Employed')
 if (b == 1) result.push('FreeLancer')
 if (c == 1) result.push('Helping Vacancies')
 if (d == 1) result.push('Internship')
 if (e == 1) result.push('StudentJob')

 result = result.reduce((name,arr,index) => name + (result.length != 1 && index != 0 ? ' / ' + arr : arr),'')
  return result.length ? result : 'Fresher'
}

const skillc = (props) => {
  // props.item.skills global.Job_Title
// console.log('props',global.Job_Title)
  var count = [0,0];

  // "skills": [{"english": "Air-conditioning technology", "german": "Klimatechnik", "rating": 5}]
  // {"cell": {"createdAt": "2021-01-20T08:27:01.000Z", "english": "Air-conditioning technology", "german": "Klimatechnik", "id": 1888},
  //  "rating": 1, "right": false}
let v = [];
 v = global.Job_Title.map(item => {
   let obj = {}
   obj.english = item.cell.english
   obj.german = item.cell.german
  obj.rating = item.rating
  return obj
 })
//  console.log('v',v)
let ig = props.skills && props.skills.filter(e => v.length && v.reduce((item,i) => item + (i.english === e.english ? 1 : 0),1 ))

// console.log('i',ig.length)
// for( var key=0;key<v.length;key++) {
//     count[1]++; // total count
//     // console.log('props.skills[key] === v[key]',v[key]['english'])
//     if( props.skills && props.skills.some(item => item.english.toUpperCase() === v[key]['english'].toUpperCase())) {
//         count[0]++; // match count
//     }
// }

// for( var key in global.Favorite_Location) {
//   count[1]++; // total count
//   console.log('props.skills[key] === v[key]',props.skills[key] === v[key],props.skills[key],v[key])
//   if( props.city && props.city[key] === global.Favorite_Location[key].place) {
//       count[0]++; // match count
//   }
// }

// let i = props.skills && props.skills.filter((item,index) => v.includes(item[index]['english']))


// console.log('i', count[0]/5*100 + '%')
i = ig && ig.length * 20
return  ig && ig.length * 20 + '%';

}


const citis = (props) => {
  var count = [0,0];


  for( var key=0;key < global.Job_Location.length;key++) {
    count[1]++; // total count
    // console.log('props.skills[key] === v[key]',props.city.some(item => item.toUpperCase() == global.Favorite_Location[key].place.toUpperCase()))
    if( props.city &&  props.city.some(item => item.toUpperCase().includes(global.Job_Location[key].place.toUpperCase()))) {
        count[0]++; // match count
    }
  }
  // console.log('sdfcount',count[0])
return  count[0] >=1  ?  100 + '%' : 0 + '%';

}

  const ItemMV = (props) => {
    console.log(props)
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
              <Text style={styles.ItemMVHeader}>{props.item.title || 'Unknown'}</Text>
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
                onPress={() => props.heart(props.index)}>
                <View style={styles.ItemMVPlayNowView}>
                  <View style={styles.ItemMVPlayIcon}>
                    {play(props.item.heart ? 'heart' : 'heart-outline', hp(3), props.item.heart ? themeColor : '#333')}
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
                  fontSize: hp(2),
                  fontFamily: 'Roboto-Bold',
                  fontWeight: 'bold',
                }}>
                {props.item.name || 'Unknown'}
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
              <Text style={{marginLeft: scale(6),
    fontFamily: FontRegular,
    fontSize: hp(2),width:wp(35)}} numberOfLines={1}>
              {timeConversion(props.item.isEmployed,props.item.isFreelancer,props.item.isHelping,props.item.isInternship,
                props.item.isStudentJob,props.item)}
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
              <Text style={{
                marginLeft: scale(6),
    fontFamily: FontRegular,
    fontSize: hp(2),
    maxWidth:wp(35)
              }} numberOfLines={1}>
                { props.item.city && ( props.item.city == null || props.item.city.length === 0 ) && 'Unknown /' }
                {/* { !props.item.city && ( props.item.city == null || props.item.city.length === 0 ) && 'Unknown /' } */}
                {props.item.city != null && props.item.city.map((item, index) => {
                  return (
                    <Text
                      key={index}
                      style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: hp(2),
                        // marginTop: scale(-2)
                      }}>
                      {item} /{' '}
                    </Text>
                  );
                })}
              </Text>
              <Text style={styles.ItemMVDetailColor}>{props.item.city && (props.item.city.length != 0 || !props.item.city)? citis(props.item) : ' 0%'}</Text>
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
                  maxWidth:wp(35),
                  fontFamily: 'Roboto-Regular',
                        fontSize: hp(2),
                }}
                numberOfLines={1}>
            {(!props.item.skills  || props.item.skills.length == 0 ) && 'Unknown /'}
                {props.item.skills && props.item.skills.map((item, index) => {
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
              <Text style={styles.ItemMVDetailColor}>
              {props.item.skills && props.item.skills.length ==1 && <Text style={{color:'rgba(0,0,0,0.6)'}}>/</Text>}
              {(props.item.skills && props.item.skills.length != 0 ) ?  ' ' + skillc(props.item)  : ' 0%'}</Text>
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
                {
                  (props.item.minExp && props.item.maxExp) ?
              (
                <><Text style={styles.ItemDetailLabel}>
                {props.item.minExp} - {props.item.maxExp}
              </Text>
              <Texting style={styles.ItemDetailLabel} text='Years'/>
              <Text style={styles.ItemDetailLabel}>
                {' '}
              </Text>
              </>
              ) :
              (
                <>
              <Texting style={styles.ItemDetailLabel} text='Years_Not_Defined'/>
              </>
              )
              }
            </View>
          </View>
          <View style={styles.ItemMVTimeStamp}>
            <View style={styles.ItemMVTimeStampView}>
                <TimeAgo   style={{
                  fontFamily: 'Roboto-Regular',fontSize:hp(2.1)}}
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
                starSize={hp(2.8)}
                rating={(i/10) / 2}
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