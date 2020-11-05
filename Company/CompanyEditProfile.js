import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Text,
  Image,
  View,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {left, library, icon, play, leftVid} from '../src/IconManager';
import {scale, getStatusBarHeight} from '../src/Util';
import {
  TRANLINE,
  themeColor,
  themeWhite,
  IC_ARR_UP,
  IC_ARR_DOWN,
  Background,
  Dashboard,
  company,
  jobType,
  education,
  blanks,
  Fulls,
  FontRegular,
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
  CheckBox,
  DropDownItem,
  Rating,
  NavigationHead,
  StarRating,
} from '../Component/ViewManager';
import CustomButton from '../Component/Button';
// import { Rating } from '../Component/ViewManager'

class CompanyEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starCount: 3,
      rippleColor: 'gray',
    };
    console.log('global', global.role);
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  Back = () => {
    // console.log("hi");
    this.props.navigation.goBack();
  };

  Video = () => {
    if (global.Video)
      this.props.navigation.navigate('VideoPlayer', {
        vid: global.Video,
      });
    else alert('video coming soon');
    // this.props.navigation.navigate('VideoResume');
  };
  Personal = () => {
    this.props.navigation.navigate('PersonalCompany');
  };
  Dashboard = () => {
    // console.warn('hi')

    // setRippleColor(this.state.rippleColor);
    this.props.navigation.navigate('Admin');
  };
  CompanyService = () => {
    this.props.navigation.navigate('CompanyServices');
  };
  User = () => {
    this.props.navigation.navigate('CompanyUser');
  };

  render() {
    const {Hourly, Monthly, Yearly} = this.state;
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <NavigationHead
            centerComponent="Edit Company Profile"
            onPress={() => this.Back()}
          />
          <View style={styles.FilterMainView}>
            <ImageBackground
              style={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 50 + hp(5)),
              }}
              source={require('../Img/ract.png')}
              resizeMode={'stretch'}>
              <View style={styles.JobEditProfileMainView}>
                <ImageBackground
                  source={require('../Img/TRANSBACK.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  resizeMode={'stretch'}>
                  <View style={styles.JobEditProfileHead}>
                    <View
                      style={styles.VideoIconSize}
                      onStartShouldSetResponder={this.Video}>
                      <View>{play('videocam', scale(40), themeColor)}</View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.JobEditProfileResumeVideo,
                      {
                        marginTop: scale(-10),
                      },
                    ]}>
                    <Text
                      style={{
                        fontSize: scale(13),
                        fontWeight: 'bold',
                      }}>
                      Company Video
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        marginTop: scale(10),
                      },
                      styles.JobEditProfileResumeVideo,
                    ]}>
                    <StarRating
                      emptyStar={blanks}
                      fullStar={Fulls}
                      iconSet={'MaterialIcons'}
                      disabled={false}
                      maxStars={5}
                      starSize={scale(20)}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'orange'}
                    />
                  </View>
                </ImageBackground>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <TouchableNativeFeedback
                  onPress={this.Dashboard}
                  background={TouchableNativeFeedback.Ripple(themeColor)}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={Dashboard}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Text style={styles.NativeFontSty} numberOfLines={1}>
                        Dashboard
                      </Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={this.Personal}
                  background={TouchableNativeFeedback.Ripple('#feba4b')}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={education}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Text style={styles.NativeFontSty} numberOfLines={1}>
                        Company Information
                      </Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={this.CompanyService}
                  background={TouchableNativeFeedback.Ripple('#8bbdb2')}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={company}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Text style={styles.NativeFontSty} numberOfLines={1}>
                        Company Services
                      </Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                {global.role != 'Staff' && (
                  <TouchableNativeFeedback
                    onPress={this.User}
                    background={TouchableNativeFeedback.Ripple('#a26e85')}>
                    <View style={styles.NativeViewButton}>
                      <View style={styles.NativeSecondView}>
                        <Image
                          source={jobType}
                          resizeMethod={'resize'}
                          style={styles.imageStyle}
                          resizeMode={'contain'}
                        />
                      </View>
                      <View style={styles.NativeThirdView}>
                        <Text style={styles.NativeFontSty} numberOfLines={1}>
                          User Management
                        </Text>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                )}
              </View>
            </ImageBackground>
          </View>
          <View style={styles.TranLingImage}>
            <Image
              source={TRANLINE}
              style={styles.imageStyle}
              resizeMode={'stretch'}
            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(CompanyEditProfile);
