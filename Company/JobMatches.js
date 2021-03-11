import React, {
  PureComponent
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
  View,
} from 'react-native';
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
import {
  scale,
  snack
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  Rating,
  NavigationHeader
} from '../Component/ViewManager.js';
import ItemMVJobbM from './ItemMVJobbM';
import CompanyProfile from '../src/CompanyProfile';
import DeviceInfo from 'react-native-device-info';
import DateTimePicker from '@react-native-community/datetimepicker';
import GestureRecognizer, {
  swipeDirections
} from 'react-native-swipe-gestures';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input';

// import styles from './Style'
var c = 0;

class JobMatches extends React.Component {
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

              console.log("res['data']['result']>>>>>>>>>>>>>>>", res['data']['result']);

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
    let data = []
    let From,
      To,
      tmpobj,
      jobs = this.state.data;

    for (let i in jobs) {

      if (jobs[i]['workexp']) {
        for (let j in jobs[i]['workexp']) {
          tmpobj = JSON.parse(JSON.stringify(jobs[i]));

          From = jobs[i]['workexp'][j]['From'].split(' ');
          To = jobs[i]['workexp'][j]['To'].split(' ');

          tmpobj.Company = jobs[i]['workexp'][j]['Company'];
          tmpobj.heading = jobs[i]['workexp'][j]['heading'];
          tmpobj.totalExp = To[1] - From[1];

          data.push(tmpobj);
        }
      } else {
        tmpobj = JSON.parse(JSON.stringify(jobs[i]));

        // From = jobs[i]['workexp'][j]['From'].split(' ');
        // To = jobs[i]['workexp'][j]['To'].split(' ');

        tmpobj.Company = 'UnKnown';
        tmpobj.heading = 'Unknown';
        tmpobj.totalExp = 1 - 0;

        data.push(tmpobj);
      }
    }
    //   tmpobj = JSON.parse(JSON.stringify(jobs[i]));
    //   data.push(tmpobj)
    // }
    console.log("data >>>", data);
    global.ig = data;
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
    const {
      show,
      show1,
      dark,
      data
    } = this.state;

    return (
      <View>
        <StatusBar hidden={false} backgroundColor={themeColor} />
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
              marginBottom: 40,
              marginLeft: wp(-1),
              backgroundColor: 'transparent',
            }}
            data={data}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            renderItem={({ item, index }) => (
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
                color: themeColor,
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