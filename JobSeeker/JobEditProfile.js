import React, {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import styles from '../src/Style';
import {scale} from '../src/Util';

import {
  themeColor,
  themeWhite,
  Background,
  Dashboard,
  skill,
  blanks,
  Fulls,
  workExp,
  education,
  jobType,
  FontBold,
  avtar,
  WhiteVideo,
  icons_salerytype,Companyavtar
} from '../Constant/index';
import {StarRating, NavigationHead} from '../Component/ViewManager';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {PieChart} from 'react-native-svg-charts';
import Texting from '../Constant/Text';

const RippleButton = ({...props}) => {
	return <TouchableNativeFeedback
	onPress={props.onPress}
	background={TouchableNativeFeedback.Ripple(props.rippleColor)}>
	<View style={styles.NativeViewButton}>
	  <View style={styles.NativeSecondView}>
		<Image
		  source={props.source}
		  resizeMethod={'resize'}
		  style={styles.imageStyle}
		  resizeMode={'contain'}
		/>
	  </View>
	  <View style={styles.NativeThirdView}>
		<Texting
		  style={styles.NativeFontSty}
		  numberOfLines={1}
		  text={props.title}
		/>
	  </View>
	</View>
  </TouchableNativeFeedback>
}

class JobEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starCount: 3,
    };
    this.sum = 0;
  }

  componentWillMount() {
    this.sum = this.sums();
    let piedata = this.piedata();
    console.log('piedata>', piedata);
    this.setState({
      piedata,
    });
  }

  sums = () => {
    let arr = {
      firstName: global.firstName ? 1 : 0,
      lastName: global.lastName ? 1 : 0,
      UserEmail: global.UserEmail ? 1 : 0,
      Place: global.Place ? 1 : 0,
      UserMobile: global.UserMobile ? 1 : 0,
      UserProfile: global.UserProfile ? 1 : 0,
      Video: global.Video ? 1 : 0,
    };
    this.sum = Object.keys(arr).reduce((s, k) => (s += arr[k]), 0);
    return (this.sum = ((this.sum * 100) / 7).toFixed() + '%');
  };

  piedata = () => {
    // console.log('global.UserProfile',global.UserProfile)
    let arr = {
      firstName: global.firstName ? 1 : 0,
      lastName: global.lastName ? 1 : 0,
      UserEmail: global.UserEmail ? 1 : 0,
      Place: global.Place ? 1 : 0,
      UserMobile: global.UserMobile ? 1 : 0,
      UserProfile: global.UserProfile ? 1 : 0,
      Video: global.Video ? 1 : 0,
    };

    let data = [
      arr.firstName,
      arr.lastName,
      arr.UserEmail,
      arr.Place,
      arr.UserMobile,
      arr.UserProfile,
      arr.Video,
    ];
    // const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    let Piedata = [];

    return (Piedata = data.map((value, index) => ({
      value: value == 0 ? 1 : value,
      svg: {fill: value == 0 ? 'gray' : themeColor},
      key: index,
    })));
  };

  Back = () => {
    // console.log("hi");
    this.props.navigation.navigate('jobli');
  };

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  Video = () => {
    if (global.Video)
      this.props.navigation.navigate('VideoPlayer', {
        vid: global.Video,
      });
    else alert('video coming soon'); // this.props.navigation.navigate('JobVideoResume');
  };
  Personal = () => {
    this.props.navigation.navigate('Personal');
  };
  Work = () => {
    this.props.navigation.navigate('EditWorkExperience');
  };
  addskills = () => {
    this.props.navigation.navigate('AddSkilJob');
  };
  my = () => {
    this.props.navigation.navigate('MyProfile');

  }

  addEducation = () => {
    this.props.navigation.navigate('EditEducation');
  };
  Dashboard = () => {
    console.log('hi');
    this.props.navigation.navigate('UserAd');
  };
  AddSalary = () => {
    console.log('hi');
    this.props.navigation.navigate('AddSalary');
  };
  render() {
    const {Hourly, Monthly, Yearly} = this.state;
    return (
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} backgroundColor={themeWhite} />
          <NavigationHead
            centerComponent="Edit Profile"
            onPress={() => this.Back()}
          />
          <ScrollView
            style={{flex: 1, alignSelf: 'stretch'}}
            >
            <View
              style={{
                width: wp('96%'),
                // height: hp('100%'),
                // flexGrow: 1,
                marginHorizontal: wp('2%'),
                borderRadius: scale(20),
              }}>
              <View
                style={{
                  top: hp(1),
                  marginHorizontal: wp(7),
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: hp(3),
                    fontFamily: 'Roboto-Bold',
                  }}>
                  {(global.firstName || 'Unknown') + ' ' + (global.lastName || 'Unknown')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                  // marginTop:hp(3),
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    marginTop: hp(2),
                marginLeft: wp(8),
                width: wp(28),
                height: wp(28),
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5,backgroundColor:"white",borderColor:themeColor,borderWidth:2,borderRadius:15
                  }} 
            onStartShouldSetResponder = {this.Personal}
                  >
                  <Image
                    source={
                      global.UserProfile
                        ? {
                            uri: global.UserProfile,
                          }
                        : Companyavtar
                    }
                    style={{
                      height: wp(25),
                width: wp(25),
                borderRadius:wp(2),
                      // alignItems: "stretch",
                      // backgroundColor: "transparent"
                    }}
                    resizeMode={'contain'}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                height: wp(28),
                width: wp(50),justifyContent:"center",alignItems:"flex-end",
                marginTop: hp(1),marginRight:wp(10),
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.navigation.navigate('VideoPlayer', {
                        vid: global.Video,
                      })
                    }>
                    <View
                      style={{
                        flexDirection: 'column',
                        // height: hp(9),
                        width: wp(26),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={WhiteVideo}
                        tintColor={themeColor}
                        resizeMode={'contain'}
                        style={{
                          height: scale(50),
                          width: scale(50),
                        }}
                      />
                      <View
                        style={{
                          height: 1,
                          width: wp(30),
                          backgroundColor: '#333',
                          marginTop: scale(0),
                        }}
                      />
                      <View style={{marginTop: scale(5)}}>
                        <Texting
                          style={{
                            color: '#333',
                            fontFamily: 'Roboto-Bold',
                            fontSize: hp(1.5),
                          }}
                          text="Video_Resume"
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <View style={{marginTop: scale(5),marginHorizontal:wp(-1)}}>
                    <StarRating
                      emptyStar={blanks}
                      starStyle={{marginLeft: 5}}
                      fullStar={Fulls}
                      halfStar={'star-half'}
                      iconSet={'MaterialIcons'}
                      disabled={false}
                      maxStars={5}
                      starSize={hp(2.5)}
                      rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                      fullStarColor={'orange'}
                    />
                  </View>
                </View>
              </View>
                <View
                  style={{
                    flexDirection: 'column',
                  marginHorizontal:wp(6)
                  }}>
				  <RippleButton title={'Dashboard'} rippleColor={'#feba4b'} onPress={this.Dashboard} source={Dashboard} />
				  <RippleButton title={'Skills'} rippleColor={'#feba4b'} onPress={this.addskills} source={skill} />
				  <RippleButton title={'Work_Experience'} rippleColor={'#feba4b'} onPress={this.Work} source={workExp} />
				  <RippleButton title={'Education'} rippleColor={'#feba4b'} onPress={this.addEducation} source={education} />
				  <RippleButton title={'Personal_Information'} rippleColor={'#feba4b'} onPress={this.Personal} source={jobType} />
				  <RippleButton title={'Salary'} rippleColor={'#feba4b'} onPress={this.AddSalary} source={icons_salerytype} />
				  <RippleButton title={'My Profile'} rippleColor={'#feba4b'} onPress={this.my} source={icons_salerytype} />

                </View>
            </View>
          </ScrollView>
          <View
            style={{
              alignItems:"center",bottom:47,position:"absolute",justifyContent:"center",width:"100%"
            }}>
            {this.state.piedata && (
              <PieChart
                style={{height: hp(8),width:hp(8),marginBottom:3 }}
                data={this.piedata()}
              />
            )}
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color:themeColor,fontSize:hp(2.7),fontFamily:FontBold
                }}>
                {this.sums()}
              </Text>
              <Texting
                style={{
                  color:'gray',fontSize:hp(3),fontFamily:FontBold
                }}
                text="Profile_Completion"
              />
            </View>
          </View>
        </ImageBackground>
    );
  }
}

export default withNavigationFocus(JobEditProfile);
