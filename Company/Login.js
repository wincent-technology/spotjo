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
import { Background,url } from '../Constant/index';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
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

class Login extends Component {
    constructor(props) {
        super(props);

    this.state = {
      name:'',
      id:'',
      email:''
    };
    }


    // logoutWithFacebook = () => {
    //     LoginManager.logOut();
    //     this.setState({userInfo: {}});
    //   };

    UNSAFE_componentWillReceiveProps(nextProps){
      console.log('nextProps',nextProps)
          if(nextProps.navigation.state.params)
          {
              console.log('hmmmm',nextProps.navigation.state.params.code)
              let code = nextProps.navigation.state.params;
              
                        }
    }

    create = () => {
        this.props.navigation.navigate('NoAccount')
    }
    Opportunities = () => {
        // this.props.navigation.navigate('CompanyLogin')
    }
    Login = () => {
        this.props.navigation.navigate('LoginWithEmail')
        // var i = `https://login.microsoftonline.com/75f3941f-f5ae-4416-adba-55cd4b4e1cbb/oauth2/v2.0/authorize?client_id=3151a984-44e1-423d-96ce-38aada715e67&response_type=code&redirect_uri=msauth://com.spotjo/Xo8WBi6jzSxKDVR4drqm84yr9iU%3D&response_mode=query&scope=user.read%20mail.read%20Calendars.ReadWrite&prompt=select_account&state=12345`
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
      this.permission();

        http.POST('api/company/social/login', {
          socialuserId: this.state.id,
          name: this.state.name,
          email: this.state.email,
          latitude:global.let || 0,
          longitude:global.long || 0
      }).then((res) => {
          if (res['data']['status']) {
              // console.log('response', res['data']['result']);
              if (res['data']['result']['role'] == '2' || res['data']['result']['role'] == '3') {
                console.log('login id ', res['data']['result']);
                global.role = res['data']['result']['role'] ? 'Super Admin' : ''
                global.Service = res['data']['result']['services'];
                global.Id = res['data']['result']['id'];
                global.Email = res['data']['result']['email'];
                global.Branch = res['data']['result']['branch'];
                global.uploadUri =
                  url + 'images/company/' + res['data']['result']['logo'];
                global.Mobile = res['data']['result']['mobile'];
                global.Company = res['data']['result']['name'];
                global.Video =
                  url + 'images/company/' + res['data']['result']['video'];
                global.WebSite = res['data']['result']['website'];
                global.Address = res['data']['result']['address'];
                global.Service = res['data']['result']['services'];
                global.let = parseFloat(res['data']['result']['latitude']);
                global.long = parseFloat(res['data']['result']['longitude']);
                console.log('glo', global.let, global.long);
                AsyncStorage.setItem(
                  'CompanyLoggedInData',
                  JSON.stringify(res['data']['result']),
                );
                if (res['data']['result']['isLoggedFirstTime'] == 0) {
                  this.props.navigation.navigate('TalentCom');
                } else {
                  this.props.navigation.navigate('ComEdit');
                }
              }
          } else {
              snack(res['data']['message'])
          }
                    }), err => snack(err['message'])
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

    render() {
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={    styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
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
           <Text style={[styles.LookingFor, {
                fontSize: scale(17)
            }]}>Login to your spotjo account</Text>
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
       
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.GoogleSignIn}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('google', 20, 'red')}</View><Text style={styles.CompanyOppoTalentText}>Gmail</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.FbLog}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('facebook-square', 20, 'rgb(58, 85, 159)')}</View><Text style={styles.CompanyOppoTalentText}>FaceBook</Text></View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.LinkDInLogin}><View  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('linkedin-square', 20, 'rgb(0, 119, 183)')}</View><Text style={styles.CompanyOppoTalentText}>Linkedin</Text></View></TouchableWithoutFeedback>
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