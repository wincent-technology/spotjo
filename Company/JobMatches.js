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
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
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
  interViewBack,
  FontBold,
  url,
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
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input';

// import styles from './Style'
var c = 0;

class JobMatches extends PureComponent {
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
      Matched: [],
      mat: false,
      Shortlisted: [],
      short: false,
      Interested: [],
      int: false,
      NotInterested: [],
      not: false,
      Applied: [],
      app: false,
      Rejected: [],
      rej: false,
      jobId: '',
      comId: '',
      userId: '',
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
  //     } catch (error) {
  //         snack("error while register" + error)
  //     }
  // }
  // onSwipeUp = (gestureState, item, status) => {
  //     if (status == null) {
  //         alert('Matched');
  //         this.jaaveda('Matched', item);
  //     } else if (status == 'Matched') {
  //         alert('shortlisted')
  //         this.jaaveda('Shortlisted', item);
  //     } else if (status == 'Shortlisted') {
  //         this.jaaveda('Matched', item);
  //     }
  // }

  // onSwipeDown = (gestureState, item, status) => {
  //     if (status == 'Matched')
  //         alert('selected')
  //     this.jaaveda('Selected', item);
  //     // alert(' Short Listed ' + item)

  // }

  // onSwipeLeft = (gestureState, item, status) => {
  //     // alert(' Not Interested ' + item)
  //     if (status == null) {
  //         alert('NotInterested')
  //         this.jaaveda('Not Interested', item);
  //     } else if (status == 'Matched') {
  //         alert('rejected')
  //         this.jaaveda('Rejected', item);
  //     }
  // }

  // onSwipeRight = (gestureState, item, status) => {
  //     // alert(' Interested ' + item)
  //     if (status == null) {
  //         alert('Interested')
  //         this.jaaveda('Interested', item);
  //     } else if (status == 'Matched') {
  //         alert('interview')
  //         for (let i in this.state.Matched) {
  //             if (item == this.state.Matched[i].appid)
  //                 console.log('dfsdf', this.state.Matched)
  //             this.setState({
  //                 jobId: this.state.Matched[i].jobId,
  //                 comId: this.state.Matched[i].comId,
  //                 userId: this.state.Matched[i].id,
  //                 dark: !this.state.dark
  //             });
  //         }

  //     }

  // }
  // onSwipe = (gestureName, gestureState) => {
  //     console.log('gesture', gestureName);
  //     const {
  //         SWIPE_UP,
  //         SWIPE_DOWN,
  //         SWIPE_LEFT,
  //         SWIPE_RIGHT
  //     } = swipeDirections;
  //     this.setState({
  //         gestureName: gestureName
  //     });
  //     switch (gestureName) {
  //         case SWIPE_UP:
  //             break;
  //         case SWIPE_DOWN:
  //             break;
  //         case SWIPE_LEFT:
  //             break;
  //         case SWIPE_RIGHT:
  //             break;
  //     }
  // }

