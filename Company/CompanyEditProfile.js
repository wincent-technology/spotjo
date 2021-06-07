import React, {
  Component,
  useState
} from 'react';
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
  Image,Alert,
  View,
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
  scale,
  getStatusBarHeight
} from '../src/Util';
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
  Fulls,backgroundCorner,WhiteVideo,
  FontRegular,
  FontBold,Companyavtar,Resource_Profile
} from '../Constant/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  NavigationHead,
  StarRating,
} from '../Component/ViewManager';
import { PieChart } from 'react-native-svg-charts'
import Texting from '../Constant/Text'

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



class CompanyEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starCount: 3,
      rippleColor: 'gray',
      piedata : []
    };
    this.sum = 0
    // console.log('global', global.role);
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
    if (global.role == 'Super Admin')
    this.props.navigation.navigate('Admin');
    else 
      Alert.alert("Register", "please validate the otp", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "ok",
        onPress: () => {}
    }], {
        cancelable: false
    });
  };
  Resource = () => {
    if (global.role == 'Super Admin')
    this.props.navigation.navigate('Resource');
    else 
      Alert.alert("Register", "please validate the otp", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "ok",
        onPress: () => {}
    }], {
        cancelable: false
    });
  };
  CompanyService = () => {
    if (global.role == 'Super Admin')
    this.props.navigation.navigate('CompanyServices');
    else 
      Alert.alert("Register", "please validate the otp", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "ok",
        onPress: () => {}
    }], {
        cancelable: false
    });
  };
  User = () => {
    if (global.role == 'Super Admin')
    this.props.navigation.navigate('CompanyUser');
    else 
      Alert.alert("Register", "please validate the otp", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "ok",
        onPress: () => {}
    }], {
        cancelable: false
    });
  };
  Bulk = () => {
    if (global.role == 'Super Admin')
    this.props.navigation.navigate('BulkUploadResume');
    else 
      Alert.alert("Register", "please validate the otp", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "ok",
        onPress: () => {}
    }], {
        cancelable: false
    });
  };
  Setting = () => {
    if (global.role == 'Super Admin')
    this.props.navigation.navigate('UserProfile');
    else 
      Alert.alert("Register", "please validate the otp", [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
    }, {
        text: "ok",
        onPress: () => {}
    }], {
        cancelable: false
    });
  };
  componentDidMount(){
    
    this.sum = this.sums();
    let piedata = this.piedata();
    // console.log('piedata>',piedata)
    this.setState({
      piedata
    })
  }

  sums = () => {  
    let arr = {
      Email : global.Email ? 1 : 0,
      Branch : global.Branch ? 1 : 0,
      uploadUri : global.uploadUri ? 1 : 0,
      Mobile : global.Mobile ? 1 : 0,
      Company : global.Company ? 1 : 0,
      Video: global.Video ? 1 : 0,
      WebSite: global.WebSite ? 1 : 0,
      Address: global.Address ? 1 : 0,
    }
  this.sum = Object.keys(arr).reduce((s,k) => s += arr[k], 0);
    return this.sum = ((this.sum * 100) / 8).toFixed() + '%'
  }

  piedata = () => {
    let arr = {
      Email : global.Email ? 1 : 0,
      Branch : global.Branch ? 1 : 0,
      uploadUri : global.uploadUri ? 1 : 0,
      Mobile : global.Mobile ? 1 : 0,
      Company : global.Company ? 1 : 0,
      Video: global.Video ? 1 : 0,
      WebSite: global.WebSite ? 1 : 0,
      Address: global.Address ? 1 : 0,
    }
    
    let data = [arr.Email,arr.Branch,arr.uploadUri,arr.Mobile,arr.Company,arr.Video,arr.WebSite,arr.Address];
    // const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)
    let Piedata = [];

    return Piedata = data.map((value, index) => ({
      value:  value == 0 ? 1 : value,
      svg: {fill:value == 0 ? 'gray' : themeColor},
      key: index,
  }));
  }


  render() {
    return (
      <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} backgroundColor={themeWhite} />
          <NavigationHead
            centerComponent="Edit Company Profile"
            onPress={() => this.Back()}
          />
          <ScrollView style={{flex:1,alignSelf:"stretch",}}>
          <View style={{ width: wp('96%'),
              // height: hp('100%'),
              // flexGrow:1,
              marginHorizontal: wp('2%'),
              borderRadius: scale(20),
            }}>
          <View style={{
                top: hp(1),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: 'gray',
                fontSize: hp(3),
                fontFamily: "Roboto-Bold"
            }}>{global.Company}</Text></View>
          <View style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom:10,
                justifyContent:"space-between"
            }}>
                <View style={{
                marginTop: hp(2),
                marginLeft: wp(8),
                width: wp(28),
                height: wp(28),
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5,backgroundColor:"white",borderColor:themeColor,borderWidth:2,borderRadius:15
            }}
            onStartShouldSetResponder = {this.Personal}
            ><Image 
            source={
              global.uploadUri
                              ? {
                                  uri: global.uploadUri,
                                }
                              : Companyavtar
                          }
            style={{
              height: wp(25),
                width: wp(25),
                borderRadius:wp(2),
              
            // alignItems: "stretch",
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></View>
            <View style={{
                flexDirection: "column",
                height: wp(28),
                width: wp(50),justifyContent:"center",alignItems:"flex-end",
                marginTop: hp(1),marginRight:wp(10),
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
                height: scale(50),
                width: scale(50),
            }}/>
            <View style={{height:1,width:wp(30),backgroundColor:"#333",marginTop:scale(0)}}/>
            <View style={{marginTop:scale(5)}}><Texting style={{
                color: "#333",
                fontFamily: "Roboto-Bold",
                fontSize: hp(1.5)
            }} text='Company_Video'/></View>
            </View></TouchableWithoutFeedback>
            <View style={{marginTop:scale(5),marginHorizontal:wp(-1)}}>
            <StarRating
            emptyStar={blanks}
            starStyle={{marginLeft:5}}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={hp(2.5)}
            rating={this.state.starCount}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
            fullStarColor={'orange'}
            /></View>
            </View>
            </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal:wp(6)
                }}>
       <RippleButton title={'Dashboard'} rippleColor={themeColor} onPress={this.Dashboard} source={Dashboard} />
       <RippleButton title={'Company_Information'} rippleColor={'#feba4b'} onPress={this.Personal} source={education} />
       <RippleButton title={'Company_Services'} rippleColor={'#8bbdb2'} onPress={this.CompanyService} source={company} />
                {global.role != 'Staff' && (
       <RippleButton title={'User_Management'} rippleColor={'#a26e85'} onPress={this.User} source={jobType} />
                )}
       <RippleButton title={'Resource_Profile'} rippleColor={'#a26e85'} onPress={this.Resource} source={Resource_Profile} />
       <RippleButton title={'Resume_Upload'} rippleColor={'#a26e85'} onPress={this.Bulk} source={Resource_Profile} />
       <RippleButton title={'My Profile'} rippleColor={'#a26e85'} onPress={this.Setting} source={Resource_Profile} />
              </View>
          </View></ScrollView>
          <View style={{alignItems:"center",bottom:47,position:"absolute",justifyContent:"center",width:"100%"}}>
              {this.state.piedata && <PieChart style={{ height: hp(8),width:hp(8),marginBottom:3 }} data={this.piedata()}/>}
            <View style={{alignItems:"center",justifyContent:"center"}}>
              <Text style={{color:themeColor,fontSize:hp(2.7),fontFamily:FontBold}}>
                  {this.sums()}
              </Text>
              <Texting style={{color:'gray',fontSize:hp(3),fontFamily:FontBold}} text='Profile_Completion'/>
            </View> 
          </View>
        </ImageBackground>
    );
  }
}

export default withNavigationFocus(CompanyEditProfile);


// <TouchableNativeFeedback
//                   onPress={this.CompanyService}
//                   background={TouchableNativeFeedback.Ripple('#8bbdb2')}>
//                   <View style={styles.NativeViewButton}>
//                     <View style={styles.NativeSecondView}>
//                       <Image
//                         source={company}
//                         resizeMethod={'resize'}
//                         style={styles.imageStyle}
//                         resizeMode={'contain'}
//                       />
//                     </View>
//                     <View style={styles.NativeThirdView}>
//                       <Text style={styles.NativeFontSty} numberOfLines={1}>
//                         Company Services
//                       </Text>
//                     </View>
//                   </View>
//                 </TouchableNativeFeedback>