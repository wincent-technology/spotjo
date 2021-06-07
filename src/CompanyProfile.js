import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
  Image,
  View,
  ActivityIndicator,Linking,TouchableOpacity
} from 'react-native';
import {
  withNavigationFocus,
  NavigationEvents,
} from 'react-navigation';
import styles from './Style';
import {
  themeColor,
  company,icons_jobType_blue,skillCategory,workExp,placeIcon,icons_salerytype,
  Background,
  themeWhite,
  url,
  Companyavtar,facebook,linkedin,whatsapp,web,
  blanks,Fulls,
  backgroundCorner,WhiteVideo,FontRegular
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  scale
} from './Util';
import {
  NavigationHeader,StarRating
} from '../Component/ViewManager.js';
import ListShow from '../Component/ListShow'
import TopHeader from '../Component/TopHeader'
import Swiper from 'react-native-deck-swiper';


const citis = (props) => {
  var count = [0,0];
  for( var key=0;key < global.Favorite_Location.length;key++) {
    count[1]++; // total count
    // console.log('props.skills[key] === v[key]',props.city.some(item => item.toUpperCase() == global.Favorite_Location[key].place.toUpperCase()))
    if( props.city &&  props.city.some(item => item.toUpperCase().includes(global.Favorite_Location[key].place.toUpperCase()))) {
        count[0]++; // match count
    }
  }
  // console.log('sdfcount',count[0])
// return  count[0] * 20 + '%';
return  count[0] >=1  ?  100 + '%' : 0 + '%';


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
let ig = props.skills.filter(e => v.length && v.reduce((item,i) => item + (i.english === e.english ? 1 : 0),1 ))

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
return  ig.length * 20

}

class CompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      length:'',id:'',
      res:''
    };
  }

  checking = () => {
    const {
      params
    } = this.props.navigation.state;
    const item = params ? params.item : null;
    console.log('length',params.length)
    this.setState({
      data: item != undefined || '' ? item : '',
      length : params.length,
      id:params.index
    });
    
    
    // console.log('<<<<<<<<<<<<<',this.state.data.city.map(item => console.log(item)))
  };
  timeConversion = (a,b,c,d,e) => {
    let result = []
    console.log('a',a,b,c,d,e)
   if (a == 1) result.push('Employed')
   if (b == 1) result.push('FreeLancer')
   if (c == 1) result.push('Helping Vacancies')
   if (d == 1) result.push('Internship')
   if (e == 1) result.push('StudentJob')
  
   result = result.reduce((name,arr,index) => name + (result.length != 1 && index != 0 ? ' / ' + arr : arr),'')
    return result.length ? result : 'Fresher'
  }

  Back = () => {
    console.log('global.all>>>>>>>>>>>>', global.all);
    this.props.navigation.goBack();
  };
  Filter = () => {
    this.props.navigation.navigate('Filter');
  };

  whatsap = (mobile) => {
      if (mobile === '000')
       {alert('Contact Number is not given')
        return}
        else{
    let url =
          "whatsapp://send?text=" +
         '' +
          "&phone=91" +
          mobile;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened successfully " + data);
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");
          });
        }
  }

  renderCard = (data, index) => {
    // this.setState({
    //     id: index
    // })
    // console.log('data',data)
    // let time = this.timeConversion(data.isEmployed,data.isFreelancer,data.isHelping,data.isInternship,
    //   data.isStudentJob)

    return (
      <ScrollView
        style={{
          alignSelf: 'stretch',
        }}>
        <View onStartShouldSetResponder={() => true}>
          <ImageBackground
            style={{
              width: wp('96%'),
              height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
              // paddingBottom:15
            }}
            source={require('../Img/ract.png')}
            resizeMode={'stretch'}>
            <ScrollView removeClippedSubviews={true} keyboardShouldPersistTaps={'handled'} style={{height:hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),alignSelf:"stretch",marginBottom:15}} nestedScrollEnabled = {true}>
            <View style={{
                top: hp(2),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: '#333',
                fontSize: hp(3),
                fontFamily: "Roboto-Bold"
            }}>{data.title && data.title || 'Unknown'}</Text></View>
                    <View style={{
                flexDirection: "row",
                alignItems: "flex-start",
            }}>
   <ImageBackground style={{
                marginTop: hp(4),
                marginLeft: wp(8),
                width: wp(28),
                height: wp(28),
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5
            }}
            source={backgroundCorner}><Image 
            source={data.logo
                    ? {
                        uri: url + 'images/company/' + data.logo,
                      }
                    : Companyavtar
                          }
            style={{
                height: wp('26'),
                width: wp('26'),
                borderRadius:wp(1.5)
            // alignItems: "stretch",
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></ImageBackground>
            <View style={{
                flexDirection: "column",
                height: wp(28),
                width: wp(50),justifyContent:"center",alignItems:"center",
                marginTop: hp(3),marginHorizontal:wp(2),
            }}>
            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('VideoPlayer', {
                vid: url + '/images/company/' + data.video
            })}><View style={{
                flexDirection: "column",
                // height: hp(9),
                width: wp(26),
                alignItems: "center",
                justifyContent: "center"
            }}><Image source={WhiteVideo}  tintColor={themeColor}resizeMode={'contain'} style={{
                height: scale(50),
                width: scale(50),
            }}/><View style={{marginTop:scale(-8)}}><Text style={{
                color: themeColor,
                fontFamily: "Roboto-Regular",
                fontSize: hp(1.5)
            }}>Company Profile</Text></View>
            </View></TouchableWithoutFeedback>
            <View style={{height:1,width:wp(40),backgroundColor:"#333",marginVertical:scale(7)}}/>
            <View style={{marginTop:scale(5)}}>
            <StarRating
            emptyStar={blanks}
            starStyle={{marginLeft:5}}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={hp(2.5)}
            rating={(skillc(data)/10) / 2}
            // selectedStar={(rating) => this.handleLanguage(rating, index)}
            fullStarColor={'orange'}
            /></View>
            </View>
            </View>
            <View style={{
                marginLeft: wp(7),
                marginTop: hp(1),
                height: hp(3),
                width: wp(32),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row'
            }}><TouchableOpacity onPress={()=>this.onSwiped()}><Image source={facebook} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7)
            }}/></TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onSwiped()}><Image source={linkedin} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7),
                marginHorizontal: wp(1)
            }}/></TouchableOpacity><TouchableOpacity onPress={()=>this.whatsap(data.mobile || '000')}><Image source={whatsapp} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7)
            }}/></TouchableOpacity>
            </View>
            <View style={styles.CompanyProfileDetail}>
            <ListShow name={data.name || 'Unknown'} image={company} />
                    <ListShow name={timeConversion(data.isEmployed,data.isFreelancer,data.isHelping,data.isInternship,
      data.isStudentJob)} image={icons_jobType_blue} />
                    <ListShow name={data.title || 'Unknown'} image={skillCategory} />
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={workExp}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                        {data.minExp != '' && data.minExp != null
                  ? data.minExp
                  : 0 } 
                 -{ data.maxExp != '' && data.maxExp != null
                  ? data.maxExp
                  : 0 }
                {' '}Years
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80),backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={placeIcon}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={{marginLeft: scale(10),
    fontSize: hp(2),
    fontFamily: FontRegular,maxWidth:wp(58)}} numberOfLines={data.city.length <= 1 ? 1 : 2}>
                        {(data.city.length === 0  ||  !data.city) && 'Unknown /'}
                        {data && data.city.map((item, index) => {
                      return (
                        <Text key={index} style={{marginLeft: scale(10),
    fontSize: hp(2),
    fontFamily: FontRegular,}}>
                          {item} /
                        </Text>
                      );
                    })}</Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          {
                          (data.city.length === 0  ||  !data.city) ? ' 0%' : citis(data) }
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80),backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={icons_salerytype}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                          {data.salMin} - {data.salMax}$
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80),backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                    <ListShow name={data.website || 'Not Available'} image={web} />
            </View>
            </ScrollView>
          </ImageBackground></View>
      </ScrollView>
    );
  };

  onSwiped = (type, index) => {
      this.props.navigation.navigate('JobLogin')
  };


  render() {
    const {
      data,id
    } = this.state;
    return data != '' ? (
      <SafeAreaView style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />

        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHeader onPress={() => this.Back()} text={data.title || ''} />
          <TopHeader data={this.state.length && this.state.length} Listed = {this.Back} Filter={this.Filter} detailedTint={true} detailed={this.pushy}/>
          <View style={styles.CompanyProfileMainImage1}>
          <Swiper
                    ref={(swiper) => {
                      this.swiper = swiper;
                    }}
                    cardStyle={{
                      width: wp('96%'),
                      flex:1,marginBottom:10
                    }}
                    inputOverlayLabelsOpacityRangeX={[wp(-100) / 3, -1, 0, 1, wp(100) / 3]}
                    inputOverlayLabelsOpacityRangeY={[-hp(100) / 3,  -1, 0, 1, hp(100) / 3]}
                    overlayOpacityHorizontalThreshold={1}
                    overlayOpacityVerticalThreshold={1}
                    backgroundColor={'transparent'}
                    cardHorizontalMargin={0}
                    cardVerticalMargin={0}
                    onSwiped={(g) => this.onSwiped('general',g)}
                    onSwipedLeft={(index) => this.onSwiped('left', index)}
                    onSwipedRight={(index) => this.onSwiped('right', index)}
                    onSwipedTop={(index) => this.onSwiped('top', index)}
                    onSwipedBottom={(index) => this.onSwiped('bottom', index)}
                    cards={global.all}
                    cardIndex={id}
                    stackSize={2}
                    showSecondCard={true}
                    renderCard={this.renderCard}
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    swipeBackCard
                    overlayLabels={{
                      bottom: {
                        title: 'Save',
                        style: {
                          label: {
                            borderColor: themeColor,
                            color: themeColor,
                            borderWidth: 5,
                            fontSize: 32,
                            borderRadius: 5,
                            textAlign: 'center',
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        },
                      },

                      left: {
                        title: 'Not Interested',
                        style: {
                          label: {
                            borderColor: 'red',
                            color: 'red',
                            borderWidth: 5,
                            fontSize: 32,
                            borderRadius: 5,
                            textAlign: 'center',
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        },
                      },
                      right: {
                        title: 'Applied',
                        style: {
                          label: {
                            borderColor: 'green',
                            color: 'green',
                            borderWidth: 5,
                            fontSize: 32,
                            borderRadius: 5,
                            textAlign: 'center',
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        },
                      },
                      top: {
                        title: 'Share',
                        style: {
                          label: {
                            borderColor: '#fcba03',
                            color: '#fcba03',
                            borderWidth: 5,
                            fontSize: 32,
                            borderRadius: 5,
                            textAlign: 'center',
                          },
                          wrapper: {
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            // marginTop: (hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)))/2,
                            // marginLeft: -48,
                          },
                        },
                      },
                    }}
                  />
          </View>
        </ImageBackground>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={[
            styles.ImageBlue,
            {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <ActivityIndicator size="large" color={themeColor} />
          <NavigationEvents onDidFocus={this.checking} />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(CompanyProfile);