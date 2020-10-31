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
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import {
  themeColor,
  themeWhite,
  Background,
  sort,
  filter,
  TRANLINE,
  overlayimage,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {scale} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {Rating, NavigationHead} from '../Component/ViewManager.js';
import ItemMV from '../src/ItemMV';
import DeviceInfo from 'react-native-device-info';
import JobListCompany from './JobListCompany';
import JobMatches from './JobMatches';
import PostedJobList from './PostedJobList';

class AdminDashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flagPosted: true,
      flagInterView: false,
      flagMatches: false,
    };
  }

  Filter = () => {
    this.props.navigation.navigate('Filter');
  };

  // push = (item) => {
  //     console.log("heelo", item);
  // // global.item = item;
  // // this.props.navigation.navigate('CompanyProfile')
  // }
  Back = () => {
    this.props.navigation.navigate('ComEdit');
  };
  createJob = () => {
    console.log('hey');

    this.props.navigation.navigate('CreateJob');
  };

  PostedJob = () => {
    this.setState({
      flagPosted: true,
      flagInterView: false,
      flagMatches: false,
    });
  };
  Interviews = () => {
    this.setState({
      flagInterView: true,
      flagPosted: false,
      flagMatches: false,
    });
  };
  Matches = () => {
    this.setState({
      flagMatches: true,
      flagInterView: false,
      flagPosted: false,
    });
  };
  renderPage = () => {
    const {flagPosted, flagInterView, flagMatches} = this.state;
    if (flagPosted) return <PostedJobList />;
    else if (flagInterView) return <JobListCompany />;
    else if (flagMatches) return <JobMatches />;
  };
  render() {
    return (
      <View style={styles.backGround}>
        <StatusBar hidden={true} />
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <NavigationHead
            centerComponent="Admin Dashboard"
            rightComponent="Exit"
            onPress={() => this.Back()}
            onExit={() => this.Exit()}
          />
          <View
            style={{
              borderTopColor: 'gray',
              marginTop: scale(2),
              borderTopWidth: scale(2),
              borderBottomWidth: scale(2),
              borderBottomColor: 'gray',
              flexDirection: 'row',
              width: wp('100%'),
              backgroundColor: themeWhite,
              height: scale(40),
              alignItems: 'center',
              elevation: 8,
            }}>
            <TouchableWithoutFeedback onPress={this.PostedJob}>
              <View
                style={{
                  alignItems: 'center',
                  width: wp(97) / 3,
                  height: scale(40),
                  marginLeft: wp(3),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={overlayimage}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    opacity: this.state.flagPosted ? 1 : 0,
                  }}
                  resizeMode={'contain'}
                />
                <Text
                  style={{
                    fontSize: scale(16),
                    fontFamily: 'Roboto-Regular',
                    width: wp(97) / 3,
                    textAlign: 'center',
                    // width: wp(97) / 3,
                  }}
                  numberOfLines={1}>
                  Posted Jobs
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.Interviews}>
              <View
                style={{
                  alignItems: 'center',
                  width: wp(95) / 3,
                  height: scale(40),
                  justifyContent: 'center',
                  marginHorizontal: wp(1),
                }}>
                <ImageBackground
                  source={overlayimage}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    opacity: this.state.flagInterView ? 1 : 0,
                  }}
                  resizeMode={'contain'}
                />
                <Text
                  style={{
                    fontSize: scale(18),
                    fontFamily: 'Roboto-Regular',
                  }}>
                  Interviews
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.Matches}>
              <View
                style={{
                  alignItems: 'center',
                  width: wp(85) / 3,
                  height: scale(40),
                  justifyContent: 'center',
                }}>
                <ImageBackground
                  source={overlayimage}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    opacity: this.state.flagMatches ? 1 : 0,
                  }}
                  resizeMode={'contain'}
                />
                <Text
                  style={{
                    fontSize: scale(18),
                    fontFamily: 'Roboto-Regular',
                  }}>
                  Matches
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              height: hp(100.6) - (wp(100) / 3 + scale(80)),
            }}>
            {this.renderPage()}
          </View>
          {this.state.flagPosted && (
            <View
              style={{
                bottom: scale(30),
                position: 'absolute',
              }}>
              <TouchableWithoutFeedback onPress={this.createJob}>
                <View
                  style={{
                    marginHorizontal: wp(2),
                    borderRadius: wp(15),
                  }}>
                  <ImageBackground
                    source={require('../Img/create-job.png')}
                    style={{
                      height: scale(60),
                      width: wp(96),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    resizeMode={'stretch'}>
                    <Text
                      style={{
                        color: themeWhite,
                        fontSize: scale(20),
                        fontFamily: 'Roboto-Bold',
                      }}>
                      Create Job
                    </Text>
                  </ImageBackground>
                </View>
              </TouchableWithoutFeedback>
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
      </View>
    );
  }
}

export default withNavigationFocus(AdminDashboard);
