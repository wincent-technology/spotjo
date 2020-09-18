import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground, FlatList, Text, Image, View, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, leftVid } from '../src/IconManager';
import { scale } from '../src/Util'
import { themeColor, themeWhite, TRANLINE, rightWrongBack, rite, wrong } from '../Constant/index'
import { Rating, NavigationHeader } from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { FontBold, FontRegular, Background } from '../Constant/index'
import JobAboutCompanyItemMV from './JobAboutCompanyItemMV'


class JobAboutCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    Back = () => {
        // console.log("hi");
        this.props.navigation.goBack()
    }

    render() {
        const {Hourly, Monthly, Yearly} = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
                    <ImageBackground style={{
                width: wp('96%'),
                marginHorizontal: wp(2),
                height: hp('100%') - (StatusBar.currentHeight + 150 + hp(5)),
                top: wp(14)
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
            <View style={{
                alignItems: "center",
                top: hp(1)
            }}><Text style={{
                color: themeColor,
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }}>About</Text></View>
            <FlatList
            style={{
                marginTop: scale(10),
                marginBottom: 50,
                backgroundColor: 'transparent',
            }}
            data = {global.item.About_Company}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <JobAboutCompanyItemMV
                item={item}
                index={index}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('28%'),
                offset: hp('28%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
          </ImageBackground>
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
            <View style={{
                top: hp(7),
                // zIndex: 5,
                height: hp(6),
                width: wp(105),
                left: wp(-2)
            }}>
            <ImageBackground source={rightWrongBack} style={styles.imageStyle} resizeMode={'stretch'}>
                <View style={{
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center"
            }}>
                <View style={{
                marginRight: wp(25),
            }}><Image source={wrong} style={{
                height: scale(30),
                width: scale(30),
            }} resizeMode={'contain'} /></View>
            <View><Image source={rite} style={{
                height: scale(35),
                width: scale(35),
            }} resizeMode={'contain'} /></View>
            </View></ImageBackground></View>
                </ImageBackground></SafeAreaView>
        )
    }
}

export default withNavigationFocus(JobAboutCompany);