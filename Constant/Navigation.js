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

const TabScreenJob = createBottomTabNavigator({
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
        screen: Personal,
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
        screen: JobEditProfile,
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
    order: ['Home', 'CompanyProfile', 'Filter', 'ScreenMap'],
    tabBarPosition: 'bottom',
    lazy: false,
    tabBarOptions: {
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

const TabScreenCompany = createBottomTabNavigator({
    Home: {
        screen: JobList,
        navigationOptions: {
            tabBarColor: 'transparent',
            tabBarIcon: (<Image style={{
                width: 28,
                height: 30
            }}
            source={require('../Img/homeTab.png')} />),
        },
    },
    CompanyProfile: {
        screen: PersonalCompany,
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
    order: ['Home', 'CompanyProfile', 'Filter', 'ScreenMap'],
    tabBarPosition: 'bottom',
    lazy: false,
    tabBarOptions: {
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
    JobSeekerPhoto: JobSeekerPhoto
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