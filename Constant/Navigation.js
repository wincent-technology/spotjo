import Splash from '../src/Splash';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import {
  createStackNavigator
} from 'react-navigation-stack';
import ChooseTalent from '../src/ChooseTalent';
import TalentScreen from '../src/TalentScreen';
import FavoriteLocation from '../src/FavoriteLocation';
import MainScreen from '../src/MainScreen';
import JobList from '../src/JobList';
import FavoriteCompany from '../src/FavoriteCompany';
import Filter from '../src/Filter';
import CompanyProfile from '../src/CompanyProfile';
import CompanyProfiles from '../src/CompanyProfiles';

import ScreenMap from '../src/ScreenMap';
import LoginFirst from '../src/LoginFirst';
import VideoPlayer from '../src/VideoPlayer';
import Youtube from '../src/Youtube';

import CompanyLogin from '../Company/Login';
import LoginWithEmail from '../Company/LoginWithEmail';
import EmailSend from '../Company/EmailSend';
import ForgatPass from '../Company/ForgatPass';
import CompanyEditProfiles from '../Company/CompanyEditProfile';
import VideoResume from '../Company/VideoResume';
import PersonalCompany from '../Company/PersonalCompany';
import NoAccount from '../Company/NoAccount';
import Signup from '../Company/Signup';
import Companylogo from '../Company/Companylogo';
import JobListCompany from '../Company/JobListCompany';
import UserProfile from '../Company/UserProfile';
import AdminDashboard from '../Company/AdminDashboard';
import PostedJobList from '../Company/PostedJobList';
import CreateJob from '../Company/CreateJob';
import JobPreference from '../Company/JobPreference';
import TalentCom from '../Company/TalentCom';
import LocationCom from '../Company/LocationCom';
import ChooseTalentCom from '../Company/ChooseTalentCom';
import FirstJobList from '../Company/FirstJobList';
import UserPro from '../Company/UserPro';
import UserPros from '../Company/UserPro';

import PostedJobUser from '../Company/PostedJobUser'
import FilterUser from '../Company/FilterUser';
import UserScreenMap from '../Company/UserScreenMap';
import CompanyService from '../Company/CompanyService';
import UserManagement from '../Company/UserManagement';
import UserCreation from '../Company/UserCreation';
import UserEdit from '../Company/UserEdit';
import ShaduleInterView from '../Company/ShaduleInteview'
import Chat from '../Company/Chat'

import ChatsJob from '../JobSeeker/Chats'
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
import JobSeekerPhoto from '../JobSeeker/JobSeekerPhoto';
import MyProfile from '../JobSeeker/MyProfile';
import JobSeekerlist from '../JobSeeker/JobSeekerlist';
import JobCompanyProfile from '../JobSeeker/JobCompanyProfile';
import AddSkilJob from '../JobSeeker/AddSkilJob';
import EditEducation from '../JobSeeker/EditEducation';
import BasicInfoOfCompany from '../JobSeeker/BasicInfoOfCompany';
import JobDescription from '../JobSeeker/JobDescription';
import JobAboutCompany from '../JobSeeker/JobAboutCompany';
import AdminDashboardJ from '../JobSeeker/AdminDashboard';
import PostedJobListJ from '../JobSeeker/PostedJobList';
import JobSeekerFilter from '../JobSeeker/FilterJS';
import JobSeekerMap from '../JobSeeker/ScreenMapJS';
import AddSalary from '../JobSeeker/AddSalary';
import JobTalentScreen from '../JobSeeker/JobTalentScreen';
import JobFavoriteLocation from '../JobSeeker/JobFavoriteLocation';
import JobFavoriteCompany from '../JobSeeker/JobFavoriteCompany';
import JobChooseTalent from '../JobSeeker/JobChooseTalent';
import OtpScreen from '../JobSeeker/OtpScreen';
import LinkedIn from '../src/LinkedIn'
import UserLinkedin from '../src/UserLinkedin';
import JobLocation from '../JobSeeker/JobLocation'
import ChatOne from '../Company/ChatOne'
import ChatOneJob from '../JobSeeker/ChatOneJob'
import Camera from '../Company/Camera'
import CameraRecord from '../JobSeeker/CameraRecord'
import Outlook from '../src/Outlook'
import {
  createBottomTabNavigator
} from 'react-navigation-tabs';
import {
  library,
  leftVid
} from '../src/IconManager';
import TabBarIcon from '../Component/TabBarIcon'
import {
  themeColor,
  themeWhite,
  actSet,
  actHome,
  actUser,
  actChat,
  Active,InActive
} from './index';
import React, {
  Component
} from 'react';
import {
  Image
} from 'react-native';
import {
  scale
} from '../src/Util';

