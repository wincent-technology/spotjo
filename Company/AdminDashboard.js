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
  withNavigationFocus
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
  overlayimage,Fulls,createJ
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  scale
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  Rating,
  NavigationHead
} from '../Component/ViewManager.js';
// import ItemMV from '../src/ItemMV';
import DeviceInfo from 'react-native-device-info';
import JobListCompany from './JobListCompany';
import JobMatches from './JobMatches';
import PostedJobList from './PostedJobList';
import Texting from '../Constant/Text'
import Favorites from './Favorites'
class AdminDashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flagPosted: true,
      flagFavorites: false,
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
    // this.props.navigation.navigate('Admin');
    this.props.navigation.pop();

  };
  createJob = () => {
    this.props.navigation.navigate('CreateJob');
  };

  PostedJob = () => {
    this.setState({
      flagPosted: true,
      flagFavorites: false,
      flagMatches: false,
    });
  };
  // Interviews = () => {
  //   this.setState({
  //     flagFavorites: true,
  //     flagPosted: false,
  //     flagMatches: false,
  //   });
  // };
  Matches = () => {
    this.setState({
      flagMatches: false,
      flagFavorites: true,
      flagPosted: false,
    });
  };
  renderPage = () => {
    const {
      flagPosted,
      // flagFavorites,
      // flagMatches
    } = this.state;
    if (flagPosted) return <PostedJobList />;
    else return <Favorites />;
    // else if (flagMatches) return <JobMatches />;
  };
  render() {
    return (
      <View style={styles.backGround}>
          <StatusBar hidden={false} backgroundColor={themeWhite} barStyle='dark-content' />
        <ImageBackground
          style={styles.ImageBlue}
          tintColor={themeWhite}
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
              height: hp(6),
              alignItems: 'center',
              elevation: 8,
              justifyContent:'space-between'
            }}>
            <TouchableWithoutFeedback onPress={this.PostedJob}>
              <View
                style={{
                  alignItems: 'center',
                  width: wp(97) / 3,
                  height: hp(5),
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
                <Texting
                  style={{
                    fontSize: hp(2.5),
                    fontFamily: 'Roboto-Regular',
                    width: wp(97) / 3,
                    textAlign: 'center',
                    // width: wp(97) / 3,
                  }}
                  numberOfLines={1} text='Posted_Jobs' />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.Matches}>
              <View
                style={{
                  alignItems: 'center',
                  width: wp(85) / 3,
                  height: hp(5),
                  marginRight: wp(3),
                  justifyContent: 'center',
                }}>
                <ImageBackground
                  source={overlayimage}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    opacity: this.state.flagFavorites ? 1 : 0,
                  }}
                  resizeMode={'contain'}
                />
                <Texting
                  style={{
                    fontSize: hp(2.7),
                    fontFamily: 'Roboto-Regular',
                  }} text='Favorites' />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              flex:1
              // height: hp(100.6) - (wp(100) / 3 + StatusBar.currentHeight),
            }}>
            {this.renderPage()}
          </View>
          {this.state.flagPosted && (
            <View
              style={{
                bottom: hp(12),
                position: 'absolute',
                right:10
              }}>
              <TouchableWithoutFeedback onPress={this.createJob}>
                <View
                  style={{
                    height:hp(8),width:hp(8),borderRadius:hp(4),backgroundColor:themeColor,justifyContent: 'center',
                      alignItems: 'center',
                  }}>
                  <Image
                    source={createJ}
                    style={{
                      height:hp(8),width:hp(8),borderRadius:hp(4),
                      
                    }}
                    resizeMode={'cover'} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }
}

export default withNavigationFocus(AdminDashboard);