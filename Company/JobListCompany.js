import React, {
  PureComponent
} from 'react';
import {
  StatusBar,
  TouchableWithoutFeedback,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
  themeColor,
  themeWhite,
  TRANLINE,
  canvas,
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
import ItemMVJobbM from './ItemMVJobbM';
import http from '../api';
import List from '../Component/List';
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
              for (let i=0;i<res['data']['result'].length;i++) {
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
      console.log('global.id',global.Id);
      http
        .POST('api/applyjob/get', {
          comId: global.Id,
        })
        .then(
          (res) => {
            if (res['data']['status']) {
              console.log('responce of applyjob',res['data']['result']);
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
      Rejected = [],
      Selected = []

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
                  Selected.push(res['data']['result'][i]);
                } else if (res['data']['result'][i]['status'] == 'Rejected') {
                  Rejected.push(res['data']['result'][i]);
                } else {
                  InterView.push(res['data']['result'][i]);
                }
              }
              this.setState({
                data: InterView,
                InterView,
                Selected
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
  
  Shortlisted = () => {
    console.log('Shortlisted', this.state.Shortlisted);

    this.setState({
      short: true,
      int: false,
      sel: false,
      data: this.state.Shortlisted,
    });
  };
  
  push = (item, index) => {
    console.log('item', item, this.state.data);
    global.ig = this.state.data;
    this.props.navigation.navigate('UserPros', {
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
  
  Back = () => {
    this.props.navigation.navigate('ChooseTalent');
  };
  
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
          <List style={{marginTop: 4,
              marginBottom: 40 + StatusBar.currentHeight,
              marginLeft: wp(-1),
              backgroundColor: 'transparent',}} data={data} renderItem={({item, index}) => (
              <ItemMVJobbM
                item={item}
                index={index}
                push={this.push}
                Video={this.Video}
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
export default withNavigationFocus(JobListCompany);