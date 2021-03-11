import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';
let userInfo = {}
import http from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import { scale, snack } from './Util';
import {
    Background,
    url
  } from '../Constant/index';
  let sent = false;
  let isLoggedin : 0;
const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.parse(JSON.stringify(window.location)));
})();`;

export default class UserLinkedin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false,
            source:'',
            name:'',id:'',email:''
        }
        this._onLoad = this._onLoad.bind(this);
    }
    componentDidMount() {
        // console.log('this.props',this.props.navigation.state.params.source)
        this.setState({
            loading: true,
            source:this.props.navigation.state.params.source
        });
    }


    _onLoad(state) {
        // https://www.spotjo.com/?code
        console.log('state',state);
        var n = state.url.startsWith('https://www.spotjo.com/?code');
        // console.log("nnnnnnnnnn",n)
        if (n) {
                // console.log(state.url.split('='))
                let m = state.url.split('=');
                let g = m[1].split('&');
                // console.log('g',g);
                // this.props.navigation.navigate('CompanyLogin',{
                //     code:g[0]
                // });
                let urlg = 'https://www.linkedin.com/oauth/v2/accessToken'
              let grant_type ='authorization_code'
              let redirect_uri='https://www.spotjo.com'
              let client_id = '78mifddvdhglgg'
              let client_secret='jr1l0ZHXFVWPgXig'

              let source = `${urlg}?grant_type=${grant_type}&code=${g[0]}&redirect_uri=${redirect_uri}&client_id=${client_id}&client_secret=${client_secret}`

              axios.post(source,{
                headers: {
                    'Content-Type': 'application/json' 
                  }
              }).then(function (res) {
                                //API response
                                console.log('resss',res.data.access_token);
                                axios.get('https://api.linkedin.com/v2/me',{
                                      headers : {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + res.data.access_token
                                      }
                                  }).then(function (response) {
                                                    //API response
                                                    console.log('tokengenerate',response.data);
                                                        userInfo = {
                                                            name:response.data.localizedFirstName + ' ' + response.data.localizedLastName,
                                                            id:response.data.id,
                                                        }
                                    axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',{
                                      headers : {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + res.data.access_token

                                      }
                                            }).then(function (responsive) {
                                                    //API response
                                                        userInfo = {
                                                            ...userInfo,
                                                            email:responsive.data.elements[0]['handle~'].emailAddress
                                                        }
                                                        http.POST('api/user/social/login', {
                                                            socialuserId: userInfo.id,
                                                                    // name: this.state.name,
                                                                    email: userInfo.email,
                                                                    latitude:global.let || 0,
                                                                    longitude:global.long || 0
                                                        }).then((res) => {
                                                            if (res['data']['status']) {
                                                                console.log('responce user', res['data']['result'])
                                                                global.Id = res['data']['result']['id'];
                                                                isLoggedin = res['data']['result']['isLoggedFirstTime'];
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
                                                                sent = true;
                                                    
                                                                // this.props.navigation.navigate('TabScreenJob')
                                                            } else {
                                                                snack(res['data']['message'])
                                                    
                                                            }
                                                        }, err => snack(err['message']))
                                                    
                                                })
                                                .catch(function (error) {
                                                    //API error
                                                    console.log('e',error);
                                                });
                                                   
                                                })
                                                .catch(function (error) {
                                                    //API error
                                                    console.log('e',error);
                                                });
                            })
                            .catch(function (error) {
                                //API error
                                console.log('e',error);
                            });
                    if (sent = true)
                    if (isLoggedin == 0) {
                        this.props.navigation.navigate('JobTalentScreen');
                      } else {
                        this.props.navigation.navigate('TabScreenJob');
                      }
                            

        }
        else{

        }
    }
    

    render() {
        const {source} = this.state;
        return (
            <View style={{
                flex: 1
            }}>
             <WebView
            style={{
                overflow: 'scroll'
            }}
            source={{
                uri: source
            }}
            onNavigationStateChange={this._onLoad}
            useWebKit={Platform.OS == 'ios'}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onMessage={this.onMessage}
            />
         </View>
        );

    }
}