const TabScreen = createBottomTabNavigator({
  Home: {
    screen: JobList,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Home : InActive.Home;
        return <TabBarIcon icon={image} />
        // return (
        //   <Image
        //       source={image}
        //       style={{width: scale(27), height: scale(27)}}
        //       resizeMode={'contain'}
        //     />
        // );
      },
    },
  },
  CompanyProfiles: {
    screen: CompanyProfiles,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.User : InActive.User;
        return <TabBarIcon icon={image} />
      },
    },
  },
  Filter: {
    screen: Filter,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Setting : InActive.Setting;
        return <TabBarIcon icon={image} />
      },
    },
  },
  ScreenMap: {
    screen: Filter,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Map : InActive.Map;
        return <TabBarIcon icon={image} />
      },
    },
  },
  CompanyProfile: {
    screen: CompanyProfile,
    navigationOptions: {
      tabBarButton: () => null,
      tabBarButtonComponent: () => null,
      tabBarLabel: () => null,
    },
  },
}, {
  shifting: true,
  swipeEnabled: true,
  animationEnabled: true,
  initialRouteName: 'Home',
  order: ['Home', 'CompanyProfiles', 'Filter', 'ScreenMap', 'CompanyProfile'],
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
      backgroundColor: 'white',
      position: 'absolute',
      left: 1,
      bottom: 0,
      right: 1,
      // width: '98%',
      alignItems: 'center',
      // borderTopLeftRadius: 15,
      // borderRadius: 8,
      borderTopWidth: 0.5,
      borderTopColor:'#000',
      // borderTopColor: 'transparent',
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
}, );

const Join = createStackNavigator({
  JobEditProfile: JobEditProfile,
  EditWorkExperience: EditWorkExperience,
  AddSkilJob: AddSkilJob,
  EditEducation: EditEducation,
  AddSalary:AddSalary
}, {
  headerMode: 'none',
  initialRouteName: 'JobEditProfile',
}, );

const jobli = createStackNavigator({
  JobSeekerlist: JobSeekerlist,
  JobCompanyProfile: JobCompanyProfile,
  BasicInfoOfCompany: BasicInfoOfCompany,
  JobDescription: JobDescription,
  JobAboutCompany: JobAboutCompany,
  JobSeekerFilter: JobSeekerFilter,
  // JobSeekerMap: JobSeekerMap,

}, {
  headerMode: 'none',
  initialRouteName: 'JobSeekerlist',
}, );

const UserAd = createStackNavigator({
  AdminDashboardJ: AdminDashboardJ,
  PostedJobListJ: PostedJobListJ,
}, {
  headerMode: 'none',
  initialRouteName: 'AdminDashboardJ',
}, );
const ChatsJobScreen = createStackNavigator({
  ChatsJob: ChatsJob,
  ChatOneJob: ChatOneJob,
}, {
  headerMode: 'none',
  initialRouteName: 'ChatsJob',
}, );

const TabScreenJob = createBottomTabNavigator({
  jobli: {
    screen: jobli,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Home : InActive.Home;
        return <TabBarIcon icon={image} />

      },
    },
  },
  MyProfile: {
    screen: MyProfile,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.User : InActive.User;
        return <TabBarIcon icon={image} />

      },
    },
  },
  Maps: {
    screen: JobSeekerMap,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Map : InActive.Map;
        return <TabBarIcon icon={image} />

      },
    },
  },
  Join: {
    screen: Join,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Setting : InActive.Setting;
        return <TabBarIcon icon={image} />

      },
    },
  },
  ScreenMap: {
    screen: ChatsJobScreen,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused,state,props
      }) => {
        const image = focused ? Active.Chat : InActive.Chat;
        return <TabBarIcon icon={image} />

      },
    },
  },
  UserAd: {
    screen: UserAd,
    navigationOptions: {
      tabBarButton: () => null,
      tabBarButtonComponent: () => null,
      tabBarLabel: () => null,
    },
  },
}, {
  shifting: true,
  swipeEnabled: true,
  animationEnabled: true,
  initialRouteName: 'Join',
  order: ['jobli', 'MyProfile', 'ScreenMap','Maps','Join', 'UserAd'],
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
      backgroundColor: themeWhite,
      position: 'absolute',
      left: 1,
      bottom: 0,
      right: 1,
      // width: '98%',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderTopColor:'#000',
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
}, );

const ComAd = createStackNavigator({
  FirstJobList: FirstJobList,
  UserPro: UserPro,
  FilterUser: FilterUser,
  // UserScreenMap: UserScreenMap,
  ShaduleInterView:ShaduleInterView
}, {
  headerMode: 'none',
  initialRouteName: 'FirstJobList',
}, );

