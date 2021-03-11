import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  View,
  TouchableNativeFeedback,TouchableWithoutFeedback
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,
  play
} from '../src/IconManager';
import {
  scale
} from '../src/Util';

import {
  TRANLINE,
  themeColor,
  themeWhite,
  Background,
  Dashboard,
  skill,
  blanks,
  Fulls,
  workExp,
  education,
  personalInfo,
  jobType,FontBold,
  languages,avtar,
  qualification,WhiteVideo,icons_salerytype
} from '../Constant/index';
import {
  StarRating,
  NavigationHead
} from '../Component/ViewManager';
import CustomButton from '../Component/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import { PieChart } from 'react-native-svg-charts'

class JobEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starCount: 3,
    };
    this.sum = 0

  }

  componentWillMount(){
    this.sum = this.sums();
    let piedata = this.piedata();
    console.log('piedata>',piedata)
    this.setState({
      piedata
    })
  }

  sums = () => {  
    let arr = {
      firstName : global.firstName ? 1 : 0,
      lastName : global.lastName ? 1 : 0,
      UserEmail : global.UserEmail ? 1 : 0,
      Place : global.Place ? 1 : 0,
      UserMobile : global.UserMobile ? 1 : 0,
      UserProfile: global.UserProfile ? 1 : 0,
      Video: global.Video ? 1 : 0,
    }
  this.sum = Object.keys(arr).reduce((s,k) => s += arr[k], 0);
    return this.sum = ((this.sum * 100) / 7).toFixed() + '%'
    
    
  }

  piedata = () => {
    let arr = {
      firstName : global.firstName ? 1 : 0,
      lastName : global.lastName ? 1 : 0,
      UserEmail : global.UserEmail ? 1 : 0,
      Place : global.Place ? 1 : 0,
      UserMobile : global.UserMobile ? 1 : 0,
      UserProfile: global.UserProfile ? 1 : 0,
      Video: global.Video ? 1 : 0,
    }
    
    let data = [arr.firstName,arr.lastName,arr.UserEmail,arr.Place,arr.UserMobile,arr.UserProfile,arr.Video];
    // const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    let Piedata = [];

    return Piedata = data.map((value, index) => ({
      value:  value == 0 ? 1 : value,
      svg: {fill:value == 0 ? 'gray' : themeColor},
      key: index,
  }));
  }


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
    const {
      Hourly,
      Monthly,
      Yearly
    } = this.state;
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <StatusBar hidden={false} backgroundColor={themeWhite} />
          <NavigationHead
            centerComponent="Edit Profile"
            onPress={() => this.Back()}
          />
          <View style={styles.FilterMainView}>
          <View style={{
                top: hp(4),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: 'gray',
                fontSize: scale(23),
                fontFamily: "Roboto-Bold"
            }}>{global.firstName + ' ' + global.lastName}</Text></View>
          <View style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom:20,
                justifyContent:"space-between"
            }}>
                <View style={{
                marginTop: hp(4.5),
                marginLeft: wp(7),
                width: wp(32),
                height: wp(32),
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5,backgroundColor:"white",borderColor:themeColor,borderWidth:2,borderRadius:15
            }}
    
            ><Image 
            source={
              global.UserProfile
                              ? {
                                  uri: global.UserProfile,
                                }
                              : avtar
                          }
            style={{
                height: wp('29'),
                width: wp('29'),
            // alignItems: "stretch",
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></View>
            <View style={{
                flexDirection: "column",
                height: wp(32),
                width: wp(50),justifyContent:"center",alignItems:"flex-end",
                marginTop: hp(3),marginRight:wp(10),
            }}>
            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('VideoPlayer', {
                vid: global.Video
            })}><View style={{
                flexDirection: "column",
                // height: hp(9),
                width: wp(26),
                alignItems: "center",
                justifyContent: "center"
            }}><Image source={WhiteVideo}  tintColor={themeColor}resizeMode={'contain'} style={{
                height: scale(65),
                width: scale(65),
            }}/>
            <View style={{height:1,width:wp(30),backgroundColor:"#333",marginTop:scale(0)}}/>
            <View style={{marginTop:scale(5)}}><Text style={{
                color: "#333",
                fontFamily: "Roboto-Bold",
                fontSize: scale(12)
            }}>Video Resume</Text></View>
            </View></TouchableWithoutFeedback>
            <View style={{marginTop:scale(5)}}>
            <StarRating
            emptyStar={blanks}
            starStyle={{marginLeft:5}}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(15)}
            rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
            fullStarColor={'orange'}
            /></View>
            </View>
            </View>
              <ScrollView style={{ alignSelf: 'stretch',
    marginBottom: scale(265),}}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginHorizontal:wp(7)
                  }}>

                  <TouchableNativeFeedback
                  onPress={this.Dashboard}
                  background={TouchableNativeFeedback.Ripple('#feba4b')}>
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
                  onPress={this.addskills}
                  background={TouchableNativeFeedback.Ripple('#feba4b')}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={skill}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Text style={styles.NativeFontSty} numberOfLines={1}>
                        Skills
                      </Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={this.Work}
                  background={TouchableNativeFeedback.Ripple('#feba4b')}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={workExp}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Text style={styles.NativeFontSty} numberOfLines={1}>
                        Work Experience
                      </Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={this.addEducation}
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
                        Education
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
                        source={jobType}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Text style={styles.NativeFontSty} numberOfLines={1}>
                        Personal Information
                      </Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={this.AddSalary}
                  background={TouchableNativeFeedback.Ripple('#feba4b')}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={icons_salerytype}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Text style={styles.NativeFontSty} numberOfLines={1}>
                        Salary
                      </Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                </View>
              </ScrollView>
          </View>
          <View style={{alignItems:"center",bottom:50,position:"absolute",justifyContent:"center",width:"100%"}}>
              {this.state.piedata && <PieChart style={{ height: 125,width:125,marginBottom:5 }} data={this.piedata()}/>}
            <View style={{alignItems:"center",justifyContent:"center"}}>
              <Text style={{color:themeColor,fontSize:scale(20),fontFamily:FontBold}}>
                  {this.sums()}
              </Text>
              <Text style={{color:'gray',fontSize:scale(20),fontFamily:FontBold}}>
                Profile Completion
              </Text>
            </View> 
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(JobEditProfile);