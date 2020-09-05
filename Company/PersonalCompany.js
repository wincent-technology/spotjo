/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StatusBar, SafeAreaView, ImageBackground, Dimensions, Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { scale } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { backgroundCorner, Companyavtar, FontBold, FontRegular, Background } from '../Constant/index'

class PersonalCompany extends Component {
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
        this.props.navigation.navigate('Companylogo');

    }

    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
                <ImageBackground style={styles.ImageBlue}
            source={require('../Img/glossy.png')}
            resizeMode={'stretch'}>
                    <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source={require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }} /></View>
                        <ImageBackground style={styles.AvtarView} source={backgroundCorner}><Image source={Companyavtar} style={{
                height: wp('22'),
                width: wp('22'),
            // backgroundColor: "transparent"
            }} resizeMode={'contain'}/></ImageBackground>
                        <View style={styles.PersonalInfo}>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Company</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}>PORSCHE</Text></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Branch</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}>Automotive</Text></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Email</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}>porsche@email.com</Text></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Mobile Number</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}>+9100000-00000</Text></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Address</Text></View>
                                <View style={styles.PersonalInfoEnd}><Text style={[styles.PersonalInfoText, {
                fontWeight: "bold",
                fontSize: scale(14)
            }]}>mohringer street 453 70749, Sttutgart</Text></View></View>
                        </View>
                        <View style={{
                top: hp(5),
                left: wp(30),
            // position: "absolute"
            }}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}>
                                <View style={[styles.Size, {
                alignItems: "flex-end"
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View>
                    </View>
                </ImageBackground></ImageBackground></SafeAreaView>
        );
    }
}
;
export default withNavigationFocus(PersonalCompany)