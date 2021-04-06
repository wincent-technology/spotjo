import React, {
  PureComponent
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
  View,
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
  company,icons_jobType_blue,skillCategory,workExp,placeIcon,icons_salerytype,
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
  Listed,web,
  detailed,backgroundCorner,WhiteVideo,blanks,Fulls,facebook,linkedin,whatsapp,
  
  Companyavtar
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  NoData,
  scale,
  snack
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  StarRating,
  NavigationHeader
} from '../Component/ViewManager.js';
import ListShow from '../Component/ListShow'

// import ItemMV from './ItemMV'
import {
  BlurView
} from "@react-native-community/blur";
import Swiper from 'react-native-deck-swiper';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import Share from 'react-native-share';

class PostedJobUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      id: 0,
      status: '',
      jobId: '',
      comId: '',
      userId: '',
      show: false,
      show1: false,
      currentDate: Date.now(),
      interviewDate: 'Interview Date',
      interviewTime: 'Interview Time',
      dark: false,
    };
  }

  checking = () => {
    const {
      params
    } = this.props.navigation.state;
    const item = params ? params.item : null;
    console.log('other item????????????', params.index);

    this.setState({
      data: global.ig,
      id: params.index,
      status: params.status,
    }, () => {
      this.swiper.jumpToCardIndex(this.state.id);
    });

  };

  componentDidMount(){
    this._scrollView.scrollResponderHandleStartShouldSetResponder = () => true
  }

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
    // console.log(`on swiped ${type}`, index);
    // console.log(',,,,', this.state.status);
    // const {
    //   status
    // } = this.state;
    // const item = global.ig[index]['appid'];
    // this.setState({
    //   id: index,
    // });
    // if (index >= global.ig.length - 1) {
    //   this.setState({
    //     fleg: !this.state.fleg,
    //   });
    // }

    // if (type == 'left') {
    //   if (status == null) {
    //     // alert('NotInterested')
    //     // this.setState({
    //     //   left: true
    //     // })
    //     this.jaaveda('Rejected', item);
    //   } else if (status == 'Interview') {
    //     for (let i in this.state.data) {
    //       if (item == this.state.data[i].appid)
    //         console.log('dfsdf inter 262', this.state.data[i]);
    //       // console.log('dfsdf', this.state.data)
    //       this.setState({
    //           jobId: this.state.data[i].jobId,
    //           comId: this.state.data[i].comId,
    //           userId: this.state.data[i].userId,
    //         },
    //         () => this.InterviewOperation('Rejected'),
    //       );
    //     }
    //   }
    // } else if (type == 'right') {
    //   if (status == null) {
    //     for (let i in this.state.data) {
    //       if (item == this.state.data[i].appid)
    //         console.log('dfsdf null ', this.state.data[i]);
    //       this.setState({
    //         jobId: this.state.data[i].jobId,
    //         comId: this.state.data[i].comId,
    //         userId: this.state.data[i].id,
    //         dark: !this.state.dark,
    //       });
    //     }
    //   } else if (status == 'Interview') {
    //     for (let i in this.state.data) {
    //       if (item == this.state.data[i].appid)
    //         console.log('dfsdf', this.state.data[i]);
    //       this.setState({
    //           jobId: this.state.data[i].jobId,
    //           comId: this.state.data[i].comId,
    //           userId: this.state.data[i].userId,
    //         },
    //         () => this.InterviewOperation('Selected'),
    //       );
    //     }
    //   }
    // } else if (type == 'top') {
    //   if (status == null || status == 'undefined') {
    //     this.setState({
    //         id: index,
    //       },
    //       () => this.Sharing(),
    //     );
    //   }
    // } else if (type == 'bottom') {
    //   if (status == null) this.jaaveda('Shortlisted', item);
    //   // alert(' Short Listed ' + item)    }
    // }
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
    return (
      <ScrollView removeClippedSubviews={true}  onScroll={(e) => {
        console.log('e.nativeEvent.contentOffset.x / w',e.nativeEvent.contentOffset.y)
    }} ref={x => this._scrollView = x} style={{flex:1,flexGrow:1,alignSelf:"stretch",marginBottom:15}} nestedScrollEnabled = {true}>
          <ImageBackground
            style={{
              width: wp('96%'),
           flex:1,paddingBottom:20
              // paddingBottom:20
            }}
            source={require('../Img/ract.png')}
            resizeMode={'stretch'}>
          
            <View style={{
                top: hp(1),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: '#333',
                fontSize: scale(23),
                fontFamily: "Roboto-Bold"
            }}>{data.title}</Text></View>
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
            source={data.logo
                    ? {
                        uri: url + 'images/company/' + data.logo,
                      }
                    : Companyavtar
                          }
            style={{
                height: wp('29'),
                width: wp('29'),
            // alignItems: "stretch",
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></ImageBackground>
            <View style={{
                flexDirection: "column",
                height:50,
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
            <View style={styles.CompanyProfileDetail}>
            <ListShow name={data.name} image={company} />
                    <ListShow name={data.isEmployed ? 'Employed' : 'Fresher' } image={icons_jobType_blue} />
                    <ListShow name={data.title} image={skillCategory} />
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
                {' '}Years /{' '}
                        </Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          100%
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={placeIcon}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                        {data != null || data && data.city.map((item, index) => {
                      return (
                        <Text key={index} style={styles.ItemDetailLabel1}>
                          {item} /
                        </Text>
                      );
                    })}</Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          {' '}
                          100%
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={icons_salerytype}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                          {data.salMin} - {data.salMax},000$
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                    <ListShow name={data.website} image={web} />
            </View>
          </ImageBackground>
      </ScrollView>
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

    return (
      <SafeAreaView style={styles.backGround}>
        <NavigationEvents onDidFocus={this.checking} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHeader
            onPress={() => this.Back()}
            text={global.ig && data.heading}
          />
          <TopHeader />
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
                    flex:1,marginBottom:15
                  }}
                  // overlayOpacityHorizontalThreshold={10}
                  // overlayOpacityVerticalThreshold={10}
                  inputOverlayLabelsOpacityRangeX={[wp(-100) / 3, -1, 0, 1, wp(100) / 3]}
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
                  // verticalSwipe={false}
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
                      color: themeWhite,
                      fontSize: scale(18),
                      width: wp(60),
                    }}>
                    No More Jobs...😞
                  </Text>
                  <NavigationEvents onDidFocus={this.checking} />
                </View>
              )}
              {dark && (
                <ImageBackground
                  style={{
                    width: wp('90%'),
                    height:
                      hp('100%') -
                      (StatusBar.currentHeight + scale(100) + hp(7)),
                    marginHorizontal: wp(2.7),
                  }}
                  source={interViewBack}
                  resizeMode={'stretch'}>
                  <View
                    style={{
                      zIndex: 1,
                      top: scale(15),
                      right: scale(15),
                      height: scale(25),
                      width: scale(25),
                      position: 'absolute',
                    }}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.setState({
                          dark: !this.state.dark,
                        })
                      }>
                      <View
                        style={{
                          height: scale(25),
                          width: scale(25),
                          zIndex: 1,
                        }}
                        hitSlop={{
                          top: 15,
                          bottom: 15,
                          left: 15,
                          right: 15,
                        }}>
                        <Icon2 name={'clear'} size={scale(20)} color={'#fff'} />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        width: wp(96),
                        marginVertical: hp(4),
                      }}>
                      <Text
                        style={{
                          fontSize: scale(18),
                          fontFamily: 'Roboto-Bold',
                          color: themeWhite,
                        }}>
                        Schedule InterView
                      </Text>
                    </View>
                    <View
                      style={{
                        marginTop: hp(10),
                      }}>
                      <View
                        style={{
                          backgroundColor: themeColor,
                          width: wp(70),
                          height: scale(40),
                          borderColor: themeColor,
                          alignItems: 'center',
                          borderWidth: scale(1),
                          borderRadius: scale(5),
                          flexDirection: 'row',
                        }}
                        onStartShouldSetResponder={() =>
                          this.setState({
                            show: !this.state.show,
                          })
                        }>
                        <View
                          style={{
                            marginLeft: 10,
                            width: wp(50),
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: scale(18),
                              fontFamily: 'Roboto-Bold',
                              fontWeight: 'bold',
                            }}>
                            {this.state.interviewDate}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: scale(20),
                            width: scale(20),
                            height: scale(20),
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={cal}
                            style={{
                              height: scale(20),
                              width: scale(20),
                            }}
                            resizeMode={'contain'}
                          />
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: hp(2),
                      }}>
                      <View
                        style={{
                          backgroundColor: themeColor,
                          width: wp(70),
                          height: scale(40),
                          borderColor: themeColor,
                          alignItems: 'center',
                          borderWidth: scale(1),
                          borderRadius: scale(5),
                          flexDirection: 'row',
                        }}
                        onStartShouldSetResponder={() =>
                          this.setState({
                            show1: !this.state.show,
                          })
                        }>
                        <View
                          style={{
                            marginLeft: 10,
                            width: wp(50),
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: scale(18),
                              fontFamily: 'Roboto-Bold',
                              fontWeight: 'bold',
                            }}>
                            {this.state.interviewTime}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: scale(20),
                            width: scale(20),
                            height: scale(20),
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={clock}
                            style={{
                              height: scale(20),
                              width: scale(20),
                            }}
                            resizeMode={'contain'}
                          />
                        </View>
                      </View>
                    </View>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.currentDate}
                        mode={'date'}
                        is24Hour={true}
                        display="spinner"
                        onChange={this.onChange}
                      />
                    )}
                    {show1 && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.currentDate}
                        mode={'time'}
                        is24Hour={false}
                        display="default"
                        onChange={this.onChange1}
                      />
                    )}
                    <View
                      style={{
                        top: hp(22),
                      }}>
                      <TouchableWithoutFeedback
                        style={styles.OpportunityView}
                        onPress={this.Shadule}>
                        <View
                          style={{
                            height: scale(40),
                            width: scale(250),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: themeColor,
                            borderRadius: scale(5),
                          }}>
                          <Text
                            style={{
                              fontSize: scale(18),
                              fontFamily: FontBold,
                              color: themeWhite,
                              fontWeight: 'bold',
                            }}>
                            Schedule Now
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </ImageBackground>
              )}
            </View>
          ) : (
            <NoData />
          )}
          
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(PostedJobUser);