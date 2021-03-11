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
  TRANLINE,
  canvas,
  url,
  FontBold,
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
import ItemMV from './ItemMV';
import DeviceInfo from 'react-native-device-info';
import http from '../api';

// import styles from './Style'

class PostedJobList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataitem: [],
      Active: [],
      act: false,
      exp: false,
      pub: false,
      Expired: [],
      Published: [],
    };
    this._isMounted = false;
  }

  Filter = () => {
    this.props.navigation.navigate('Filter');
  };

  push = (item, index) => {
    console.log('ji', item);
    global.ig = this.state.dataitem;
    // console.log('hi', global.ig);

    this.props.navigation.navigate('PostedJobUser', {
      item: item,
      index: index,
      status: 'defined',
    });
    // global.item = item;
    // this.props.navigation.navigate('CompanyProfile')
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
    this.checking();
  }
  Active = () => {
    console.log('active');
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
    // let i = this.state.Published
    let p = this.state.Published.sort((a, b) => {
      return new Date(a.createdAt) < new Date(b.createdAt)
    })
    console.log('Published,>>>>>>>>>>>>>>>>>>>>>>>', p);
    this.setState({
      pub: true,
      act: false,
      exp: false,
      dataitem: p,
    });
  };
  checking = () => {
    this._isMounted = true;
    console.log('global.ig', global.ig);
    try {
      this._isMounted &&
        http
        .POST('api/applogcom/job', {
          companyId: global.Id,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              this.setState({
                dataitem: res['data']['result'],
                Published: res['data']['result'],
                pub: true,
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
    try {
      this._isMounted &&
        http
        .POST('api/get/activeJob', {
          companyId: global.Id,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              // console.log('126', res['data']['result']);
              this.setState({
                Active: res['data']['result'],
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
    try {
      this._isMounted &&
        http
        .POST('api/get/expireJob', {
          companyId: global.Id,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              // console.log('146', res['data']['result']);
              this.setState({
                Expired: res['data']['result'],
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
          <StatusBar hidden={false} backgroundColor={themeWhite} />
        <NavigationEvents onDidFocus={this.checking} />
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
                  {this.state.Published.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: scale(16),
                      fontFamily: 'Roboto-Regular',
                      color: themeWhite,
                    }}>
                    Published
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
                    Expired
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
                    }}>
                    Active
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
              marginBottom: 40,
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

export default withNavigationFocus(PostedJobList);