import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
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
  building,
  notheme,
  placetheme,
  screentheme,
  edit,
  mailtheme,
  blanks,
  Fulls,
  employedtheme,
  bagtheme,
  Background,
  WhiteVideo,
  setting,
  sort,
  filter,
  TRANLINE,
  transparentImage,
  male,
  backgroundCorner,
  Companyavtar,
  linkedin,
  whatsapp,
  facebook,company,icons_jobType_blue,skillCategory,workExp,placeIcon,icons_salerytype,Mail,mobile,
  avtar,
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
  StarRating,
  NavigationHead
} from '../Component/ViewManager.js';
import ListShow from '../Component/ListShow'

// import ItemMV from './ItemMV'

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dating: [],
      dt: Date.now(),
      CompanyName: '',
      JobHeading: '',
      TotalExp: '',
    };
  }

  componentDidMount() {
    let From,
      To,
      tot,
      m = 0;
    let ary = [];

    let g = this.state.dt;
    g = new Date(g).getFullYear();

    let im = global.Experience
    // console.log('im', im);
    for (let i in im) {
      // console.log(im[i])
      From = im[i].From.split(' ');
      To = im[i].To.split(' ');
      ary.push(parseInt(To[1]));
      tot = To[1] - From[1];
      m = m + tot;
    }
    this.setState({
      TotalExp: m,
    });
    let jig = ary.sort(function(a, b) {
      console.log('a,b', a, b);
      return b - a;
    });
    for (let i in im) {
      To = im[i].To.split(' ');
      if (To[1] == jig[0]) {
        this.setState({
          CompanyName: im[i].Company,
          JobHeading: im[i].heading,
        });
      }
    }

    // console.log('hi total', m, new Date(g).getFullYear());
  }

  Back = () => {
    this.props.navigation.goBack();
  };
  Edit = () => {
    this.props.navigation.navigate('JobEditProfile');
  };
  render() {
    const {
      CompanyName,
      JobHeading,
      TotalExp
    } = this.state;
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
        tintColor={themeWhite}
          resizeMode={'stretch'}>
          <NavigationHead
            centerComponent="My Profile"
            onPress={() => this.Back()}
            rightComponent="edit"
            onExit={() => this.Edit()}
          />
        <StatusBar hidden={false} backgroundColor={themeColor}/>
          <View style={styles.CompanyProfileMainImage}>
            <ScrollView>
            <View style={{
              width: wp('96%'),
                  height: hp('100%') - (StatusBar.currentHeight + 50 + hp(5)),
                  overflow:"hidden",
                  zIndex:20
            }}>
                <View
                  style={{
                    top: hp(4),
                    marginHorizontal: wp(7),
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: scale(23),
                      fontFamily: 'Roboto-Bold',
                    }}
                    numberOfLines={1}>
                    {global.firstName} {global.lastName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                  <ImageBackground
                    style={{
                      marginTop: hp(4.5),
                      marginLeft: wp(7),
                      width: wp(32),
                      height: wp(32),
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 5,
                    }}
                    source={backgroundCorner}>
                    <Image
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
                      }}
                      resizeMode={'contain'}
                    />
                  </ImageBackground>
                  <View style={{
                flexDirection: "column",
                height: wp(32),
                width: wp(50),justifyContent:"center",alignItems:"center",
                marginTop: hp(3),marginHorizontal:wp(2),
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
            }}/><View style={{marginTop:scale(-10)}}><Text style={{
                color: themeColor,
                fontFamily: "Roboto-Regular",
                fontSize: scale(10)
            }}>Video Resume</Text></View>
            </View></TouchableWithoutFeedback>
            <View style={{height:1,width:wp(40),backgroundColor:"#333",marginVertical:scale(7)}}/>
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
            rating={3}
            // selectedStar={(rating) => this.handleLanguage(rating, index)}
            fullStarColor={'orange'}
            /></View>
            </View>
                </View>
               
               <View style={{
                marginLeft: wp(7),
                marginTop: hp(1),
                height: hp(3),
                width: wp(32),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row'
            }}><Image source={facebook} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25)
            }}/><Image source={linkedin} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25),
                marginHorizontal: wp(1)
            }}/><Image source={whatsapp} resizeMode={'contain'} style={{
                height: scale(25),
                width: scale(25)
            }}/>
            </View>
            <View style={[styles.CompanyProfileDetail,{marginTop:10}]}>
                    <ListShow name={CompanyName} image={company} />
                    <ListShow name={JobHeading ? 'Employed' : 'Fresher' } image={icons_jobType_blue} />
                    <ListShow name={JobHeading} image={skillCategory} />
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={workExp}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                        {TotalExp != 0 ? TotalExp - 1 : 0} - {TotalExp} Years /
                        </Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          {' '}
                          100%
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={placeIcon}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                          {global.Place} /
                        </Text>
                        <Text style={styles.CompanyProfileDetailLabel100}>
                          {' '}
                          100%
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                      <View style={styles.CompanyDetailIcon}>
                        <View style={styles.CompanyDetailProfileIcon}>
                          <Image
                            source={mobile}
                            style={styles.imageStyle}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.ItemDetailLabel1}>
                        {global.UserMobile}
                        </Text>
                      </View>
                      <View style={{height:0.5,width:wp(80)-24,backgroundColor:themeColor,marginLeft:5,marginTop:3,}}/>
                    <ListShow name={global.UserEmail} image={Mail} />
                    </View>
                </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(MyProfile);

// <View style={{
//                 marginTop: scale(100),
//                 backgroundColor: "#fff",
//                 width: wp('90%'),
//                 left: wp(2.4),
//                 height: hp('100%') - (StatusBar.currentHeight + scale(25) + scale(170)),
//                 borderBottomLeftRadius: scale(10),
//                 borderBottomRightRadius: scale(10),
//                 overflow: 'hidden'
//             }}>