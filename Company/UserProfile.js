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
    facebook,
    blanks,
    Fulls,
    web
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
        this.props.navigation.navigate('ComEdit')
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
        console.log('globa', global.Company)
        // const {item} = global.item
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHead centerComponent='My Profile' onPress={() => this.Back()} rightComponent='edit' onExit={() => this.Edit()}/>
   <View style={styles.CompanyProfileMainImage}>

   <ScrollView>
   <ImageBackground style={{

                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 40 + hp(5)),
            }} source={transparentImage} resizeMode={'stretch'}>
  <View style={{
                top: hp(4),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: themeWhite,
                fontSize: scale(23),
                fontFamily: "Roboto-Bold"
            }}>{global.Company}</Text></View>
<View style={{
                flexDirection: "row",
                alignItems: "flex-start",
            }}>
   <ImageBackground style={{
                marginTop: hp(4.5),
                marginLeft: wp(7),
                width: wp(32),
                height: wp(32),
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5
            }}
            source={backgroundCorner}><Image source={global.uploadUri ? {
                uri: global.uploadUri
            } : Companyavtar}
            style={{
                height: wp('29'),
                width: wp('29'),
            // alignItems: "stretch",
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></ImageBackground>
            <View style={{
                flexDirection: "row",
                height: hp(6),
                width: wp(50),
                marginTop: hp(9)
            }}>
            <View style={{
                flexDirection: 'column',
                height: hp(6),
                width: wp(15),
                alignItems: "center",
                marginHorizontal: wp(5),
                justifyContent: "center"
            }}><View><Image source={settingTab} resizeMode={'contain'} style={{
                height: scale(28),
                width: scale(30)
            }}/></View><View><Text style={{
                color: themeWhite,
                fontFamily: "Roboto-Regular",
                fontSize: scale(12)
            }}>Settings</Text></View></View>
            <TouchableWithoutFeedback onPress = {() => this.props.navigation.navigate('VideoPlayer', {
                vid: global.Video
            })}><View style={{
                flexDirection: "column",
                height: hp(6),
                width: wp(26),
                alignItems: "center",
                justifyContent: "center"
            }}><Image source={WhiteVideo} resizeMode={'contain'} style={{
                height: scale(30),
                width: scale(35)
            }}/><View><Text style={{
                color: themeWhite,
                fontFamily: "Roboto-Regular",
                fontSize: scale(12)
            }}>Video Resume</Text></View>
            </View></TouchableWithoutFeedback>
            </View>
            </View>
            <View style={{
                height: hp(0.6),
                width: '94.4%',
                marginLeft: wp(2.3),
                marginTop: hp(-5.5),
                backgroundColor: "#d2d2d2"
            }}/>
   <View style={{
                marginLeft: wp(7),
                marginTop: hp(6),
                height: hp(3),
                width: wp(32),
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'row',
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
            <View style={{
                marginTop: hp(-7),
                marginLeft: wp(50),
                height: scale(20),
                width: scale(100)
            }}><StarRating
            emptyStar={blanks}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(20)}
            rating={3}
            // selectedStar={(rating) => this.handleLanguage(rating, index)}
            fullStarColor={'orange'}
            /></View>
  <View style={{
                marginLeft: wp(8),
                marginTop: hp(7),
                flexDirection: 'column',
            }}>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "center",marginLeft:scale(23)
            }]}>
      <View style={styles.myProfileIconImageBuilding}>
        <Image source={building} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={{
                marginLeft: scale(5),
                fontSize: scale(18),
                fontFamily: "Roboto-Regular",
            }}>
        {global.Branch}
      </Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "center"
            }]}>
      <View style={styles.myProfileIconImage}>
        <Image source={notheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.Mobile}</Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "center"
            }]}>
      <View style={styles.myProfileIconImage}>
        <Image source={mailtheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.Email}</Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "center"
            }]}>
      <View style={styles.myProfileIconImage}>
        <Image source={web} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.WebSite}</Text>
    </View>
    <View style={styles.CompanyDetailIcon}>
      <View style={styles.myProfileIconImage}>
        <Image source={placetheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.Address}</Text>
    </View>
  </View>
</ImageBackground>
        </ScrollView>
        </View>
         <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
        </ImageBackground>
      </SafeAreaView>
        )
    }
}

export default withNavigationFocus(UserProfile);