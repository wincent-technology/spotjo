/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground, Dimensions, Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { scale } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { backgroundCorner, avtar, FontBold, FontRegular, Background } from '../Constant/index'
class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.props.navigation.navigate('MainScreen')
        // }, 5000)
    }

    next = () => {
        this.props.navigation.navigate('JobSeekerPhoto');
    }
    profile = () => {
        this.props.navigation.navigate('MyProfile');
    }
    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
                <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source={require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }} /></View>
                        <ImageBackground style={styles.AvtarView} source={backgroundCorner} resizeMode={'contain'}><TouchableWithoutFeedback onPress={this.profile}><Image source={avtar} style={{
                height: wp('22'),
                width: wp('22'),
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></TouchableWithoutFeedback></ImageBackground>
                        <View style={styles.PersonalInfo}>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>First Name</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16),

            }]}>SriRam</Text></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Last Name</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16),

            }]}>Kumar Prasad</Text></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Email</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16),

            }]} numberOfLines={1}>kumar@email.com</Text></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Place</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16),

            }]}>Stuttgart</Text></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Mobile Number</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16),

            }]}>00-00-0000</Text></View></View>
                        </View>
                        <View style={{
                top: hp(5),
                left: wp(30),
            // position: "absolute"
            }}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}>
                                <View style={[styles.Size, {
                alignItems: "flex-end"
            }]}><Text style={[{
                fontSize: scale(24),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View>
                    </View>
                </ImageBackground></SafeAreaView>
        );
    }
}
;
export default withNavigationFocus(Personal)