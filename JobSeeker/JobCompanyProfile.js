import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  ActivityIndicator,
  View,Linking,Alert
} from 'react-native';
import {
  withNavigationFocus,
  NavigationEvents,
  ThemeColors
} from 'react-navigation';
import styles from '../src/Style';
import ListShow from '../Component/ListShow'
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
  company,icons_jobType_blue,skillCategory,workExp,placeIcon,icons_salerytype,
  homeic,
  place,
  screen,
  edit,
  earth,
  url,
  dollor,
  user,
  bag,
  Background,
  sort,
  filter,
  TRANLINE,
  Companyavtar,
  FontBold,
  Listed,web,
  detailed,backgroundCorner,WhiteVideo,blanks,Fulls,facebook,linkedin,whatsapp,FontRegular
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  scale,
  snack
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  StarRating,
  NavigationHeader
} from '../Component/ViewManager.js';
import DoubleTap from '../Component/DoubleTap';
// import ItemMV from './ItemMV'
import Swipers from 'react-native-swiper';
import BasicInfoOfCompany from './BasicInfoOfCompany';
import JobDescription from './JobDescription';
import JobAboutCompany from './JobAboutCompany';
import JobLocation from './JobLocation'
import Swiper from 'react-native-deck-swiper';
import http from '../api';
import Share from 'react-native-share';
import TopHeader from '../Component/TopHeader'

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

class JobCompanyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changedindex: 0,
      data: '',
      id: '',
      blue: false,
      fleg: false,
    };
  }

  checking = () => {
    console.log('hey');
    const {
      params
    } = this.props.navigation.state;
    const item = params ? params.item : null;
    console.log('other item', item,global.all);
    global.item = item;

    this.setState({
      data: global.all,
      id: params.index,
    });
  };

  Filter = () => {
    this.props.navigation.navigate('JobSeekerFilter');
  };
  
  back = () => {
    console.log('hey back');
    global.item = global.all[this.state.id];

    if (this.state.changedindex > 0) this.refs.swiper.scrollBy(-1);
  };
  next = () => {
    console.log('global.all[this.state.id]>>>>>>>>>>>>', global.all[this.state.id]);
    global.item = global.all[this.state.id];
    if (this.state.changedindex < 4) this.refs.swiper.scrollBy(1);
  };
  Sharing = async () => {
    let path = url + 'images/company/';
    console.log('path', path);
    let pt = path + global.all[this.state.id].logo;
    const shareOptions = {
      title: 'Share via',
      subject: 'Spotjo',
      message: `Hey there \n I wish you are interesed in this job please check it \n Company name: -${
        global.all[this.state.id].name
      }\n Title: -${global.all[this.state.id].title}\n Email: -${
        global.all[this.state.id].email
      }\n Website: -${global.all[this.state.id].website}\n City: -${
        global.all[this.state.id].city
      }\n Mobile: -${global.all[this.state.id].mobile}\n Salary: -${
        global.all[this.state.id].salMin
      } - ${global.all[this.state.id].salMax},000k \n`,
      url: pt,
      failOnCancel: false,
    };
    try {
      await Share.open(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };

  onSwiped = (type, index) => {
    this.setState({
      id: index,
    });
    console.log('index', index);
    if (index >= global.all.length - 1) {
      console.log('hey');
      this.setState({
        fleg: !this.state.fleg,
      });
    }

    if (type == 'left') {
      try {
        http
          .POST('api/jobseeker/add', {
            userId: global.Id,
            comId: global.all[index].comapyId,
            jobId: global.all[index].id,
            status: 'Not Interested',
          })
          .then(
            async (res) => {
              if (res['data']['status']) {
                console.log('rrrrrrrrr>>>>>><<<<<<<<<<', res['data']['result']);
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(err['message']),
          );
      } catch (error) {
        snack(error);
      }
    } else if (type == 'bottom') {
      try {
        http
          .POST('api/jobseeker/add', {
            userId: global.Id,
            comId: global.all[index].comapyId,
            jobId: global.all[index].id,
            status: 'Save',
          })
          .then(
            async (res) => {
              if (res['data']['status']) {
                console.log('rrrrrrrrr>>>>>><<<<<<<<<<', res['data']['result']);
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(err['message']),
          );
      } catch (error) {
        snack(error);
      }
    } else if (type == 'right') {
      // console.log('global.Id ',global.Id,global.all[index].comapyId,global.all[index].id,global.all[index])
      try {
        http
          .POST('api/apply/job', {
            userId: global.Id,
            comId: global.all[index].comapyId,
            jobId: global.all[index].id,
          })
          .then(
            async (res) => {
              if (res['data']['status']) {
                snack(res['data']['message']);
                console.log('rrrrrrrrr>>>>>><<<<<<<<<<', res['data']);
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(err['message']),
          );
      } catch (error) {
        snack(error);
      }
    } else if (type == 'top') {
      this.Sharing();
    }
  };

  Back = () => {
    this.props.navigation.navigate('JobSeekerlist');
  };

  renderCard = (data, index) => {
    // this.setState({
    //     id: index
    // })


    return (
      <ScrollView
        style={{
          alignSelf: 'stretch',
        }}>
        <DoubleTap onDoubleTap={this.next}>
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
          </DoubleTap>
      </ScrollView>
    );
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

  render() {
    const {
      data,
      id,
      changedindex
    } = this.state;
    console.log('data>>>>>>>>>>' ,data)
    return data != '' ? (
      <SafeAreaView style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />
          <StatusBar hidden={true} backgroundColor={themeWhite} />
        <ImageBackground
          style={({overflow: 'hidden'}, [styles.ImageBlue])}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHeader onPress={() => this.Back()} text={data.title} />
          <TopHeader data={this.state.data.length && this.state.data.length} Listed = {this.Back} Filter={this.Filter} detailedTint={true} detailed={this.pushy}/>
          <Swipers
            scrollEnabled={changedindex == 0 ? false : true}
            onIndexChanged={(index) =>
              this.setState({
                changedindex: index == 0 ? 0 : 1,
              })
            }
            ref={'swiper'}
            index={this.state.changedindex}
            dotColor={themeColor}
            paginationStyle={{
              top: hp(-78),
              position: 'absolute',
              opacity: this.state.changedindex,
            }}>
            <View>
              <View style={styles.CompanyProfileMainImage1}>
                {!this.state.fleg ? (
                  <Swiper
                    ref={(swiper) => {
                      this.swiper = swiper;
                    }}
                    cardStyle={{
                      width: wp('96%'),
                      flex:1,marginBottom:10
                    }}
                    // overlayOpacityHorizontalThreshold={10}
                    // overlayOpacityVerticalThreshold={10}
                    inputOverlayLabelsOpacityRangeX={[wp(-100) / 3, -1, 0, 1, wp(100) / 3]}
                  overlayOpacityHorizontalThreshold={1}
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
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: FontBold,
                        color: themeColor,
                        fontSize: scale(18),
                        width: wp(60),
                      }}>
                      No More Jobs...😞
                    </Text>
                    <NavigationEvents onDidFocus={this.checking} />
                  </View>
                )}
              </View>
            </View>
            <View>
              <BasicInfoOfCompany />
            </View>
            <View>
              <JobDescription />
            </View>
            <View>
              <JobLocation />
            </View>
          </Swipers>
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
          tintColor={themeWhite}
          source={Background}
          resizeMode={'stretch'}>
          <ActivityIndicator size="large" color= {themeColor} />
          <NavigationEvents onDidFocus={this.checking} />
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(JobCompanyProfile);