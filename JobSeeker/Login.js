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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { Background,url } from '../Constant/index'
import http from '../api';
import GoogleSignIn from 'react-native-google-sign-in';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import PermissionHelper from '../Component/PermissionHelper'
import Texting from '../Constant/Text'
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
  } from 'react-native-fbsdk';
  import BackNext from '../Component/BackNext';
import * as Animatable from 'react-native-animatable';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            id:'',
            email:''
          };
          this.text = React.createRef()
          this.texts = React.createRef()
          this.textf = React.createRef()
          this.textl = React.createRef()


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
    
      // this.permission();
      http.POST('api/user/social/login', {
        socialuserId: this.state.id,
                // name: this.state.name,
                email: this.state.email,
                latitude:global.let || 0,
                longitude:global.long || 0
    }).then((res) => {
        if (res['data']['status']) {
          AsyncStorage.setItem(
            'token',
            JSON.stringify(res['data']['token']),
          );
            global.Id = res['data']['result']['id'];
            // will get data in this    res['data']['result'] 
            global.firstName = res['data']['result']['first_name']
            global.lastName = res['data']['result']['last_name']
            global.UserEmail = res['data']['result']['email']
            global.Place = res['data']['result']['place']
            global.UserMobile = res['data']['result']['mobile']
            global.UserProfile = res['data']['result']['profile'] != null ? url + 'images/user/' + res['data']['result']['profile'] : null;
            global.Video = url + 'images/user/' + res['data']['result']['video']
            global.UserSkill = res['data']['result']['skills']
            global.UserLanguage = res['data']['result']['language']
            global.Qualification = res['data']['result']['qualification']
            global.UserEducation = res['data']['result']['education']
            global.salaryrating = res['data']['result']['salRatting']
            global.minSalary = res['data']['result']['minSal']
            global.maxSalary = res['data']['result']['maxSal']
            global.Experience = res['data']['result']['workexp']
            global.let = parseFloat(res['data']['result']['latitude'] ) || 0
            global.long = parseFloat(res['data']['result']['longitude']) || 0


            let img1 = res['data']['result']['workexp']
            console.log('img',img1)


            // console.log('responce user', res['data']['result'])
          //   let From,
          //   To,
          //   tot,
          //   m = 0;
          // let ary = [];
            // console.log('length',res['data']['result']['skills'].length)
            

            // for (let j=0; j<img1.length;j++)
            // {
            //   console.log('done',img1[j])
            // }

            // res['data']['result']['workexp'].filter((i,index)=>
            //   console.log('klkjlj',index,i)
            // )

            // for (let w of res['data']['result']['workexp']) {
            //   // if (JSON.stringify(im[i]) != undefined)
            //   // {From = im[i].From.split(' ');
            //   // To = im[i].To.split(' ');
            //   // ary.push(parseInt(To[1]));
            //   // tot = To[1] - From[1];
            //   // m = m + tot;}
            // }
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
            // console.log('resssssssssssssssssssssssssssssssssssssssssssssssss',res)
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

    next = () => {
      // this.text.current.zoomIn(800).then(endState => endState));
      this.texts.current.zoomIn(800)
      this.text.current.zoomIn(1000)
      this.textf.current.zoomIn(1200)
      this.textl.current.zoomIn(1400)


      // this.text.current.animate({ 0: { opacity: 0 }, 1: { opacity: 1 } })
      // this.texts.current.animate({ 0: { opacity: 0 }, 1: { opacity: 1 } })

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
                top: hp(5)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height:  hp(20),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View>
           <Texting style={styles.LookingFor} text='Login' />
            </View>
            <View style={{
                left: wp('10%'),
                marginTop: hp(6)
            }}>
        
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.Login}><Animatable.View  ref={this.texts}  style={[styles.CompanyLoginalentView, {
                borderRadius: scale(5),
                justifyContent: "center",
            }]}><View style={{
                marginLeft: scale(-95),
            // marginRight: scale(10)
            }}>
            <Texting style={styles.CompanyOppoTalentText} text="Your_Email"/>
            </View></Animatable.View></TouchableWithoutFeedback>
       
            <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.GoogleSignIn}><Animatable.View ref={this.text} style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('google', 20, 'red')}</View><Texting style={styles.CompanyOppoTalentText} text='Gmail'/></Animatable.View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.FbLog}><Animatable.View ref={this.textf}  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('facebook-square', 20, 'rgb(58, 85, 159)')}</View><Texting style={styles.CompanyOppoTalentText} text='FaceBook'/></Animatable.View></TouchableWithoutFeedback>
        <TouchableWithoutFeedback style={styles.CompanyLoginOpportunityView} onPress={this.LinkDInLogin}><Animatable.View ref={this.textl}  style={[styles.CompanyLoginalentView, styles.CompanyLoginButton]}><View style={styles.CompanyLoginIcon}>{leftVid('linkedin-square', 20, 'rgb(0, 119, 183)')}</View><Texting style={styles.CompanyOppoTalentText} text='Linkedin'/></Animatable.View></TouchableWithoutFeedback>
        </View>
        <View style={styles.CompanyLoginAccountText}>
        <Texting style={[{
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
export default withNavigationFocus(Login);