const Admin = createStackNavigator({
  AdminDashboard: AdminDashboard,
  PostedJobList: PostedJobList,
  PostedJobUser: PostedJobUser,
  JobListCompany: JobListCompany,
  CreateJob: CreateJob,
  UserPros:UserPros
}, {
  headerMode: 'none',
  initialRouteName: 'AdminDashboard',
}, );

const CompanyEditProfile = createStackNavigator({
  CompanyEditProfile: CompanyEditProfiles,
  Admin:Admin
}, {
  headerMode: 'none',
  initialRouteName: 'CompanyEditProfile',
}, );


const CompanyServices = createStackNavigator({
  CompanyService: CompanyService,
}, {
  headerMode: 'none',
  initialRouteName: 'CompanyService',
}, );

const CompanyUser = createStackNavigator({
  UserManagement: UserManagement,
  UserCreation: UserCreation,
  UserEdit: UserEdit,
}, {
  headerMode: 'none',
  initialRouteName: 'UserManagement',
}, );

const Chats = createStackNavigator({
  Chat: Chat,
  ChatOne: ChatOne,
}, {
  headerMode: 'none',
  initialRouteName: 'Chat',
}, );



// FirstJobList?

const TabScreenCompany = createBottomTabNavigator({
  Home: {
    screen: ComAd,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Home : InActive.Home;
        return <TabBarIcon icon={image} />

      },
    },
  },
  UserProfile: {
    screen: UserProfile,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.User : InActive.User;
        return <TabBarIcon icon={image} />

      },
    },
  },
  ComEdit: {
    screen: CompanyEditProfile,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Setting : InActive.Setting;
        return <TabBarIcon icon={image} />

      },
    },
  },
  UserScreenMap: {
    screen: UserScreenMap,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Map : InActive.Map;
        return <TabBarIcon icon={image} />

      },
    },
  },
  ScreenMap: {
    screen: Chats,
    navigationOptions: {
      tabBarColor: 'transparent',
      tabBarIcon: ({
        focused
      }) => {
        const image = focused ? Active.Chat : InActive.Chat;
        return <TabBarIcon icon={image} />

      },
    },
  },
  Admin: {
    screen: Admin,
    navigationOptions: {
      tabBarButton: () => null,
      tabBarButtonComponent: () => null,
      tabBarLabel: () => null,
    },
  },
  CompanyServices: {
    screen: CompanyServices,
    navigationOptions: {
      tabBarButton: () => null,
      tabBarButtonComponent: () => null,
      tabBarLabel: () => null,
    },
  },
  CompanyUser: {
    screen: CompanyUser,
    navigationOptions: {
      tabBarButton: () => null,
      tabBarButtonComponent: () => null,
      tabBarLabel: () => null,
    },
  },
}, {
  shifting: true,
  swipeEnabled: true,
  animationEnabled: true,
  initialRouteName: 'Home',
  order: [
    'Home',
    'UserProfile',
    'ScreenMap',
    'UserScreenMap',
    'ComEdit',
    'Admin',
    'CompanyServices',
    'CompanyUser',
  ],
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
       backgroundColor: 'white',
       position: 'absolute',
       left: 1,
       bottom: 0,
       right: 1,
       // width: '98%',
       alignItems: 'center',
       // borderTopLeftRadius: 15,
       // borderRadius: 8,
       borderTopWidth: 0.5,
       borderTopColor:'#000',
       // borderTopColor: 'transparent',
       // borderRightColor: themeWhite,
       // borderLeftColor: themeWhite,
      // height: 47,
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
}, );

const WelcomeStack = createStackNavigator({
  Splash: Splash,
}, {
  initialRouteName: 'Splash',
  headerMode: 'none',
}, );

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
  Youtube: Youtube,
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
  VideoPlayer: VideoPlayer,
  TalentCom: TalentCom,
  LocationCom: LocationCom,
  ChooseTalentCom: ChooseTalentCom,
  LinkedIn:LinkedIn,
  UserLinkedin:UserLinkedin,
  JobChooseTalent:JobChooseTalent,
  JobFavoriteCompany:JobFavoriteCompany,
  JobFavoriteLocation:JobFavoriteLocation,
  JobTalentScreen:JobTalentScreen,
  OtpScreen:OtpScreen,
  Camera:Camera,
  CameraRecord:CameraRecord,
  Outlook:Outlook
}, {
  headerMode: 'none',
  animationEnabled: true,
  tabBarVisible: false,
  initialRouteName: 'MainScreen',
}, );

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