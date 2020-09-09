import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE, overlayimage, rightWrongBack } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHead } from '../Component/ViewManager.js'
import ItemMV from '../src/ItemMV'
import DeviceInfo from 'react-native-device-info';
import JobBasicType from './JobBasicType';
import JobPreference from './JobPreference';
import JobTaskDescription from './JobTaskDescription'
import JobHiddenCritearia from './JobHiddenCritearia';
import Swiper from 'react-native-swiper';
// import PostedJobList from './PostedJobList';
// import styles from './Style'

class CreateJob extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            Type: true,
            flagInterView: false,
            flagMatches: false,
            index: 0
        };
    }

    Back = () => {
        this.props.navigation.navigate('ChooseTalent')
    }

    // renderPage = () => {
    //     const {flagPosted, flagInterView, flagMatches} = this.state;
    //     if (flagPosted)
    //         return <JobBasicType />
    //     else if (flagInterView)
    //         return <JobPreference />
    //     else if (flagMatches)
    //         return <TaskDescription />

    // }
    render() {
        console.warn(">>", DeviceInfo.hasNotch())

        return (
            <View style={styles.backGround}>
                <StatusBar hidden={true} />
                <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                    <NavigationHead centerComponent='Create Job' rightComponent='Exit' onPress={() => this.Back()} onExit={() => this.Exit()} />
                    <View style={{
                height: hp(100) - hp(5),
                width: wp(96),
                marginHorizontal: wp(2),
                top: hp(4)
            }}>
                    <Swiper onIndexChanged ={(index) => this.setState({
                changedindex: index == 0 ? 0 : 1
            })}
            dotColor={themeWhite}
            index={0}
            onIndexChanged={(index) => this.setState({
                index: index
            })}
            paginationStyle={{
                top: hp(-95),
                position: "absolute",
            }}>
                    <View><JobBasicType /></View>
                    <View><JobPreference /></View>
                    <View><JobTaskDescription/></View>
                    <View><JobHiddenCritearia/></View>

                    </Swiper>
                    </View>

                    <View>
                    
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
                 </View>
                 <View style={{
                bottom: scale(46) + hp(6),
                height: hp(6),
                width: wp(105),
                left: wp(-2)
            }}>
            <ImageBackground source={rightWrongBack} style={styles.imageStyle} resizeMode={'stretch'}>
            <View style={{
                flexDirection: "row",
                height: hp(6),
                width: wp(103),
                justifyContent: "center",
                alignItems: "center"
            }}><TouchableWithoutFeedback><Text style={{
                fontSize: scale(17),
                color: this.state.index == 0 ? themeColor : '#000',
                textDecorationLine: this.state.index == 0 ? 'underline' : ''
            }}>Type {'>'}</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><Text style={{
                fontSize: scale(17),
                color: this.state.index == 1 ? themeColor : '#000',
                textDecorationLine: this.state.index == 1 ? 'underline' : ''
            }}>Preferences {'>'}</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><Text style={{
                fontSize: scale(17),
                color: this.state.index == 2 ? themeColor : '#000'
            }}>Description {'>'}</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><Text style={{
                fontSize: scale(17),
                color: this.state.index == 3 ? themeColor : '#000'
            }}>Criteria</Text></TouchableWithoutFeedback></View>
            </ImageBackground></View>
                </ImageBackground>
            </View>
        )
    }
}
;

export default withNavigationFocus(CreateJob);