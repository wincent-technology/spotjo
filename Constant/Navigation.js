import Splash from '../src/Splash';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChooseTalent from '../src/ChooseTalent';
import TalentScreen from '../src/TalentScreen';
import FavoriteLocation from '../src/FavoriteLocation';
import MainScreen from '../src/MainScreen';
import JobList from '../src/JobList';
import FavoriteCompany from '../src/FavoriteCompany';
import Filter from '../src/Filter';
import CompanyProfile from '../src/CompanyProfile';
import ScreenMap from '../src/ScreenMap';
import LoginFirst from '../src/LoginFirst';
import VideoPlayer from '../src/VideoPlayer'

import CompanyLogin from '../Company/Login';
import LoginWithEmail from '../Company/LoginWithEmail';
import EmailSend from '../Company/EmailSend';
import ForgatPass from '../Company/ForgatPass';
import CompanyEditProfile from '../Company/CompanyEditProfile'
import VideoResume from '../Company/VideoResume'
import PersonalCompany from '../Company/PersonalCompany'
import NoAccount from '../Company/NoAccount'
import Signup from '../Company/Signup'
import Companylogo from '../Company/Companylogo'
import JobListCompany from '../Company/JobListCompany'
import UserProfile from '../Company/UserProfile'
import AdminDashboard from '../Company/AdminDashboard'
import PostedJobList from '../Company/PostedJobList'
import CreateJob from '../Company/CreateJob'
import JobPreference from '../Company/JobPreference'

import JobLogin from '../JobSeeker/Login';
import JobLoginWithEmail from '../JobSeeker/LoginWithEmail';
import JobEmailSend from '../JobSeeker/EmailSend';
import JobForgatPass from '../JobSeeker/ForgatPass';
import JobEditProfile from '../JobSeeker/JobEditProfile';
import JobVideoResume from '../JobSeeker/JobVideoResume';
import Personal from '../JobSeeker/Personal';
import EditWorkExperience from '../JobSeeker/EditWorkExperience';
import JobSignup from '../JobSeeker/JobSignup';
import JobNoAccount from '../JobSeeker/JobNoAccount';
import JobSeekerPhoto from '../JobSeeker/JobSeekerPhoto'
import MyProfile from '../JobSeeker/MyProfile';
import JobSeekerlist from '../JobSeeker/JobSeekerlist';
import JobCompanyProfile from '../JobSeeker/JobCompanyProfile';
import AddSkilJob from '../JobSeeker/AddSkilJob'
import EditEducation from '../JobSeeker/EditEducation'
import BasicInfoOfCompany from '../JobSeeker/BasicInfoOfCompany'
import JobDescription from '../JobSeeker/JobDescription';
import JobAboutCompany from '../JobSeeker/JobAboutCompany'

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { library, leftVid } from '../src/IconManager';
import { themeColor, themeWhite } from './index';
import React, { Component } from 'react';
import { Image } from 'react-native';

const TabScreen = createBottomTabNavigator({
    Home: {
        screen: JobList,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/homeTab.png')} />),
        },
    },
    CompanyProfile: {
        screen: CompanyProfile,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/userTab.png')} />),
        },
    },
    Filter: {
        screen: Filter,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/settingTab.png')} />),
        },
    },
    ScreenMap: {
        screen: ScreenMap,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            resizeMode={'contain'}
            source={require('../Img/CommentTab.png')} />),
        },
    },
}, {
    shifting: true,
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'Home',
    order: ['Home', 'CompanyProfile', 'Filter', 'ScreenMap'],
    tabBarPosition: 'bottom',
    lazy: false,
    tabBarOptions: {
        keyboardHidesTabBar: true,
        tabBarBadge: 3,
        activeTintColor: themeWhite,
        inactiveTintColor: themeWhite,
        showIcon: true,
        showLabel: false,
        pressColor: 'rgba(100,65,165,0.5)',
        style: {
            // height: 50,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 1,
            bottom: 0,
            right: 1,
            // width: '98%',
            alignItems: "center",
            // borderTopLeftRadius: 15,
            // borderRadius: 8,
            // borderTopWidth: 1.5,
            borderTopColor: 'transparent',
            // borderRightColor: themeWhite,
            // borderLeftColor: themeWhite,

        },
        activeTabStyle: {
            borderColor: themeWhite,
        },
        indicatorStyle: {
            backgroundColor: 'transparent',
        },
    },
},);


const Join = createStackNavigator({
    JobEditProfile: JobEditProfile,
    EditWorkExperience: EditWorkExperience,
    AddSkilJob: AddSkilJob,
    EditEducation: EditEducation
}, {
    headerMode: 'none',
    initialRouteName: 'JobEditProfile',
},)

const jobli = createStackNavigator({
    JobSeekerlist: JobSeekerlist,
    JobCompanyProfile: JobCompanyProfile,
    BasicInfoOfCompany: BasicInfoOfCompany,
    JobDescription: JobDescription,
    JobAboutCompany: JobAboutCompany,


}, {
    headerMode: 'none',
    initialRouteName: 'JobSeekerlist',
},)

