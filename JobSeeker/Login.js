/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, Text, StatusBar, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style';
import { scale,snack } from '../src/Util';
import { leftVid } from '../src/IconManager';
import { widthPercentageToDP as wp } from '../Component/responsive-ratio';
import { Background,url } from '../Constant/index'
import http from '../api';
import GoogleSignIn from 'react-native-google-sign-in';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import PermissionHelper from '../Component/PermissionHelper'

import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
  } from 'react-native-fbsdk';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            id:'',
            email:''
          };
    // this.state = {};
    }

    create = () => {
        this.props.navigation.navigate('JobNoAccount')
    }
    Opportunities = () => {
        // this.props.navigation.navigate('CompanyLogin')
    }
    Login = () => {
        this.props.navigation.navigate('JobLoginWithEmail')
    }

    LinkDInLogin = () => {
        var i = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78mifddvdhglgg&redirect_uri=https://www.spotjo.com&state=fooobar&scope=r_liteprofile%20r_emailaddress`
              this.props.navigation.navigate('UserLinkedin',{
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




    Configure = async() => {
        await GoogleSignIn.configure({

            webClientId: '1092597693304-mj60518d625rfgk4m1oufp9dca6g1r1a.apps.googleusercontent.com',
            scopes: ['email'],
            shouldFetchBasicProfile: true,
            offlineAccess: true
        });
    }
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
    
      this.permission();
      http.POST('api/user/social/login', {
        socialuserId: this.state.id,
                // name: this.state.name,
                email: this.state.email,
                latitude:global.let || 0,
                longitude:global.long || 0
    }).then((res) => {
        if (res['data']['status']) {
            console.log('responce user', res['data']['result'])
            global.Id = res['data']['result']['id'];
            // will get data in this    res['data']['result'] 
            global.firstName = res['data']['result']['first_name']
            global.lastName = res['data']['result']['last_name']
            global.UserEmail = res['data']['result']['email']
            global.Place = res['data']['result']['place']
            global.UserMobile = res['data']['result']['mobile']
            global.UserProfile = url + 'images/user/' + res['data']['result']['profile']
            global.Video = url + 'images/user/' + res['data']['result']['video']
            global.UserSkill = res['data']['result']['skills']
            global.UserLanguage = res['data']['result']['language']
            global.Qualification = res['data']['result']['qualification']
            global.UserEducation = res['data']['result']['education']
            global.salaryrating = res['data']['result']['salRatting']
            global.minSalary = res['data']['result']['minSal']
            global.maxSalary = res['data']['result']['maxSal']
            global.Experience = res['data']['result']['workexp']
            global.let = parseFloat(res['data']['result']['latitude'])
            global.long = parseFloat(res['data']['result']['longitude'])
            AsyncStorage.setItem('UserLoggedInData', JSON.stringify(res['data']['result']));
            if (res['data']['result']['isLoggedFirstTime'] == 0) {
              this.props.navigation.navigate('JobTalentScreen');
            } else {
              this.callJob();

              this.props.navigation.navigate('TabScreenJob');
            }
        } else {
            snack(res['data']['message'])

        }
    }).catch(err => snack(err['message']))
    }

    


    callJob = () => {
      try {
        http.POST('api/appjob/get', {
          location: global.Place
        }).then(
          (res) => {
            console.log('resssssssssssssssssssssssssssssssssssssssssssssssss',res)
            if (res['data']['status']) {
              global.all = res['data']['result'];
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(JSON.stringify(err['message'])),
        );
      } catch (error) {
        alert(error);
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

    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
         <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View>
           <Text style={styles.LookingFor}>Login</Text>
            </View>
            <View style={{
                left: wp('10%'),
                marginTop: scale(45)
            }}>
        
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Login}><View  style={[styles.CompanyLoginalentView, {
                borderRadius: scale(5),
                justifyContent: "center",
            }]}><View style={{
                marginLeft: scale(-95),
            // marginRight: scale(10)
            }}><Text style={styles.CompanyOppoTalentText}>Your Email</Text></View></View></TouchableWithoutFeedback>
       
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.GoogleSignIn}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('google', scale(20), 'red')}</View><Text style={styles.CompanyOppoTalentText}>Gmail</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.FbLog}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('facebook-square', scale(20), 'rgb(58, 85, 159)')}</View><Text style={styles.CompanyOppoTalentText}>FaceBook</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.LinkDInLogin}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('linkedin-square', scale(20), 'rgb(0, 119, 183)')}</View><Text style={styles.CompanyOppoTalentText}>Linkedin</Text></View></TouchableWithoutFeedback>
        </View>
        <View style={styles.CompanyLoginAccountText}><Text style={[{
                fontSize: scale(23),
            }, styles.FontSty]}>Don't Have Account?</Text>
                <View style={{
                flexDirection: "row"
            }}>
            <Text  style={[{
                fontSize: scale(19),
            }, styles.FontSty]}>Create new account </Text><TouchableWithoutFeedback onPress={this.create}><Text style={[{
                textDecorationLine: "underline",
                // textDecorationColor: "#fff",
                fontSize: scale(19),
            }, styles.FontSty]}>Click here</Text></TouchableWithoutFeedback></View></View>
       </ImageBackground></SafeAreaView>

        );
    }
}
;
export default withNavigationFocus(Login);