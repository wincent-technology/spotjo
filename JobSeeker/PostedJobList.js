import React, {PureComponent} from 'react';
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
import {withNavigationFocus, NavigationEvents} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import {
  themeColor,
  themeWhite,
  Background,
  sort,
  filter,
  TRANLINE,
  canvas,
  url,
  FontBold,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {scale, snack} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {Rating, NavigationHeader} from '../Component/ViewManager.js';
import ItemMV from '../src/ItemMV';
import DeviceInfo from 'react-native-device-info';
import http from '../api';

// import styles from './Style'

class PostedJobList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataitem: [],
      Active: [],
      Expired: [],
      Published: [],
      act: false,
      exp: false,
      pub: true,
    };
    this._isMounted = false;
  }

  Filter = () => {
    this.props.navigation.navigate('Filter');
  };

  push = (item, index) => {
    if (item.jsstatus == 'Save') {
      global.all = this.state.Expired;

      this.props.navigation.navigate('JobCompanyProfile', {
        item: item,
        index: index,
      });
    } else {
      global.all = this.state.Active;
      this.props.navigation.navigate('JobCompanyProfile', {
        item: item,
        index: index,
      });
    }
  };
  Back = () => {
    // this.props.navigation.navigate('ChooseTalent')
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  // componentDidUpdate() {

  //     try {
  //         this._isMounted && http.POST('api/applogcom/job', {
  //             companyId: global.Id,
  //         }).then((res) => {
  //             if (res['data']['status']) {
  //                 console.log('rrrrrrrrr', res['data']['result']);
  //                 this._isMounted = false
  //                 this.setState({
  //                     dataitem: res['data']['result']
  //                 })
  //                 // this.props.navigation.navigate('AdminDashboard');
  //                 // this.postedJob(res['data']['result']);

  //             } else {
  //                 snack(res['data']['message'])

  //             }
  //         }, err => alert(JSON.stringify(err)));
  //     } catch ( error ) {
  //         snack(error)
  //     }
  // }

  componentDidMount() {
    this._isMounted = true;
    this.checking();
  }
  Active = () => {
    console.log('active', this.state.Active);
    this.setState({
      pub: false,
      act: true,
      exp: false,
      dataitem: this.state.Active,
    });
  };
  Expired = () => {
    console.log('expired');
    this.setState({
      pub: false,
      act: false,
      exp: true,
      dataitem: this.state.Expired,
    });
  };
  Published = () => {
    console.log('Published');
    this.setState({
      pub: true,
      act: false,
      exp: false,
      dataitem: this.state.Published,
    });
  };
  checking = () => {
    let Interested = [],
      Not = [];

    console.log('isfsdf');
    this._isMounted = true;
    try {
      this._isMounted &&
        http
          .POST('api/appjobseeker/get', {
            userId: global.Id,
          })
          .then(
            (res) => {
              if (res['data']['status']) {
                res['data']['result'].reverse();
                this.setState({
                  dataitem: res['data']['result'],
                  Published: res['data']['result'],
                  pub: !this.state.pub,
                  act: false,
                  exp: false,
                });
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => alert(JSON.stringify(err)),
          );
    } catch (error) {
      snack(error);
    }
    try {
      this._isMounted &&
        http
          .POST('api/jobseekerint/get', {
            userId: global.Id,
          })
          .then(
            (res) => {
              console.log('res', res['data']['result']);
              if (res['data']['status']) {
                res['data']['result'].reverse();
                // console.log('146', res['data']['result']);
                for (let i in res['data']['result']) {
                  if (res['data']['result'][i]['jsstatus'] == 'Save') {
                    Interested.push(res['data']['result'][i]);
                  } else {
                    Not.push(res['data']['result'][i]);
                  }
                }
                this.setState({
                  Active: Not,
                  Expired: Interested,
                });
                // this.props.navigation.navigate('AdminDashboard');
                // this.postedJob(res['data']['result']);
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => alert(JSON.stringify(err)),
          );
    } catch (error) {
      snack(error);
    }
  };

  Video = (item) => {
    console.log('hels', item.video);
    let m = url + '/images/company/' + item.video;
    if (item)
      this.props.navigation.navigate('VideoPlayer', {
        vid: m,
      });
    else alert('not uploaded');
    // this.props.navigation.navigate('VideoResume');
  };

  render() {
    return (
      <View>
        <StatusBar hidden={true} />
        <NavigationEvents onDidFocus={this.checking} />
        <View
          style={{
            borderTopColor: 'gray',
            borderTopWidth: scale(2),
            borderBottomWidth: scale(2),
            borderBottomColor: 'gray',
            width: wp('100%'),
            backgroundColor: themeWhite,
            height: scale(40),
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 8,
          }}>
          <Text style={styles.JoblistSecondViewHeadingText}>Jobs Info</Text>
        </View>
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
            // marginTop: hp(1),
            // alignItems: 'center',
          }}>
          <TouchableWithoutFeedback onPress={() => this.Published()}>
            <View
              style={[
                {borderWidth: this.state.pub ? scale(2) : 0},
                styles.postedJoblist,
              ]}>
              <ImageBackground
                source={canvas}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: scale(100),
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
                  {this.state.Published.length}
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
          <TouchableWithoutFeedback onPress={() => this.Expired()}>
            <View
              style={[
                {
                  borderWidth: this.state.exp ? scale(2) : 0,
                  marginHorizontal: scale(5),
                },
                styles.postedJoblist,
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
                  {this.state.Expired.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: scale(16),
                      fontFamily: 'Roboto-Regular',
                      color: themeWhite,
                    }}>
                    Saved
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.Active()}>
            <View
              style={[
                {borderWidth: this.state.act ? scale(2) : 0},
                styles.postedJoblist,
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
                  {this.state.Active.length}
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
        </View>
        {this.state.dataitem != '' ? (
          <FlatList
            style={{
              marginTop: 4,
              marginBottom: 50 + scale(35),
              backgroundColor: 'transparent',
            }}
            data={this.state.dataitem}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            renderItem={({item, index}) => (
              <ItemMV
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

export default withNavigationFocus(PostedJobList);
