import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView, ImageBackground, TouchableWithoutFeedback, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { scale, getStatusBarHeight } from '../src/Util'
import { TRANLINE, themeColor, themeWhite, IC_ARR_UP, IC_ARR_DOWN, Background, Dashboard, company, jobType, education, } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import Slider from '@react-native-community/slider';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, CheckBox, DropDownItem, Rating, NavigationHead } from '../Component/ViewManager'
import CustomButton from '../Component/Button'
// import { Rating } from '../Component/ViewManager'

class CompanyEditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    Back = () => {
        // console.log("hi");
        this.props.navigation.goBack()
    }
    Video = () => {
        if (global.Video)
            this.props.navigation.navigate('VideoPlayer')
        else
            alert('video coming soon');
    // this.props.navigation.navigate('VideoResume');
    }
    Personal = () => {
        this.props.navigation.navigate('PersonalCompany');
    }

    render() {
        const {Hourly, Monthly, Yearly} = this.state
        return (
            <SafeAreaView style={styles.backGround}>
                <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={
            'stretch'
            }>
                    <StatusBar hidden={true} />
                    <NavigationHead centerComponent='Edit Company Profile' onPress={() => this.Back()} />
                    <View style={styles.FilterMainView}>
                        <ImageBackground style={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 50 + hp(5)),
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
                            <View style={styles.JobEditProfileMainView}>
                                <ImageBackground
            source={require('../Img/TRANSBACK.png')}
            style={{
                height: '100%',
                width: '100%',
            }}
            resizeMode={"stretch"}
            ><View style={styles.JobEditProfileHead}><View style={styles.VideoIconSize} onStartShouldSetResponder={this.Video}><Image source={require('../Img/VIDEO.png')} resizeMode={'contain'} style={styles.VideoIconSize} /></View></View>
                                    <View style={[styles.JobEditProfileResumeVideo, {
                marginTop: scale(-10)
            }]}><Text style={{
                fontSize: scale(13),
                fontWeight: "bold"
            }}>Company Video</Text></View>
                                    <View style={[{
                marginTop: scale(10)
            }, styles.JobEditProfileResumeVideo]}><Rating
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
                                </ImageBackground></View>
                            <View style={{
                flexDirection: 'column'
            }}><CustomButton title={'Dashboard'}
            iconName={Dashboard}
            onPress={this.Dashboard}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            /><CustomButton title={'Company Information'}
            iconName={education}
            onPress={this.Personal}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            /><CustomButton title={'Company Services'}
            iconName={company}
            onPress={() => this.Back}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            /><CustomButton title={'User Management'}
            iconName={jobType}
            onPress={() => this.Back}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            />
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.TranLingImage}>
                        <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
                </ImageBackground></SafeAreaView>
        )
    }
}

export default withNavigationFocus(CompanyEditProfile);