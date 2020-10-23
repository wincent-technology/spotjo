import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Text,
    Image,
    ScrollView,
    View
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
import {
    left,
} from '../src/IconManager';
import {
    scale
} from '../src/Util'
import {
    TRANLINE,
    themeColor,
    themeWhite,
    Background,
    Dashboard,
    skill,
    blanks,
    Fulls,
    workExp,
    education,
    personalInfo,
    jobType,
    languages,
    qualification
} from '../Constant/index'
import {
    StarRating,
    NavigationHead
} from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';



class JobEditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    Back = () => {
        // console.log("hi");
        this.props.navigation.goBack()
    }
    Video = () => {
        if (global.Video)
            this.props.navigation.navigate('VideoPlayer', {
                vid: global.Video
            })
        else
            alert('video coming soon'); // this.props.navigation.navigate('JobVideoResume');
    }
    Personal = () => {
        this.props.navigation.navigate('Personal');
    }
    Work = () => {
        this.props.navigation.navigate('EditWorkExperience');
    }
    addskills = () => {
        this.props.navigation.navigate('AddSkilJob');

    }

    addEducation = () => {
        this.props.navigation.navigate('EditEducation');
    }
    Dashboard = () => {
        console.log('hi');
        this.props.navigation.navigate('UserAd')
    }
    render() {
        const {
            Hourly,
            Monthly,
            Yearly
        } = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={
            'stretch'
            } >
                <StatusBar hidden={true} />
            <NavigationHead centerComponent='Edit Profile' onPress={() => this.Back()}/>
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
            >
                                <View style={styles.JobEditProfileHead}><View style={styles.VideoIconSize} onStartShouldSetResponder={this.Video}><Image source={require('../Img/VIDEO.png')} resizeMode={'contain'} style={styles.VideoIconSize} /></View></View>
                                <View style={[styles.JobEditProfileResumeVideo, {
                marginTop: scale(-10),
                right: scale(5)
            }]}><Text style={{
                fontSize: scale(13),
                fontWeight: "bold",
                fontFamily: "Roboto-Bold"
            }}>Video Resume</Text></View>
                                <View style={[{
                marginTop: scale(5)
            }, styles.JobEditProfileResumeVideo]}>
            <StarRating
            emptyStar={blanks}
            fullStar={Fulls}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            disabled={false}
            maxStars={5}
            starSize={scale(22)}
            rating={5}
            // selectedStar={(rating) => this.handleChange(rating, index)}
            fullStarColor={'orange'}
            /></View>
                            </ImageBackground>
                        </View>
            <ScrollView style={styles.FilterScroll}>
                        <View style={{
                flexDirection: 'column',
                marginTop: scale(-1)
            }}><CustomButton title={'Dashboard'}
            iconName={Dashboard}
            onPress={() => this.Dashboard()}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            /><CustomButton title={'Skills'}
            iconName={skill}
            onPress={() => this.addskills()}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            /><CustomButton title={'Work Experience'}
            iconName={workExp}
            onPress={this.Work}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            /><CustomButton title={'Education'}
            iconName={education}
            onPress={() => this.addEducation()}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            /><CustomButton title={'Personal Information'}
            iconName={jobType}
            onPress={this.Personal}
            containerStyle={styles.buttonContainerStyle}
            buttonStyle={styles.ButtonStyle}
            titleStyle={styles.titleStyle}
            style={{
                color: 'blue'
            }}
            /></View></ScrollView>
                    </ImageBackground></View>
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

export default withNavigationFocus(JobEditProfile);