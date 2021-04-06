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
  Image,
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

class CompanyEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      starCount: 3,
      rippleColor: 'gray',
      piedata : []
    };
    this.sum = 0
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
    this.props.navigation.navigate('Admin');
  };
  Resource = () => {
    this.props.navigation.navigate('Resource');
  };
  CompanyService = () => {
    this.props.navigation.navigate('CompanyServices');
  };
  User = () => {
    this.props.navigation.navigate('CompanyUser');
  };
  Bulk = () => {
    this.props.navigation.navigate('BulkUploadResume');
  };
  Setting = () => {
    this.props.navigation.navigate('Setting');
  };
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
          <StatusBar hidden={false} backgroundColor={themeWhite} />
          <NavigationHead
            centerComponent="Edit Company Profile"
            onPress={() => this.Back()}
          />
          <ScrollView style={{flex:1,alignSelf:"stretch",marginBottom:hp(100) <= 600 ? 150 : 20}}>
          <View style={{ width: wp('96%'),
              height: hp('100%'),
              flexGrow:1,
              marginHorizontal: wp('2%'),
              borderRadius: scale(20),
            }}>
          <View style={{
                top: hp(4),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: 'gray',
                fontSize: scale(23),
                fontFamily: "Roboto-Bold"
            }}>{global.Company}</Text></View>
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
            <View style={{marginTop:scale(5)}}><Texting style={{
                color: "#333",
                fontFamily: "Roboto-Bold",
                fontSize: scale(12)
            }} text='Company_Video'/></View>
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
              <View
                style={{
                  flexDirection: 'column',
                  marginHorizontal:wp(7)
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
                      <Texting style={styles.NativeFontSty} numberOfLines={1} text='Dashboard'/>
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
                        resizeMethod={'resize'}property
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Texting style={styles.NativeFontSty} numberOfLines={1} text='Company_Information'/>
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
                      <Texting style={styles.NativeFontSty} numberOfLines={1} text='Company_Services'/>
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
                        <Texting style={styles.NativeFontSty} numberOfLines={1} text='User_Management'/>
                      </View>
                    </View>
                  </TouchableNativeFeedback>
                )}
                
                <TouchableNativeFeedback
                  onPress={this.Resource}
                  background={TouchableNativeFeedback.Ripple('#a26e85')}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={Resource_Profile}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Texting style={styles.NativeFontSty} numberOfLines={1} text='Resource_Profile'/>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={this.Bulk}
                  background={TouchableNativeFeedback.Ripple('#a26e85')}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={Resource_Profile}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Texting style={styles.NativeFontSty} numberOfLines={1} text='Resume_Upload'/>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  onPress={this.Setting}
                  background={TouchableNativeFeedback.Ripple('#a26e85')}>
                  <View style={styles.NativeViewButton}>
                    <View style={styles.NativeSecondView}>
                      <Image
                        source={Resource_Profile}
                        resizeMethod={'resize'}
                        style={styles.imageStyle}
                        resizeMode={'contain'}
                      />
                    </View>
                    <View style={styles.NativeThirdView}>
                      <Texting style={styles.NativeFontSty} numberOfLines={1} text='Setting'/>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </View>
          </View></ScrollView>
          <View style={{alignItems:"center",bottom:50,position:"absolute",justifyContent:"center",width:"100%"}}>
              {this.state.piedata && <PieChart style={{ height: 100,width:100,marginBottom:5 }} data={this.piedata()}/>}
            <View style={{alignItems:"center",justifyContent:"center"}}>
              <Text style={{color:themeColor,fontSize:scale(20),fontFamily:FontBold}}>
                  {this.sums()}
              </Text>
              <Texting style={{color:'gray',fontSize:scale(20),fontFamily:FontBold}} text='Profile_Completion'/>
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