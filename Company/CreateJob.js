import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE, overlayimage, rightWrongBack, rite, FontBold } from '../Constant/index'
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
import PreviewJob from './PreviewJob'
import Swiper from 'react-native-swiper';
import http from '../api'
import SnackBar from '../Component/SnackBar'

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
        this.props.navigation.goBack()
    }
    DisplaySnackBar = (msg) => {
        this.refs.ReactNativeSnackBar.ShowSnackBarFunction(msg);
    };
    Exit = () => {
        this.props.navigation.navigate('AdminDashboard');
    }
    next = () => {
        this.setState({
            index: this.state.index + 1
        })
    }
    callApi = () => {
        console.log('total Api call',
            global.Job_Title,
            global.Company,
            global.Anywhere,
            global.salary,
            global.Job_Location,
            global.FullTime,
            global.PartTime,
            global.Employed,
            global.Internship,
            global.StudentJobs,
            global.HelpingVacancies,
            global.Freelancer,
            new Date(Date.now()).toLocaleDateString(),
            Date.now(),
            global.City,
            global.Language,
            global.Task_Description,
            global.addSkill,
            global.Education,
            global.LanguageSkill);
        try {
            http.POST('api/appjob/add', {
                Job_title: global.Job_Title,
                Company: global.Company,
                Anywhere: global.Anywhere || false,
                Salary: Math.round(global.salary),
                salRating: global.salaryrating,
                Job_Location: global.Job_Location || global.City,
                FullTime: global.FullTime,
                PartTime: global.PartTime,
                Employed: global.Employed,
                Internship: global.Internship,
                StudentJobs: global.StudentJobs,
                HelpingVacancies: global.HelpingVacancies,
                Freelancer: global.Freelancer,
                Start_date: new Date(Date.now()).toLocaleDateString() || global.Start_date,
                End_date: new Date(Date.now()).toLocaleDateString() || global.Start_date,
                City: global.City,
                Language: global.Language,
                Task_Description: global.Task_Description,
                Skill: global.addSkill,
                Education: global.Education,
                LanguageSkill: global.LanguageSkill
            }).then((res) => {
                if (res['data']['status']) {
                    console.log('rrrrrrrrr', res['data']['result']);
                    this.callPostedJob();

                } else {
                    this.DisplaySnackBar(res['data']['message'])

                }
            }, err => alert(JSON.stringify(err)));
        } catch ( error ) {
            this.DisplaySnackBar(error)

        }
    }

    callPostedJob = () => {
        try {
            http.GET('api/job/get').then((res) => {
                if (res['data']['status']) {
                    console.log(">>>>>>>>>>>>", JSON.stringify(res['data']['result'][3]['description']));
                // var arr = [];
                // let i = res['data']['result'][3]['description']
                // arr = i.split("\n");
                // console.log("<<<", i.split("\n"));
                // for (var j = 0; j < arr.length; j++)
                //     console.log(">>", arr[j]);
                } else {
                    console.log('res', res);
                    alert(res[0]['data']['message']['message']);
                }
            }, err => alert(JSON.stringify(err)));
        } catch ( error ) {
            console.log("error while register" + error);
        }
    }
    componentDidMount() {
        this.callPostedJob();

    }
    render() {
        const {index} = this.state;
        return (
            <View style={styles.backGround}>
                <StatusBar hidden={true} />
            <SnackBar ref="ReactNativeSnackBar"/>
                <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                    <NavigationHead centerComponent={this.state.index != 4 ? 'Create Job' : 'Preview Job'} rightComponent='Exit' onPress={() => this.Back()} onExit={() => this.Exit()} />
                    <View style={{
                height: hp(100) - hp(5),
                width: wp(96),
                marginHorizontal: wp(2),
                top: hp(4)
            }}>
                    <Swiper
            dotColor={themeWhite}
            index={index}
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
            <View><PreviewJob/></View>
            </Swiper>
                     <View style={{
                flexDirection: "row",
                width: wp(100),
                top: hp(76) - hp(5),
                position: "absolute",
                zIndex: 999
            }}>
            <View style={{
                alignItems: "flex-start",
                justifyContent: "center",
                width: wp(20),
                marginLeft: wp(10)
            }}>
            <TouchableWithoutFeedback style={styles.Size} onPress={this.back}><View  style={styles.Size}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Back</Text></View></TouchableWithoutFeedback>
            </View>
            <View style={{
                alignItems: 'flex-end',
                // right: wp(7),
                width: wp(55)
            }}><TouchableWithoutFeedback style={styles.Size} onPress={this.next}><View  style={[styles.Size, {
                alignItems: 'flex-end'
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableWithoutFeedback></View>
            </View>
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
            {this.state.index != 4 ? (<View style={{
                flexDirection: "row",
                height: hp(6),
                width: wp(103),
                justifyContent: "center",
                alignItems: "center"
            }}><TouchableWithoutFeedback><Text style={{
                fontSize: scale(17),
                color: this.state.index == 0 ? themeColor : '#000',
                textDecorationLine: this.state.index == 0 ? 'underline' : 'none'
            }}>Type {'>'}</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><Text style={{
                fontSize: scale(17),
                color: this.state.index == 1 ? themeColor : '#000',
                textDecorationLine: this.state.index == 1 ? 'underline' : 'none'
            }}>Preferences {'>'}</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><Text style={{
                fontSize: scale(17),
                color: this.state.index == 2 ? themeColor : '#000'
            }}>Description {'>'}</Text></TouchableWithoutFeedback>
            <TouchableWithoutFeedback><Text style={{
                fontSize: scale(17),
                color: this.state.index == 3 ? themeColor : '#000'
            }}>Criteria</Text></TouchableWithoutFeedback></View>) : (
                <View style={{
                    height: hp(6),
                    width: wp(103),
                    justifyContent: "center",
                    alignItems: "center"
                }}><TouchableWithoutFeedback onPress={this.callApi}>
                    <View style={{
                    flexDirection: "row"
                }}><Image source={rite} style={{
                    height: scale(30),
                    width: scale(30),
                    marginRight: scale(5)
                }} resizeMode={'contain'} /><Text style={{
                    fontSize: scale(22),
                    fontFamily: FontBold,
                    color: themeColor
                }}>Go Live</Text></View></TouchableWithoutFeedback></View>)}
            </ImageBackground></View>
                </ImageBackground>
            </View>
        )
    }
}
;

export default withNavigationFocus(CreateJob);