/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground, Dimensions, Text, Image, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { scale } from '../src/Util'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { backgroundCorner, avtar, FontBold, FontRegular, Background } from '../Constant/index'
class Personal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            Email: '',
            Place: '',
            Mobile: '',
        };
    }

    componentDidMount() {
        this.setState({
            firstName: global.firstName,
            lastName: global.lastName,
            Email: global.UserEmail,
            Place: global.Place,
            Mobile: global.UserMobile,
        })
        console.log('global', global.UserProfile)
    }

    next = () => {
        this.props.navigation.navigate('JobVideoResume');
    }
    profile = () => {
        this.props.navigation.navigate('JobSeekerPhoto');
    }
    render() {
        const {firstName, lastName, Email, Place, Mobile} = this.state;
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
                        <ImageBackground style={styles.AvtarView} source={backgroundCorner} resizeMode={'contain'}>
                        <TouchableWithoutFeedback onPress={this.profile}>
                        <Image source={{
                uri: global.UserProfile
            }} style={{
                height: wp('29'),
                width: wp('29'),

            // backgroundColor: "transparent"
            }} resizeMode={'cover'}/></TouchableWithoutFeedback></ImageBackground>
                        <View style={styles.PersonalInfo}>
                            <ScrollView style={{
                alignSelf: "stretch",
                height: hp(30)
            }}>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>First Name</Text></View>
                                <View style={styles.PersonalInfoEnd}>
                                <CustomInput textAlign={'right'} value = {firstName} textChange = {(text) => this.setState({
                firstName: text
            }, () => {
                global.firstName = firstName
            })} containerStyle={styles.PersonalCompanyTextInput} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            /></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Last Name</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput  textAlign={'right'} value = {lastName} textChange = {(text) => this.setState({
                lastName: text
            }, () => {
                global.lastName = lastName
            })} containerStyle={[styles.PersonalCompanyTextInput, {
                width: wp(43)
            }]} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            /></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Email</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput  textAlign={'right'} value = {Email} textChange = {(text) => this.setState({
                Email: text
            }, () => {
                global.UserEmail = Email
            })} containerStyle={[styles.PersonalCompanyTextInput, {
                width: wp(60)
            }]} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            /></View></View>
                            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Place</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput textAlign={'right'} value = {Place} textChange = {(text) => this.setState({
                Place: text
            }, () => {
                global.Place = Place
            })} containerStyle={styles.PersonalCompanyTextInput} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            /></View></View>
            <View style={styles.PersonalInfoRow}>
                                <View style={styles.PersonalInfoStart}><Text style={[styles.PersonalInfoText, {
                fontFamily: FontBold,
                fontSize: scale(18),

            }]}>Mobile Number</Text></View>
                                <View style={styles.PersonalInfoEnd}><CustomInput textAlign={'right'} value = {Mobile} textChange = {(text) => this.setState({
                Mobile: text
            }, () => {
                global.UserMobile = Mobile
            })} containerStyle={[styles.PersonalCompanyTextInput, {
                width: wp(48)
            }]} inputContainerStyle={styles.PersonalCompanystyleInput}
            inputStyle={[styles.PersonalInfoText, {
                fontFamily: FontRegular,
                fontWeight: '700',
                fontSize: scale(16)
            }]}
            keyboardType={'phone-pad'}
            /></View></View>
                        </ScrollView>
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