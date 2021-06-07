/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, Platform, View, Text, Alert,StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale,snack } from '../src/Util';
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { Background,url,themeWhite} from '../Constant/index';
import GoogleSignIn from 'react-native-google-sign-in';
import http from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import PermissionHelper from '../Component/PermissionHelper'
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
  } from 'react-native-fbsdk';
  import Texting from '../Constant/Text'
import BackNext from '../Component/BackNext';
import * as Animatable from 'react-native-animatable';


class Login extends Component {
    constructor(props) {
        super(props);

    this.state = {
      name:'',
      id:'',
      email:'',
      opacity:0
    };
    this.text = React.createRef()
    this.texts = React.createRef()
    this.textf = React.createRef()
    this.textl = React.createRef()

    }


    UNSAFE_componentWillMount () {

      global.Job_Title = [];
      global.JobID= null
      global.region = {};
      global.Company = [];
      global.Branch = '';
      global.Anywhere = false;
      global.FullTime = false;
      global.PartTime = false;
      global.Employed = false;
      global.Internship = false;
      global.StudentJobs = false;
      global.HelpingVacancies = false;
      global.Freelancer = false;
      global.Start_date = '';
      global.End_date = '';
      global.City = [];
      global.Language = '';
      global.Task_Description = '';
      global.Task_Description_Req = '';
      global.addSkill = [];
      global.Education = [];
      global.LanguageSkill = [];
      global.minSalary = 0;
      global.maxSalary = 0;
      global.salaryrating = 1;
      global.Email = '';
      global.Mobile = '';
      global.Address = '';
      global.CompanyImage = '';
      global.uploadUri = '';
      global.Video = '';
      global.type = '';
      global.Id = '';
      global.WebSite = '';
      global.Experience = [];
      global.firstName = '';
      global.lastName = '';
      global.Place = '';
      global.UserEmail = '';
      global.UserMobile = '';
      global.UserProfile = '';
      global.UserSkill = '';
      global.UserEducation = [];
      global.UserLanguage = '';
      global.Qualification = '';
      global.CompanyExp = '';
      global.ig = [];
      global.let = 51.1657;
      global.long = 10.4515;
      global.all = [];
      global.minYear;
      global.maxYear;
      global.Service;
      global.role;
      global.item;
      global.Job_Location = [];
      global.msgUnreadTotal = 0;
      global.language = 'english';
      global.Role = []
      global.CompanyGuest = []
      global.objective = {}
      global.Favorite_Location = []
      global.reset = false;
    }


    // logoutWithFacebook = () => {
    //     LoginManager.logOut();
    //     this.setState({userInfo: {}});
    //   };

    UNSAFE_componentWillReceiveProps(nextProps){
      // console.log('nextProps',nextProps)
          if(nextProps.navigation.state.params)
          {
              console.log('hmmmm',nextProps.navigation.state.params.code)
              let code = nextProps.navigation.state.params;
              
                        }
    }

    create = () => {
        // this.props.navigation.navigate('NoAccount')
        this.props.navigation.navigate('Signup',{
          source:`https://spotjo-test.envspotjo.com/#/authentication/signup`
        })
    }
    Opportunities = () => {
        // this.props.navigation.navigate('CompanyLogin')
    }
    Login = () => {
        this.props.navigation.navigate('LoginWithEmail')
        
        // var i = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?
        // client_id=78055508-f184-40cd-bc71-56a8d908ce16&response_type=code&
        // redirect_uri=https://login.microsoftonline.com/common/oauth2/nativeclient
        // &response_mode=query&scope=user.read%20mail.read%20Calendars.ReadWrite&prompt=select_account&state=12345`
        // this.props.navigation.navigate('Outlook',{
        //   source:i
        // })

        


    }

    LinkDInLogin = () => {
      var i = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78mifddvdhglgg&redirect_uri=https://www.spotjo.com&state=fooobar&scope=r_liteprofile%20r_emailaddress`
            this.props.navigation.navigate('LinkedIn',{
              source:i
            })
    }

