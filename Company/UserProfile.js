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
    placetheme,
    screentheme,
    edit,
    mailtheme,
    notheme,
    employedtheme,
    bagtheme,
    Background,
    WhiteVideo,
    settingTab,
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
    blanks,
    Fulls,
    web
} from '../Constant/index';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import ListShow from '../Component/ListShow'

import {
    scale
} from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
    Rating,
    NavigationHead,
    StarRating
} from '../Component/ViewManager';
// import ItemMV from './ItemMV'



class UserProfile extends Component {
    constructor(props) {
        super(props);
        // console.log('global', global.Company);
    }

    Back = () => {
        this.props.navigation.goBack();
    };
    Edit = () => {
      // console.log('uploadUri',global.uploadUri)
        this.props.navigation.navigate('UserProfile')
    }
    // Video = (item) => {
    //     console.log('hels');
    //     let m = url + 'images/user/' + item.video
    //     if (item)
    //         this.props.navigation.navigate('VideoPlayer', {
    //             vid: m
    //         })
    //     else
    //         alert('not uploaded');
    // // this.props.navigation.navigate('VideoResume');
    // }

    render() {
        // console.log('globa', global.Company)
        // const {item} = global.item
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
            <View style={{
              width: wp('96%'),
              flex:1,
                  // height: '100%' - (StatusBar.currentHeight + 50 + hp(5)),
                  overflow:"hidden",
                  zIndex:20
            }}>
          <ScrollView style={{flex:1,alignSelf:"stretch"}}>
                <View
                  style={{
                    // top: hp(4),
                    marginHorizontal: wp(7),
                  }}>
                  <Text
                    style={{
                      color: '#333',
                      fontSize: hp(3),
                      fontFamily: 'Roboto-Bold',
                    }}
                    numberOfLines={1}>
                    {global.Company}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                  }}>
                  <ImageBackground
                    style={{
                      marginTop: hp(2),
                      marginLeft: wp(7),
                      width: wp(28),
                      height: wp(28),
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 5,
                    }}
                    source={backgroundCorner} >
                    <TouchableOpacity onPress={()=> this.Edit()}>
                    <Image
                      source={
                        global.uploadUri ? {
              uri: global.uploadUri
          } : Companyavtar
                      }
                      style={{
                        height: wp('25'),
                        width: wp('25'),
                borderRadius:wp(2),
                        // alignItems: "stretch",
                        // backgroundColor: "transparent"
                      }}
                      resizeMode={'contain'}
                    /></TouchableOpacity>
                  </ImageBackground>
                  <View style={{
                flexDirection: "column",
                height: wp(28),
                width: wp(60),justifyContent:"center",alignItems:"center",
                marginTop: hp(1),marginHorizontal:wp(2),
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
            }}/><View style={{marginTop:scale(-8)}}><Text style={{
                color: themeColor,
                fontFamily: "Roboto-Regular",
                fontSize: hp(1.5)
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
            starSize={hp(2.5)}
            rating={3}
            // selectedStar={(rating) => this.handleLanguage(rating, index)}
            fullStarColor={'orange'}
            /></View>
            </View>
                </View>
               
               <View style={{
                marginLeft: wp(5),
                marginTop: hp(1),
                height: hp(3),
                width: wp(32),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row'
            }}><Image source={facebook} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7)
            }}/><Image source={linkedin} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7),
                marginHorizontal: wp(1)
            }}/><Image source={whatsapp} resizeMode={'contain'} style={{
                height: hp(3.7),
                width: hp(3.7)
            }}/>
            </View>
            <View style={{marginTop:10,
                paddingHorizontal:wp(5),
                marginTop: scale(10),
                flexDirection: 'column'}}>
                    <ListShow name={global.Branch} image={company} />
                    <ListShow name={global.Mobile} image={mobile} />
                    <ListShow name={global.Email} image={Mail} />
                    <ListShow name={global.WebSite} image={web} />
                    <ListShow name={global.Address} image={placeIcon} />
                    </View>
            </ScrollView>
                </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
        )
    }
}

export default withNavigationFocus(UserProfile);