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
  ActivityIndicator
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
  snack,NoData
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  Rating,
  NavigationHeader
} from '../Component/ViewManager.js';
import ItemMV from './ItemMV';
import List from '../Component/List'
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
      load:false
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
                load : true
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
                // load : true
                
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
                // load : true
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
  editJob = (item) => {
    console.log('item',item)
  }

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

  Match= () => {
    this.props.navigation.navigate('JobMatches')
  }

  render() {
    if (!this.state.load)
    return <View style={{flex:1,justifyContent:"center"}}><NavigationEvents onDidFocus={this.checking} /><ActivityIndicator size={'large'} color={themeColor} /></View>;
    else
    return (
      <View>
          <StatusBar hidden={true} backgroundColor={themeWhite} />
        <NavigationEvents onDidFocus={this.checking} />
        <View
          style={{
            flexDirection: 'row',
            width: wp(100),
            justifyContent:'space-evenly',
            // marginHorizontal: scale(5),
            backgroundColor: 'transparent',
            height: wp(25),
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
                    fontSize: hp(2.7),
                    fontFamily: 'Roboto-Regular',
                    color: themeWhite,
                  }}>
                  {this.state.Published.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: 'Roboto-Regular',
                      color: themeWhite,
                    }}>
                    Active
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
                    fontSize: hp(2.7),
                    fontFamily: 'Roboto-Regular',
                    color: themeWhite,
                  }}>
                  {this.state.Expired.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: 'Roboto-Regular',
                      color: themeWhite,
                    }}>
                    In-Active
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
                    fontSize: hp(2.7),
                    fontFamily: 'Roboto-Regular',
                    color: themeWhite,
                  }}>
                  {this.state.Active.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: hp(2.5),
                      fontFamily: 'Roboto-Regular',
                      color: themeWhite,
                    }}>
                    Locked
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {this.state.dataitem.length ? (
          <List style={{marginTop: 4,
              marginBottom : (wp(25)) + 50,
              backgroundColor: 'transparent',}} data={this.state.dataitem} renderItem={({item, index}) => (
                <ItemMV
                item={item}
                index={index}
                push={this.push}
                Video={this.Video}
                Match={this.Match}
                EditingJob={this.editJob}
              />
              )} />
        ) : (
          <NoData style={{justifyContent: 'center',
              alignItems: 'center',
              height: hp(50),
              width: wp(100)}} />
        )}
      </View>
    );
  }
}

export default withNavigationFocus(PostedJobList);