    FbLog = () => {
        // Attempt a login using the Facebook login dialog asking for default permissions.
        LoginManager.logInWithPermissions(['public_profile','email']).then(
            login => {
              if (login.isCancelled) {
                console.log('Login cancelled');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  const accessToken = data.accessToken.toString();
                  this.getInfoFromToken(accessToken);
                });
              }
            },
            error => {
              console.log('Login fail with error: ' + error);
            },
          );
    }

    getInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: 'id,name,first_name,last_name,email',
          },  
        };
        const profileRequest = new GraphRequest(
          '/me',
          {token, parameters: PROFILE_REQUEST_PARAMS},
          (error, user) => {
            if (error) {
              console.log('login info has error: ' + error);
            } else {
            //   this.setState({userInfo: user});
              console.log('result:', user);
              this.setState({
                name:user.name,
                id:user.id,
                email:user.email
              },()=> this.callApiLogin())
            }
          },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
      };
      permission = async () => {
        const granted = await PermissionHelper.Storage.isLocationPermissionGranted();
        if (granted)
           {  Geolocation.getCurrentPosition((info) => {
                  console.log('inf', info);
                  global.let = info.coords.latitude;
                  global.long = info.coords.longitude;
                });
          }
        else
        {const granted = await PermissionHelper.Storage.requestLocationPermission();
            !granted && this.permission();  }
      }

      callApiLogin = () => {
      // this.permission();
        try {
        http.POST('api/company/social/login', {
          socialuserId: this.state.id,
          name: this.state.name,
          email: this.state.email,
          latitude:global.let || 1,
          longitude:global.long || 1
      }).then((res) => {
        console.log('res',res)
          if (res['data']['status']) {
            AsyncStorage.setItem(
              'token',
              JSON.stringify(res['data']['token']),
            );
              console.log('response', res['data']['result']); 
              if (res['data']['result']['role'] == '2' || res['data']['result']['role'] == '3') {
                console.log('login id ', res['data']['result']);
                global.role = res['data']['result']['role'] == '2' ? 'Super Admin' : res['data']['result']['role'] == '3' ? 'Web Reg Company' : ''
                global.Service = res['data']['result']['services'];
                global.Id = res['data']['result']['id'];
                global.Email = res['data']['result']['email'];
                global.Branch = res['data']['result']['branch'];
                global.uploadUri =res['data']['result']['logo'] != null ? url + 'images/company/' + res['data']['result']['logo'] : null;
                global.Mobile = res['data']['result']['mobile'];
                global.Company = res['data']['result']['name'];
                global.Video = res['data']['result']['video'] != null ? url + 'images/company/' + res['data']['result']['video'] : null;
                global.WebSite = res['data']['result']['website'];
                global.Address = res['data']['result']['address'];
                global.let = parseFloat(res['data']['result']['latitude']);
                global.long = parseFloat(res['data']['result']['longitude']);
                console.log('glo', global.let, global.long);
                global.all = []
                AsyncStorage.setItem(
                  'CompanyLoggedInData',
                  JSON.stringify(res['data']['result']),
                );
                if (res['data']['result']['isLoggedFirstTime'] == 0) {
                  this.props.navigation.navigate('TalentCom');
                } else {
                  this.props.navigation.navigate('UserProfile');
                }
              }
          } else {
              console.log('else',res['data']['message'])
          }
                    }), err => console.log('hi',err['message'])
                  }
                  catch (e) {
                    console.log('e',e);
                  }
      }

    Configure = async() => {
      // await GoogleSignin.hasPlayServices();
      try {
        await GoogleSignIn.configure({
              // webClientId: '1092597693304-mj60518d625rfgk4m1oufp9dca6g1r1a.apps.googleusercontent.com',
              webClientId:'644805459038-pmhlh0p7uh872r1bhcc6ft4j1f5evmjl.apps.googleusercontent.com',
              scopes: ['email'],
              shouldFetchBasicProfile: true,
              offlineAccess: true
          });
      } catch (error) {
        console.log('errrr',error)
      }
    }

    GoogleSignIn = async() => {
            this.Configure();

        const user = await GoogleSignIn.signInPromise();
            console.log('user',user);
            this.setState({
                    name:user.name,
                    email:user.email,
                    id:user.userID
            },()=> this.callApiLogin())
    }

    next = () => {
      this.texts.current.zoomIn(800)
      this.text.current.zoomIn(1000)
      this.textf.current.zoomIn(1200)
      this.textl.current.zoomIn(1400)

    }


    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={    styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
        <StatusBar hidden ={true}/>
         <View style={[{
                top: hp(5)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: hp(20),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View>
           <Texting style={styles.LookingFor} text='Login' />
           <Texting style={[styles.LookingFor, {
                fontSize: hp(3.2)
            }]} text='Login_to_your_spotjo_account'/>
            </View>
            <View style={{
                left: wp('10%'),
                marginTop: hp(6)
            }}>
        
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Login}><Animatable.View ref={this.texts} style={[styles.CompanyLoginalentView, {
                borderRadius: scale(5),
                justifyContent: "center",
            }]}><View style={{
                marginLeft: scale(-95),
            // marginRight: scale(10)
            }}>
            <Texting style={styles.CompanyOppoTalentText} text="Your_Email"/></View></Animatable.View></TouchableWithoutFeedback>
       
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.GoogleSignIn}><Animatable.View  ref={this.text} style={styles.CompanyLoginalentView}><View style={styles.CompanyLoginIcon}>{leftVid('google', hp(2.7), 'red')}</View><Texting style={styles.CompanyOppoTalentText} text='Gmail'/></Animatable.View></TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.FbLog}><Animatable.View ref={this.textf}   style={styles.CompanyLoginalentView}><View style={styles.CompanyLoginIcon}>{leftVid('facebook-square', hp(2.7), 'rgb(58, 85, 159)')}</View><Texting style={styles.CompanyOppoTalentText} text='FaceBook'/></Animatable.View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.LinkDInLogin}><Animatable.View ref={this.textl} style={styles.CompanyLoginalentView}><View style={styles.CompanyLoginIcon}>{leftVid('linkedin-square', hp(2.7), 'rgb(0, 119, 183)')}</View><Texting style={styles.CompanyOppoTalentText} text='Linkedin'/></Animatable.View></TouchableWithoutFeedback>
        </View>
        <View style={styles.CompanyLoginAccountText}><Texting style={[{
                fontSize: hp(3.5),
            }, styles.FontSty]} text='Dont_Have_Account'/>
            <View style={{
                flexDirection: "row"
            }}>
            <Texting  style={[{
                fontSize: hp(3),
            }, styles.FontSty]} text='Create_new_account' /><TouchableWithoutFeedback onPress={this.create}><Texting style={[{
                textDecorationLine: "underline",
                // textDecorationColor: "#fff",
                fontSize: hp(3),
            }, styles.FontSty]} text='Click_here' /></TouchableWithoutFeedback></View></View>
                        <BackNext onBack={()=> this.props.navigation.goBack()} onNext={this.next} show={true}/>
       </ImageBackground></SafeAreaView>

        );
    }
}
;
export default withNavigationFocus(Login);