import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  View,Dimensions
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,
  library,
  icon,
  play,
  leftVid
} from '../src/IconManager';
import {
  themeColor,
  company,icons_jobType_blue,skillCategory,workExp,placeIcon,icons_salerytype,mobile,Mail,
  themeWhite,
  homeic,
  place,
  screen,
  edit,
  earth,
  dollor,
  user,
  bag,
  Background,
  sort,
  filter,
  TRANLINE,
  url,
  avtar,
  FontBold,
  cal,
  clock,
  interViewBack,
  Listed,
  detailed,backgroundCorner,blanks,Fulls,WhiteVideo,facebook,linkedin,whatsapp
} from '../Constant/index';
import ListShow from '../Component/ListShow'

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
// import ItemMV from './ItemMV'
import Swiper from 'react-native-deck-swiper';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Share from 'react-native-share';
const {
  height,
  width
} = Dimensions.get('window');
class UserPro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      id: '',
      status: '',
      jobId: '',
      comId: '',
      userId: '',
      show: false,
      userHeading:'',
      show1: false,
      currentDate: Date.now(),
      interviewDate: 'Interview Date',
      interviewTime: 'Interview Time',
      dark: false,
      fleg:false
    };
  }


  

  checking = () => {
    const {
      params
    } = this.props.navigation.state;
    const item = params ? params.item : null;
    // console.log('other item>>>> 98', global.ig);

    this.setState({
      data: global.ig,
      id: params.index,
      status: params.status,
      fleg: this.state.fleg == true ? !this.state.fleg : this.state.fleg,
    }, () => {
      console.log('id',this.props.navigation.state.params,params.index,global.ig)
      this.swiper.jumpToCardIndex(params.index);
    });
  };



  Back = () => {
    if (this.state.status == 'undefined')
      this.props.navigation.navigate('FirstJobList');
    else this.props.navigation.navigate('Admin');
  };

  onChange = (event, selectedDate) => {
    console.log('select date', new Date(selectedDate).toLocaleDateString());
    if (selectedDate === undefined) {
      this.setState({
        show: !this.state.show,
      });
      return;
    } else {
      this.setState({
        show: !this.state.show,
        interviewDate: new Date(selectedDate).toLocaleDateString(),
      });
      // global.Start_date = new Date(selectedDate).toLocaleDateString()
    }
  };
  onChange1 = (event, selectedDate) => {
    let minute, hour;
    minute = new Date(selectedDate).getMinutes();
    hour = new Date(selectedDate).getHours();
    minute = minute > 10 ? minute : '0' + minute;
    hour =
      hour <= 12 ?
      hour + ':' + minute + ' ' + 'am' :
      hour - 12 + ':' + minute + ' ' + 'pm';

    console.log(
      'event',
      event,
      new Date(selectedDate).getHours(),
      new Date(selectedDate).getMinutes(),
    );
    if (selectedDate === undefined) {
      this.setState({
        show1: !this.state.show1,
      });
      return;
    } else {
      this.setState({
        show1: !this.state.show1,
        interviewTime: hour,
      });
    }
  };
  Shadule = () => {
    const {
      jobId,
      comId,
      userId,
      interviewDate,
      interviewTime
    } = this.state;

    try {
      http
        .POST('api/schedule/interview', {
          companyId: global.Id,
          userId: userId,
          jobId: jobId,
          intDate: interviewDate,
          intTime: interviewTime,
          status: 'Interview',
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              snack(res['message']);
              console.log('res...interview. 255.', res['data']['result']);
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack('error while register' + error);
    }
    this.setState({
      dark: !this.state.dark,
    });
  };

  InterviewOperation = (status) => {
    console.log('0000000000000000', status);
    const {
      jobId,
      comId,
      userId
    } = this.state;

    try {
      http
        .POST('api/schedule/interview', {
          companyId: global.Id,
          userId: userId,
          jobId: jobId,
          status: status,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              snack(res['message']);
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack('error while register' + error);
    }
  };

  jaaveda = (status, item) => {
    console.log('hi');
    let Matched = [],
      Shortlisted = [],
      Interested = [],
      NotInterested = [],
      Rejected = [];

    console.log('status', status, item);
    try {
      http
        .POST('api/applyjob/comdec', {
          id: item,
          status: status,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              console.log('res.....', res['data']['result']);
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack('error while register' + error);
    }
  };

  onSwiped = (type, index) => {
    console.log(`on swiped ${type}`, index);
    console.log(',,,,', this.state.status);
    const {
      status
    } = this.state;
    const item = global.ig[index]['appid'];
    this.setState({
      id: index,
    });
    if (index >= global.ig.length - 1) {
      this.setState({
        fleg: !this.state.fleg,
      });
    }

    if (type == 'left') {
      if (status == null) {
        // alert('NotInterested')
        // this.setState({
        //   left: true
        // })
        this.jaaveda('Rejected', item);
      } else if (status == 'Interview') {
        for (let i in this.state.data) {
          if (item == this.state.data[i].appid)
            console.log('dfsdf inter 262', this.state.data[i]);
          // console.log('dfsdf', this.state.data)
          this.setState({
              jobId: this.state.data[i].jobId,
              comId: this.state.data[i].comId,
              userId: this.state.data[i].userId,
            },
            () => this.InterviewOperation('Rejected'),
          );
        }
      }
    } else if (type == 'right') {
      if (status == null) {
        for (let i in this.state.data) {
          if (item == this.state.data[i].appid)
            console.log('dfsdf null ', this.state.data[i]);
          this.setState({
            jobId: this.state.data[i].jobId,
            comId: this.state.data[i].comId,
            userId: this.state.data[i].id,
            dark: !this.state.dark,
            fleg: !this.state.fleg,
          },()=> {
            this.props.navigation.navigate('ShaduleInterView',{
              jobId:this.state.jobId,
              comId:this.state.comId,
              userId:this.state.userId,
              first_name:this.state.data[i].first_name,
              last_name:this.state.data[i].last_name
            })
          });
        }
      } else if (status == 'Interview') {
        for (let i in this.state.data) {
          if (item == this.state.data[i].appid)
            console.log('dfsdf', this.state.data[i]);
          this.setState({
              jobId: this.state.data[i].jobId,
              comId: this.state.data[i].comId,
              userId: this.state.data[i].userId,
            },
            () => this.InterviewOperation('Selected'),
          );
        }
      }
    } else if (type == 'top') {
      if (status == null || status == 'undefined') {
        this.setState({
            id: index,
          },
          () => this.Sharing(),
        );
      }
    } else if (type == 'bottom') {
      if (status == null) this.jaaveda('Shortlisted', item);
      // alert(' Short Listed ' + item)    }
    }
  };

  Sharing = async () => {
    let path = url + 'images/user/';
    console.log('path', global.ig[this.state.id].profile);
    let pt = path + global.ig[this.state.id].profile;
    const shareOptions = {
      title: 'Share via',
      subject: 'Spotjo',
      message: `Hey there \n I wish you are interesed in this job please check it \n Name: -${
        global.ig[this.state.id].first_name
      }  ${global.ig[this.state.id].last_name}\n Email: -${
        global.ig[this.state.id].email
      }\n City: -${global.ig[this.state.id].place}\n Mobile: -${
        global.ig[this.state.id].mobile
      }\n Salary: -${global.ig[this.state.id].minSal} - ${
        global.ig[this.state.id].maxSal
      },000 \n`,
      url: pt,
      failOnCancel: false,
    };
    try {
      await Share.open(shareOptions);
    } catch (err) {
      console.log(err);
    }
  };
  renderCard = (data, index) => {
    this.setState({userHeading:data.heading})
    // console.log('dat >>>>>>>>',hp(100),StatusBar.currentHeight,hp(10),scale(100),height,hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)));
    return (
      
        <ImageBackground
          style={{
            width: wp('96%'),
            height: hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),
            // flex:1
            // overflow: 'hidden',
          }}
          
          source={require('../Img/ract.png')}
          resizeMode={'stretch'}>
          <ScrollView removeClippedSubviews={true} style={{height:hp('100%') - (StatusBar.currentHeight + scale(100) + hp(5)),alignSelf:"stretch",marginBottom:15}} nestedScrollEnabled = {true}>
          <View style={{
                top: hp(2),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: '#333',
                fontSize: scale(23),
                fontFamily: "Roboto-Bold"
            }}>{data.first_name} {data.last_name}</Text></View>
            <View style={{
                flexDirection: "row",
                alignItems: "flex-start",alignItems:"center"
            }}>
   <ImageBackground style={{
                marginTop: hp(4.5),
                marginLeft: wp(7),
                width: wp(32),
                height: wp(32),
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5
            }}
            source={backgroundCorner}><Image 
            source={data.profile
                    ? {
                        uri: url + 'images/user/' + data.profile,
                      }
                    : avtar
                          }
            style={{
                height: wp('29'),
                width: wp('29'),
            // alignItems: "stretch",
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></ImageBackground>
            <View style={{
                flexDirection: "column",
                height: 50,
                width: wp(50),justifyContent:"center",alignItems:"center",
                marginTop: hp(4) ,marginHorizontal:wp(2)
            }}>
            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('VideoPlayer', {
                vid: url + '/images/user/' + data.video
            })}><View style={{
                flexDirection: "column",
                // height: hp(9),
                width: wp(26),
                alignItems: "center",
                justifyContent: "center"
            }}><Image source={WhiteVideo}  tintColor={themeColor}resizeMode={'contain'} style={{
                height: scale(65),
                width: scale(65),
            }}/><View style={{marginTop:scale(-10)}}><Text style={{
                color: themeColor,
                fontFamily: "Roboto-Regular",
                fontSize: scale(10)
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
            starSize={scale(15)}
            rating={3}
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
            }}><Image source={facebook} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25)
            }}/><Image source={linkedin} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25),
                marginHorizontal: wp(1)
            }}/><Image source={whatsapp} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25)
            }}/>
            </View>
          <View style={styles.CompanyProfileDetail}>
          <ListShow name={data.Company} image={company} />
          <ListShow name={data.isEmployed ? 'Employed' : 'Fresher' } image={icons_jobType_blue} />
          <ListShow name={data.heading} image={skillCategory} />
          <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={workExp}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                        {data.totalExp != '' && data.totalExp != null
                  ? data.totalExp-1
                  : 0 } 
                 -{ data.totalExp != '' && data.totalExp != null
                  ? data.totalExp
                  : 0 }
                {' '}Years /{' '}
                        </Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          100%
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <ListShow name={data.place + ' / 100%'} image={placeIcon} />
                      <ListShow name={data.mobile} image={mobile} />
                      <ListShow name={data.email} image={Mail} />
          </View></ScrollView>
        </ImageBackground>
    );
  };

  render() {
    const {
      data,
      dark,
      show1,
      show,
      id,
      left
    } = this.state;
    console.log('id>>>>>',global.ig[id])
    return (
      <SafeAreaView style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />
          <StatusBar hidden={false} backgroundColor={themeWhite} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text={global.ig && this.state.userHeading}
          />
          <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
              <Text style={styles.JoblistSecondViewHeadingText}>
                Results - {global.ig && data.length}
              </Text>
            </View>
            <View style={styles.JobListUpperButtonView}>
              <View style={{marginRight: scale(5), flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={() => this.Back()}>
                  <View style={styles.JobListUpperButtonIcon}>
                    <Image
                      source={Listed}
                      style={{
                        height: scale(26),
                        width: scale(26),
                        marginTop: scale(2),
                        marginHorizontal: scale(10),
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View style={styles.JobListUpperButtonIcon}>
                    <Image
                      source={detailed}
                      style={{
                        height: scale(26),
                        width: scale(26),
                        marginTop: scale(2),
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback>
                <View
                  style={[
                    {
                      marginRight: scale(15),
                    },
                    styles.JobListUpperButtonIcon,
                  ]}>
                  <Image
                    source={sort}
                    style={{
                      height: scale(20),
                      width: scale(16),
                    }}
                    resizeMode={'contain'}
                  />
                  <Text style={styles.JoblistUpperButton}>Sort</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.Filter}>
                <View style={styles.JobListUpperButtonIcon}>
                  <Image
                    source={filter}
                    style={{
                      height: scale(19),
                      width: scale(14),
                      marginTop: scale(1),
                    }}
                    resizeMode={'contain'}
                  />
                  <Text style={styles.JoblistUpperButton}>Filter</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          {global.ig ? (
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
                  inputCardOpacityRangeX={[wp(-75) / 3, -1.5, 0, 1.5, wp(75) / 3]}
                  overlayOpacityHorizontalThreshold={1}
                  backgroundColor={'transparent'}
                  cardHorizontalMargin={0}
                  cardVerticalMargin={0}
                  onSwiped={(index) => this.onSwiped('general', index)}
                  onSwipedLeft={(index) => this.onSwiped('left', index)}
                  onSwipedRight={(index) => this.onSwiped('right', index)}
                  onSwipedTop={(index) => this.onSwiped('top', index)}
                  onSwipedBottom={(index) => this.onSwiped('bottom', index)}
                  cards={global.ig}
                  cardIndex={this.state.id}
                  stackSize={2}
                  showSecondCard={true}
                  renderCard={this.renderCard}
                  animateOverlayLabelsOpacity
                  animateCardOpacity
                  swipeBackCard
                  overlayLabels={
                    this.state.status == null
                      ? {
                          bottom: {
                            title: 'Shortlisted',
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
                            title: 'rejected',
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
                            title: 'Interview',
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
                        }
                      : this.state.status == 'undefined'
                      ? {
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
                        }
                      : {
                          left: {
                            title: 'rejected',
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
                            title: 'Selected',
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
                        }
                  }
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop:
                      (hp('100%') -
                        (StatusBar.currentHeight + scale(100) + hp(5))) /
                      2,
                    marginHorizontal: wp(20),
                    position: 'absolute',
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
                  color: themeWhite,
                  fontSize: scale(18),
                  width: wp(60),
                }}>
                No Data found 😞
              </Text>
            </View>
          )}
          <View style={styles.TranLingImage}>
            <Image
              source={TRANLINE}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(UserPro);