  checking = () => {
    console.log('hi');
    let Matched = [],
      Shortlisted = [],
      Interested = [],
      NotInterested = [],
      Rejected = [],
      Applied = [];

    try {
      http
        .POST('api/applyjob/get', {
          comId: global.Id,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              console.log("res['data']['result']", res['data']['result']);

              // this.setState({
              //     Applied: res['data']['result']
              // })
              for (let i in res['data']['result']) {
                if (res['data']['result'][i]['status'] == 'Matched') {
                  // Matched.push(res['data']['result'][i])
                } else if (
                  res['data']['result'][i]['status'] == 'Shortlisted'
                ) {
                  Shortlisted.push(res['data']['result'][i]);
                } else if (res['data']['result'][i]['status'] == 'Interested') {
                  // Interested.push(res['data']['result'][i])
                } else if (
                  res['data']['result'][i]['status'] == 'Not Interested'
                ) {
                  // NotInterested.push(res['data']['result'][i])
                } else if (res['data']['result'][i]['status'] == 'Rejected') {
                  Rejected.push(res['data']['result'][i]);
                } else {
                  Matched.push(res['data']['result'][i]);
                }
              }
              this.setState({
                Matched,
                Shortlisted,
                data: Shortlisted,
                Interested,
                NotInterested,
                Rejected,
                Applied,
                short: true,
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
  componentDidMount() {
    this.checking();
  }
  Filter = () => {
    this.props.navigation.navigate('Filter');
  };
  Applied = () => {
    this.setState({
      mat: false,
      short: false,
      int: false,
      not: false,
      app: true,
      rej: false,
      data: [],
      // data: this.state.Applied,
    });
    console.log('>>>>>', this.state.Applied);
  };
  Matched = () => {
    console.log('matched', this.state.Matched);
    this.setState({
      mat: true,
      short: false,
      int: false,
      not: false,
      app: false,
      rej: false,
      data: this.state.Matched,
    });
  };
  Shortlisted = () => {
    console.log('Shortlisted', this.state.Shortlisted);

    this.setState({
      mat: false,
      short: true,
      int: false,
      not: false,
      app: false,
      rej: false,
      data: this.state.Shortlisted,
    });
  };
  Interested = () => {
    console.log('Interested', this.state.Interested);

    this.setState({
      mat: false,
      short: false,
      int: true,
      not: false,
      app: false,
      rej: false,
      data: [],
      // data: this.state.Interested
    });
  };
  NotInterested = () => {
    console.log('NotInterested', this.state.NotInterested);

    this.setState({
      mat: false,
      short: false,
      int: false,
      not: true,
      app: false,
      rej: false,
      data: [],
      // data: this.state.NotInterested
    });
  };
  Rejected = () => {
    console.log('Rejected', this.state.Rejected);
    this.setState({
      mat: false,
      short: false,
      int: false,
      not: false,
      app: false,
      rej: true,
      data: this.state.Rejected,
    });
  };

  push = (item, index) => {
    console.log('item', item);
    global.ig = this.state.data;
    this.props.navigation.navigate('UserPro', {
      item: item,
      index: index,
      status: item.status == 'NULL' ? null : item.status,
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
  // onChange = (event, selectedDate) => {
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
  //         // global.Start_date = new Date(selectedDate).toLocaleDateString()
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
  // Back = () => {
  //     this.props.navigation.navigate('ChooseTalent')
  // }
  // Shadule = () => {
  //     const {
  //         jobId,
  //         comId,
  //         userId,
  //         interviewDate,
  //         interviewTime
  //     } = this.state;

  //     try {
  //         http.POST('api/schedule/interview', {
  //             companyId: global.Id,
  //             userId: userId,
  //             jobId: jobId,
  //             intDate: interviewDate,
  //             intTime: interviewTime
  //         }).then((res) => {
  //             if (res['data']['status']) {
  //                 snack(res['message'])
  //                 console.log('res...interview. 255.', res['data']['result'])
  //             } else {
  //                 snack(res['data']['message'])
  //             }
  //         }, err => snack(err['message']))
  //     } catch (error) {
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
            width: wp('100%'),
            // marginHorizontal:scale(5),
            backgroundColor: 'transparent',
            height: wp(100) / 3 - scale(5),
            marginTop: hp(0.6),
            marginBottom: hp(-0.3),
            alignItems: 'center',
          }}>
          <ScrollView horizontal>
            <NavigationEvents onDidFocus={this.checking} />
            <TouchableWithoutFeedback onPress={() => this.Shortlisted()}>
              <View
                style={[
                  {
                    borderWidth: this.state.short ? scale(2) : 0,
                  },
                  styles.MatchersStyleTab,
                ]}>
                <ImageBackground
                  source={canvas}
                  style={{
                    height: '100%',
                    width: '100%',
                    // position: "absolute",
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
            <TouchableWithoutFeedback onPress={() => this.Matched()}>
              <View
                style={[
                  {
                    borderWidth: this.state.mat ? scale(2) : 0,
                  },
                  styles.MatchersStyleTab,
                ]}>
                <ImageBackground
                  source={canvas}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
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
                    {this.state.Matched.length}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: scale(16),
                        fontFamily: 'Roboto-Regular',
                        color: themeWhite,
                      }}>
                      Matched
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.Rejected()}>
              <View
                style={[
                  {
                    borderWidth: this.state.rej ? scale(2) : 0,
                  },
                  styles.MatchersStyleTab,
                ]}>
                <ImageBackground
                  source={canvas}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
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
                    {this.state.Rejected.length}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: scale(16),
                        fontFamily: 'Roboto-Regular',
                        color: themeWhite,
                      }}>
                      Rejected
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.Applied()}>
              <View
                style={[
                  {
                    borderWidth: this.state.app ? scale(2) : 0,
                  },
                  styles.MatchersStyleTab,
                ]}>
                <ImageBackground
                  source={canvas}
                  style={{
                    height: '100%',
                    width: '100%',
                    // position: "absolute",
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
                    {this.state.Applied.length}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: scale(16),
                        fontFamily: 'Roboto-Regular',
                        color: themeWhite,
                      }}>
                      Applied
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.Interested()}>
              <View
                style={[
                  {
                    borderWidth: this.state.int ? scale(2) : 0,
                  },
                  styles.MatchersStyleTab,
                ]}>
                <ImageBackground
                  source={canvas}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
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
                    {this.state.Interested.length}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: scale(16),
                        fontFamily: 'Roboto-Regular',
                        color: themeWhite,
                      }}>
                      Interested
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.NotInterested()}>
              <View
                style={[
                  {
                    borderWidth: this.state.not ? scale(2) : 0,
                  },
                  styles.MatchersStyleTab,
                ]}>
                <ImageBackground
                  source={canvas}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
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
                    {this.state.NotInterested.length}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: scale(16),
                        fontFamily: 'Roboto-Regular',
                        color: themeWhite,
                      }}
                      numberOfLines={1}>
                      Not Interested
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
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
                // getAudioTimeString={this.getAudioTimeString}
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

// class CompanyProfile extends Component {
//     render() {
//         return <View><Text>{this.props.item.header}</Text></View>;
//     }
// }

export default withNavigationFocus(JobMatches);