const TabScreenJob = createBottomTabNavigator({
    jobli: {
        screen: jobli,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/homeTab.png')} />),
        },
    },
    MyProfile: {
        screen: MyProfile,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/userTab.png')} />),
        },
    },
    Join: {
        screen: Join,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/settingTab.png')} />),
        },
    },
    ScreenMap: {
        screen: ScreenMap,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            resizeMode={'contain'}
            source={require('../Img/CommentTab.png')} />),
        },
    },

}, {
    shifting: true,
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'Join',
    order: ['jobli', 'MyProfile', 'Join', 'ScreenMap',],
    tabBarPosition: 'bottom',
    lazy: false,
    tabBarOptions: {
        keyboardHidesTabBar: true,
        tabBarBadge: 3,
        activeTintColor: themeWhite,
        inactiveTintColor: themeWhite,
        showIcon: true,
        showLabel: false,
        pressColor: 'rgba(100,65,165,0.5)',
        style: {
            // height: 50,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 1,
            bottom: 0,
            right: 1,
            // width: '98%',
            alignItems: "center",
            borderTopColor: 'transparent',

            // borderTopLeftRadius: 15,
            // borderRadius: 8,
            // borderTopWidth: 1.5,
            // borderTopColor: themeWhite,
            // borderRightColor: themeWhite,
            // borderLeftColor: themeWhite,

        },
        activeTabStyle: {
            borderColor: themeWhite,
        },
        indicatorStyle: {
            backgroundColor: 'transparent',
        },
    },
},);

const ComAd = createStackNavigator({
    AdminDashboard: AdminDashboard,
    PostedJobList: PostedJobList,
    JobListCompany: JobListCompany,
    CreateJob: CreateJob,
}, {
    headerMode: 'none',
    initialRouteName: 'AdminDashboard',
},)

const TabScreenCompany = createBottomTabNavigator({
    Home: {
        screen: ComAd,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/homeTab.png')} />),
        },
    },
    UserProfile: {
        screen: UserProfile,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/userTab.png')} />),
        },
    },
    Filter: {
        screen: CompanyEditProfile,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            source={require('../Img/settingTab.png')} />),
        },
    },
    ScreenMap: {
        screen: ScreenMap,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 28
            }}
            resizeMode={'contain'}
            source={require('../Img/CommentTab.png')} />),
        },
    },
}, {
    shifting: true,
    swipeEnabled: true,
    animationEnabled: true,
    initialRouteName: 'Filter',
    order: ['Home', 'UserProfile', 'Filter', 'ScreenMap'],
    tabBarPosition: 'bottom',
    lazy: false,
    tabBarOptions: {
        keyboardHidesTabBar: true,
        tabBarBadge: 3,
        activeTintColor: themeWhite,
        inactiveTintColor: themeWhite,
        showIcon: true,
        showLabel: false,
        pressColor: 'rgba(100,65,165,0.5)',
        style: {
            // height: 50,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 1,
            bottom: 0,
            right: 1,
            // width: '98%',
            alignItems: "center",
            borderTopColor: 'transparent',

            // borderTopLeftRadius: 15,
            // borderRadius: 8,
            // borderTopWidth: 1.5,
            // borderTopColor: themeWhite,
            // borderRightColor: themeWhite,
            // borderLeftColor: themeWhite,

        },
        activeTabStyle: {
            borderColor: themeWhite,
        },
        indicatorStyle: {
            backgroundColor: 'transparent',
        },
    },
},);



const WelcomeStack = createStackNavigator({
    Splash: Splash,
}, {
    initialRouteName: 'Splash',
    headerMode: 'none',
},);

const AppNavigator = createStackNavigator({
    TabScreen: TabScreen,
    TabScreenJob: TabScreenJob,
    TabScreenCompany: TabScreenCompany,
    FavoriteCompany: FavoriteCompany,
    TalentScreen: TalentScreen,
    MainScreen: MainScreen,
    FavoriteLocation: FavoriteLocation,
    ChooseTalent: ChooseTalent,
    CompanyProfile: CompanyProfile,
    ScreenMap: ScreenMap,
    CompanyLogin: CompanyLogin,
    LoginFirst: LoginFirst,
    LoginWithEmail: LoginWithEmail,
    ForgatPass: ForgatPass,
    EmailSend: EmailSend,
    JobLogin: JobLogin,
    JobLoginWithEmail: JobLoginWithEmail,
    JobEmailSend: JobEmailSend,
    JobForgatPass: JobForgatPass,
    JobEditProfile: JobEditProfile,
    CompanyEditProfile: CompanyEditProfile,
    VideoResume: VideoResume,
    JobVideoResume: JobVideoResume,
    Personal: Personal,
    PersonalCompany: PersonalCompany,
    EditWorkExperience: EditWorkExperience,
    NoAccount: NoAccount,
    Signup: Signup,
    JobSignup: JobSignup,
    JobNoAccount: JobNoAccount,
    Companylogo: Companylogo,
    JobSeekerPhoto: JobSeekerPhoto,
    MyProfile: MyProfile,
    VideoPlayer: VideoPlayer

}, {
    headerMode: 'none',
    animationEnabled: true,
    tabBarVisible: false,
    initialRouteName: 'MainScreen',
},);

const App = createSwitchNavigator({
    Welcome: {
        screen: WelcomeStack,
    },
    Home: {
        screen: AppNavigator,
    },
});

const Routes = createAppContainer(App);

export default Routes;