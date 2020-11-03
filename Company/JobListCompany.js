import React, {PureComponent} from 'react';
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
  View,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import {
  themeColor,
  themeWhite,
  Background,
  sort,
  filter,
  cal,
  clock,
  TRANLINE,
  male,
  female,
  canvas,
  darkract,
  FontBold,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {scale, snack} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {Rating, NavigationHeader} from '../Component/ViewManager.js';
import ItemMVJobbM from './ItemMVJobbM';
import CompanyProfile from '../src/CompanyProfile';
import DeviceInfo from 'react-native-device-info';
import DateTimePicker from '@react-native-community/datetimepicker';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import http from '../api';

// import styles from './Style'
var c = 0;

class JobListCompany extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      show1: false,
      currentDate: Date.now(),
      interviewDate: '',
      interviewTime: '',
      selectedValue: 'City',
      selectedValue1: 'Languages',
      dark: false,
      gestureName: 'none',
      userdata: [],
      data: [],
      Shortlisted: [],
      InterView: [],
      Selected: [],
      jobId: '',
      comId: '',
      userId: '',
      int: false,
      sel: false,
      short: false,
    };
  }

  // jaaveda = (status, item) => {
  //     let Matched = [],
  //         Shortlisted = [],
  //         Interested = [],
  //         NotInterested = [],
  //         Rejected = [];

  //     console.log('status', status, item);
  //     try {
  //         http.POST('api/applyjob/comdec', {
  //             id: item,
  //             status: status
  //         }).then((res) => {
  //             if (res['data']['status']) {
  //                 console.log('res.....', res['data']['result'])
  //                 for (let i in res['data']['result']) {
  //                     if (res['data']['result'][i]['status'] == 'Matched') {
  //                         Matched.push(res['data']['result'][i])
  //                     } else if (res['data']['result'][i]['status'] == 'Shortlisted') {
  //                         Shortlisted.push(res['data']['result'][i])
  //                     } else if (res['data']['result'][i]['status'] == 'Interested') {
  //                         Interested.push(res['data']['result'][i])
  //                     } else if (res['data']['result'][i]['status'] == 'Not Interested') {
  //                         NotInterested.push(res['data']['result'][i])
  //                     } else if (res['data']['result'][i]['status'] == 'Rejected')
  //                         Rejected.push(res['data']['result'][i])
  //                 }
  //                 this.setState({
  //                     Matched,
  //                     Shortlisted,
  //                     Interested,
  //                     NotInterested,
  //                     Rejected
  //                 })
  //             } else {
  //                 snack(res['data']['message'])
  //             }
  //         }, err => snack(err['message']))
  //     } catch ( error ) {
  //         snack("error while register" + error)
  //     }
  // }
  onSwipeUp = (gestureState, item, status) => {
    // if (status == null) {
    //     this.jaaveda('Matched', item);
    // } else if (status == 'Matched') {
    //     this.jaaveda('Shortlisted', item);
    // } else if (status == 'Shortlisted') {
    //     this.jaaveda('Shortlisted', item);
    // }
  };

  onSwipeDown = (gestureState, item, status) => {
    // if (status == 'Matched')
    //     this.jaaveda('Selected', item);
    //     // alert(' Short Listed ' + item)
  };

  onSwipeLeft = (gestureState, item, status) => {
    // // alert(' Not Interested ' + item)
    // if (status == null) {
    //     this.jaaveda('Not Interested', item);
    // } else if (status == 'Matched') {
    //     this.jaaveda('Rejected', item);
    // }
  };

  onSwipeRight = (gestureState, item, status) => {
    // // alert(' Interested ' + item)
    // if (status == null) {
    //     this.jaaveda('Interested', item);
    // } else if (status == 'Matched') {
    //     for (let i in this.state.Matched) {
    //         if (item == this.state.Matched[i].appid)
    //             console.log('dfsdf', this.state.Matched)
    //         this.setState({
    //             jobId: this.state.Matched[i].jobId,
    //             comId: this.state.Matched[i].comId,
    //             userId: this.state.Matched[i].id,
    //             dark: !this.state.dark
    //         });
    //     }
    // }
  };
  onSwipe = (gestureName, gestureState) => {
    console.log('gesture', gestureName);
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({
      gestureName: gestureName,
    });
    switch (gestureName) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
      case SWIPE_LEFT:
        break;
      case SWIPE_RIGHT:
        break;
    }
  };

  componentDidMount() {
    let Shortlisted = [],
      Selected = [],
      InterView = [],
      Rejected = [];
    try {
      http
        .POST('api/get/cominterview', {
          companyId: global.Id,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              //            //will get data in this    res['data']['result']
              console.log('data', res['data']['result']);
              for (let i in res['data']['result']) {
                if (res['data']['result'][i]['status'] == 'Selected') {
                  Selected.push(res['data']['result'][i]);
                  InterView.push(res['data']['result'][i]);
                } else if (res['data']['result'][i]['status'] == 'Rejected') {
                  Rejected.push(res['data']['result'][i]);
                } else {
                  InterView.push(res['data']['result'][i]);
                }
              }

              this.setState({
                data: InterView,
                InterView,
                Selected,
              });
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
    try {
      http
        .GET('api/applyjob/get', {
          comId: global.Id,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              for (let i in res['data']['result']) {
                this.setState({
                  data: res['data']['result'],
                });
                if (res['data']['result'][i]['status'] == 'Shortlisted') {
                  Shortlisted.push(res['data']['result'][i]);
                }
              }
              this.setState({
                Shortlisted,
                data: Shortlisted,
                short: !this.state.short,
              });
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
  }
  Filter = () => {
    this.props.navigation.navigate('FilterUser');
  };
  InterView = () => {
    console.log('hi');
    this.setState({
      short: false,
      int: true,
      sel: false,
    });
    let InterView = [],
      Rejected = [];

    try {
      http
        .POST('api/get/cominterview', {
          companyId: global.Id,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              //            //will get data in this    res['data']['result']
              // console.log("data", res['data']['result'])
              for (let i in res['data']['result']) {
                if (res['data']['result'][i]['status'] == 'Selected') {
                  InterView.push(res['data']['result'][i]);
                } else if (res['data']['result'][i]['status'] == 'Rejected') {
                  Rejected.push(res['data']['result'][i]);
                } else {
                  InterView.push(res['data']['result'][i]);
                }
              }
              this.setState({
                data: InterView,
                InterView,
              });
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
  };
  // Matched = () => {
  //     console.log('matched', this.state.Matched);
  //     this.setState({
  //         data: this.state.Matched
  //     })
  // }
  Shortlisted = () => {
    console.log('Shortlisted', this.state.Shortlisted);

    this.setState({
      short: true,
      int: false,
      sel: false,
      data: this.state.Shortlisted,
    });
  };
  // Interested = () => {
  //     console.log('Interested', this.state.Interested);

  //     this.setState({
  //         data: this.state.Interested
  //     })
  // }
  // NotInterested = () => {
  //     console.log('NotInterested', this.state.NotInterested);

  //     this.setState({
  //         data: this.state.NotInterested
  //     })
  // }
  push = (item, index) => {
    console.log('item', item, this.state.data);
    global.ig = this.state.data;
    this.props.navigation.navigate('UserPro', {
      item: item,
      index: index,
      status: item.status,
    });
  };
  Video = (item) => {
    console.log('hels');
    let m = url + 'images/user/' + item.video;
    if (item)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('not uploaded');
    // this.props.navigation.navigate('VideoResume');
  };
  Selected = () => {
    console.log('Selected', this.state.Selected);
    this.setState({
      short: false,
      int: false,
      sel: true,
      data: this.state.Selected,
    });
  };
  // push = (item) => {
  //     //     global.item = item;
  //     //     this.setState({
  //     //         dark: !this.state.dark
  //     //     })
  //     // // this.props.navigation.navigate('UserProfile')
  // }
  // /onChange = (event, selectedDate) => {
  //     console.log('select date', new Date(selectedDate).toLocaleDateString());
  //     if (selectedDate === undefined) {
  //         this.setState({
  //             show: !this.state.show
  //         })
  //         return;
  //     } else {

  //         this.setState({
  //             show: !this.state.show,
  //             interviewDate: new Date(selectedDate).toLocaleDateString()
  //         });
  //     // global.Start_date = new Date(selectedDate).toLocaleDateString()
  //     }
  // }
  // onChange1 = (event, selectedDate) => {
  //     let minute,
  //         hour;
  //     minute = new Date(selectedDate).getMinutes();
  //     hour = new Date(selectedDate).getHours();
  //     minute = minute > 10 ? minute : '0' + minute;
  //     hour = hour <= 12 ? hour + ':' + minute + ' ' + 'am' : hour - 12 + ':' + minute + ' ' + 'pm';

  //     console.log('event', event, new Date(selectedDate).getHours(), new Date(selectedDate).getMinutes())
  //     if (selectedDate === undefined) {
  //         this.setState({
  //             show1: !this.state.show1
  //         })
  //         return;
  //     } else {
  //         this.setState({
  //             show1: !this.state.show1,
  //             interviewTime: hour
  //         });
  //     }

  // };
  Back = () => {
    this.props.navigation.navigate('ChooseTalent');
  };
  // Shadule = () => {
  //     const {jobId, comId, userId, interviewDate, interviewTime} = this.state;

  //     try {
  //         http.POST('api/schedule/interview', {
  //             companyId: comId,
  //             userId: userId,
  //             jobId: jobId,
  //             intDate: interviewDate,
  //             intTime: interviewTime
  //         }).then((res) => {
  //             if (res['data']['status']) {
  //                 console.log('res...interview. 255.', res['data']['result'])
  //             } else {
  //                 snack(res['data']['message'])
  //             }
  //         }, err => snack(err['message']))
  //     } catch ( error ) {
  //         snack("error while register" + error)
  //     }
  //     this.setState({
  //         dark: !this.state.dark
  //     })
  // }
  render() {
    const {show, show1, dark, data} = this.state;

    return (
      <View>
        <StatusBar hidden={true} />
        <View
          style={{
            flexDirection: 'row',
            width: wp('100%') - scale(35),
            marginHorizontal: scale(5),
            backgroundColor: 'transparent',
            height: wp(100) / 3 - scale(5),
            marginTop: hp(0.6),
            marginBottom: hp(-0.3),
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback onPress={() => this.Shortlisted()}>
            <View
              style={[
                {borderWidth: this.state.short ? scale(2) : 0},
                styles.postedJoblist,
              ]}>
              <ImageBackground
                source={canvas}
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                resizeMode={'stretch'}>
                <Text
                  style={{
                    fontSize: scale(20),
                    fontFamily: 'Roboto-Regular',
                    color: themeWhite,
                  }}>
                  {this.state.Shortlisted.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: scale(16),
                      fontFamily: 'Roboto-Regular',
                      color: themeWhite,
                    }}>
                    Shortlisted
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.InterView()}>
            <View
              style={[
                {
                  borderWidth: this.state.int ? scale(2) : 0,
                  marginHorizontal: scale(5),
                },
                styles.postedJoblist,
              ]}>
              <ImageBackground
                source={canvas}
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                resizeMode={'stretch'}>
                <Text
                  style={{
                    fontSize: scale(20),
                    fontFamily: 'Roboto-Regular',
                    color: themeWhite,
                  }}>
                  {this.state.InterView.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: scale(16),
                      fontFamily: 'Roboto-Regular',
                      color: themeWhite,
                    }}>
                    InterView
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.Selected()}>
            <View
              style={[
                {borderWidth: this.state.sel ? scale(2) : 0},
                styles.postedJoblist,
              ]}>
              <ImageBackground
                source={canvas}
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                resizeMode={'stretch'}>
                <Text
                  style={{
                    fontSize: scale(20),
                    fontFamily: 'Roboto-Regular',
                    color: themeWhite,
                  }}>
                  {this.state.Selected.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: scale(16),
                      fontFamily: 'Roboto-Regular',
                      color: themeWhite,
                    }}>
                    Selected
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {data != '' ? (
          <FlatList
            style={{
              marginTop: 4,
              marginBottom: 50,
              marginLeft: wp(-1),
              backgroundColor: 'transparent',
            }}
            data={data}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            renderItem={({item, index}) => (
              <ItemMVJobbM
                item={item}
                index={index}
                push={this.push}
                Video={this.Video}
              />
            )}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => ({
              length: hp('28%'),
              offset: hp('28%') * index,
              index,
            })}
            keyExtractor={(item, index) => index + ''}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: hp(50),
              width: wp(100),
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
      </View>
    );
  }
}
export default withNavigationFocus(JobListCompany);
