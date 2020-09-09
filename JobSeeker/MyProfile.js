import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View, } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, building, placetheme, screentheme, edit, mailtheme, notheme, employedtheme, bagtheme, Background, WhiteVideo, settingTab, sort, filter, TRANLINE, transparentImage, male, backgroundCorner, Companyavtar, linkedin, whatsapp, facebook } from '../Constant/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { scale } from '../src/Util';
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHead } from '../Component/ViewManager.js';
// import ItemMV from './ItemMV'



class MyProfile extends Component {
    constructor(props) {
        super(props);
    }

    Back = () => {
        this.props.navigation.goBack();
    };
    Edit = () => {
        this.props.navigation.navigate('JobEditProfile');
    }
    render() {
        // const {item} = global.item
        return global.item ? (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHead centerComponent='My Profile' onPress={() => this.Back()} rightComponent='edit' onExit={() => this.Edit()}/>
   <View style={styles.CompanyProfileMainImage}>

   <ScrollView>
   <ImageBackground style={{

                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 50 + hp(5)),
            }} source={transparentImage} resizeMode={'stretch'}>
  <View style={{
                top: hp(4),
                marginHorizontal: wp(7)
            }}><Text style={{
                color: themeWhite,
                fontSize: scale(23),
                fontFamily: "Roboto-Bold"
            }}>{global.item.name}</Text></View>
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
            source={backgroundCorner}><Image source={global.item.image} style={{
                height: wp('22'),
                width: wp('22'),
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
            <View style={{
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
            </View>
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
                marginLeft: wp(32)
            }}><Rating
            type='custom'
            imageSize={22}
            ratingCount={5}
            defaultRating={20}
            readonly={false}
            ratingBackgroundColor='transparent'
            startingValue={0}
            // ratingColor={"#f1ee40"}
            // tintColor={themeWhite}
            /></View>
  <View style={{
                marginLeft: wp(8),
                marginTop: hp(7),
                flexDirection: 'column',
            }}>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "flex-end"
            }]}>
      <View style={styles.myProfileIconImageBuilding}>
        <Image source={building} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={{
                marginLeft: scale(15),
                fontSize: scale(18),
                fontFamily: "Roboto-Regular",
            }}>
        {global.item.ComPany_Name}
      </Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "flex-end"
            }]}>
      <View style={styles.myProfileIconImage}>
        <Image source={employedtheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.item.Working}</Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "flex-end"
            }]}>
      <View style={styles.myProfileIconImage}>
        <Image source={screentheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.item.Header}</Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "flex-end"
            }]}>
      <View style={styles.myProfileIconImage}>
         <Image source={bagtheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {global.item.work_Experience} / 
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "flex-end"
            }]}>
      <View style={styles.myProfileIconImage}>
        <Image source={placetheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>
        {global.item.Address} /
      </Text>
      <Text style={styles.CompanyProfileDetailLabel100}> 100%</Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "flex-end"
            }]}>
      <View style={styles.myProfileIconImage}>
        <Image source={notheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.item.cell}</Text>
    </View>
    <View style={[styles.CompanyDetailIcon, {
                alignItems: "flex-end"
            }]}>
      <View style={styles.myProfileIconImage}>
        <Image source={mailtheme} style={styles.imageStyle} resizeMode={'contain'}/>
      </View>
      <Text style={styles.ItemDetailLabel1}>{global.item.email}</Text>
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
            ) : null;
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