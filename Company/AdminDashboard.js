import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE, overlayimage } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHead } from '../Component/ViewManager.js'
import ItemMV from '../src/ItemMV'
import DeviceInfo from 'react-native-device-info';
import JobListCompany from './JobListCompany';
import JobMatches from './JobMatches';
import PostedJobList from './PostedJobList';
// import styles from './Style'
var c = 0;
const data = [{
    Header: 'JAVA DEVELOPER(M/W)',
    image: 'https://turbologo.com/articles/wp-content/uploads/2019/11/Porsche-logo-cover-1280x720.jpg',
    ComPany_Name: 'Porsche AG',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com'
}, {
    Header: 'Senior Java Devloper',
    image: 'https://cdn.vox-cdn.com/thumbor/2eZPJ-j9zXm5AIro7TIiEBCgNoc=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/assets/3218223/google.jpg',
    ComPany_Name: 'Google',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com'
}, {
    Header: 'JAVA DEVELOPER / J2EE',
    image: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png',
    ComPany_Name: 'Amazon',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com'
}, {
    Header: 'JAVA DEVELOPER(M/W)',
    image: 'https://di-uploads-pod3.dealerinspire.com/porscheoffremont/uploads/2018/09/porsche-logo.jpg',
    ComPany_Name: 'Porsche AG',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com'
},];

global.item = data[0];

class AdminDashboard extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            flagPosted: true,
            flagInterView: false,
            flagMatches: false
        };
    }

    Filter = () => {
        this.props.navigation.navigate('Filter')
    }

    push = (item) => {
        console.log("heelo", item);
        global.item = item;
        this.props.navigation.navigate('CompanyProfile')
    }
    Back = () => {
        this.props.navigation.navigate('ChooseTalent')
    }
    PostedJob = () => {
        this.setState({
            flagPosted: true,
            flagInterView: false,
            flagMatches: false

        })
    }
    Interviews = () => {
        this.setState({
            flagInterView: true,
            flagPosted: false,
            flagMatches: false

        })
    }
    Matches = () => {
        this.setState({
            flagMatches: true,
            flagInterView: false,
            flagPosted: false,

        })
    }
    renderPage = () => {
        const {flagPosted, flagInterView, flagMatches} = this.state;
        if (flagPosted)
            return <PostedJobList />
        else if (flagInterView)
            return <JobListCompany />
        else if (flagMatches)
            return <JobMatches />
    }
    render() {
        console.warn(">>", DeviceInfo.hasNotch())

        return (
            <View style={styles.backGround}>
                <StatusBar hidden={true} />
                <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                    <NavigationHead centerComponent='Admin Dashboard' rightComponent='Exit' onPress={() => this.Back()} onExit={() => this.Exit()} />
                    <View style={{
                borderTopColor: 'gray',
                marginTop: scale(2),
                borderTopWidth: scale(2),
                borderBottomWidth: scale(2),
                borderBottomColor: 'gray',
                flexDirection: 'row',
                width: wp('100%'),
                backgroundColor: themeWhite,
                height: scale(40),
                alignItems: 'center',
                elevation: 8,
            }}>
                        <TouchableWithoutFeedback onPress={this.PostedJob}><View style={{
                alignItems: 'center',
                width: wp(97) / 3,
                height: scale(40),
                marginLeft: wp(3),
                justifyContent: "center"
            }}><ImageBackground source={overlayimage} style={{
                height: '100%',
                width: '100%',
                position: "absolute",
                opacity: this.state.flagPosted ? 1 : 0
            }} resizeMode={'contain'} /><Text style={{
                fontSize: scale(20),
                fontFamily: 'Roboto-Regular'
            }}>Posted Jobs</Text></View></TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.Interviews}><View style={{
                alignItems: 'center',
                width: wp(95) / 3,
                height: scale(40),
                justifyContent: "center",
                marginHorizontal: wp(1)
            }}><ImageBackground source={overlayimage} style={{
                height: '100%',
                width: '100%',
                position: "absolute",
                opacity: this.state.flagInterView ? 1 : 0

            }} resizeMode={'contain'} /><Text style={{
                fontSize: scale(20),
                fontFamily: 'Roboto-Regular'
            }}>Interviews</Text></View></TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.Matches}><View style={{
                alignItems: 'center',
                width: wp(85) / 3,
                height: scale(40),
                justifyContent: "center"
            }}><ImageBackground source={overlayimage} style={{
                height: '100%',
                width: '100%',
                position: "absolute",
                opacity: this.state.flagMatches ? 1 : 0

            }} resizeMode={'contain'} /><Text style={{
                fontSize: scale(20),
                fontFamily: 'Roboto-Regular'
            }}>Matches</Text></View></TouchableWithoutFeedback>
                    </View>
                    <View style={{
                height: hp(100) - (hp(11) + scale(95))
            }}>{this.renderPage()}</View>
                    <View style={styles.TranLingImage}>
                        <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
                </ImageBackground>
            </View>
        )
    }
}
;

export default withNavigationFocus(AdminDashboard);