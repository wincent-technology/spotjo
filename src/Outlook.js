import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';
let userInfo = {}
import http from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import { scale, snack } from './Util';
let sent = false;
// let isLoggedin : 0;
const INJECTED_JAVASCRIPT = `(function() {
    window.ReactNativeWebView.postMessage(JSON.parse(JSON.stringify(window.location)));
})();`;

export default class LinkedIn extends Component {
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
    
        console.log('state',state);
        var n = state.url.startsWith('msauth://com.spotjo/Xo8WBi6jzSxKDVR4drqm84yr9iU=?code');
        
        console.log("nnnnnnnnnn",n)
        if (n) {
                console.log(state.url.split('='))
                let m = state.url.split('=');
                let g = m[2].split('&');
                console.log('g???',g);
                // this.props.navigation.navigate('CompanyLogin',{
                //     code:g[0]
                // });
                let url = 'https://login.microsoftonline.com/75f3941f-f5ae-4416-adba-55cd4b4e1cbb/oauth2/v2.0/token?scope=user.read%20mail.read%20Calendars.ReadWrite'
            //   let grant_type ='authorization_code'
            //   let redirect_uri='msauth://com.spotjo/Xo8WBi6jzSxKDVR4drqm84yr9iU='
            //   let client_id = '3151a984-44e1-423d-96ce-38aada715e67'
            // //   let client_secret='0801bc08-0781-45f9-a62d-a96dbd673a7e'
            //   let scope = 'user.read%20mail.read'

              let source = url
              const params = new URLSearchParams()
              params.append('grant_type', 'authorization_code')
              params.append('redirect_uri', 'msauth://com.spotjo/Xo8WBi6jzSxKDVR4drqm84yr9iU=')
              params.append('client_id', '3151a984-44e1-423d-96ce-38aada715e67')
              params.append('code', g[0])
              const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }
              axios.post(source,params,config).then(function (res) {
                            // console.log('res>>>>>',res);
                                // //API response
                                console.log('Access Token',res.data.access_token);
                                axios.get('https://graph.microsoft.com/v1.0/me',{
                                      headers : {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer ' + res.data.access_token
                                      }
                                  }).then(function (response) {
                                      console.log("response>>>>>>>>>>>>>>>>",response.data,res.data.access_token)
                                      axios.get('https://graph.microsoft.com/v1.0/75f3941f-f5ae-4416-adba-55cd4b4e1cbb/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location',{
                                        headers : {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Bearer ' + res.data.access_token,
                                            Prefer: 'outlook.timezone = "Pacific Standard Time"'
                                        }
                                    }).then(function (response) {
                                        console.log("response>>>>>>>>>>>>>>>>",response.data)
                                        
                                    }).catch(e => console.log('e>>>>>>',JSON.stringify(e)))
                                  }).catch(e => console.log('e>>>>>>',e))
                                //                     //API response
                                //                     console.log('tokengenerate',response.data);
                                //                         userInfo = {
                                //                             name:response.data.localizedFirstName + ' ' + response.data.localizedLastName,
                                //                             id:response.data.id,
                                //                         }
                                //     axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',{
                                //       headers : {
                                //           'Content-Type': 'application/json',
                                //           'Authorization': 'Bearer ' + res.data.access_token

                                //       }
                                //             }).then(function (responsive) {
                                //                     //API response
                                //                         userInfo = {
                                //                             ...userInfo,
                                //                             email:responsive.data.elements[0]['handle~'].emailAddress
                                //                         }
                                                    
                                //                     http.POST('api/company/social/login', {
                                //                         socialuserId: userInfo.id,
                                //                         name: userInfo.name,
                                //                         email: userInfo.email,
                                //                         latitude:global.let || 0,
                                //                         longitude:global.long || 0
                                //                     }).then((res) => {
                                //                         if (res['data']['status']) {
                                //                             isLoggedin = res['data']['result']['isLoggedFirstTime'];
                                //                             console.log('response', res['data']['result'], res['data']['result']);
                                //                             global.Id = res['data']['result']['id']
                                //                             global.Email = res['data']['result']['email']
                                //                             global.role = res['data']['result']['role'] == '2' || res['data']['result']['role'] == '3' ? 'Super Admin' : 'Staff'
                                //                             AsyncStorage.setItem('CompanyLoggedInData', JSON.stringify(res['data']['result']));
                                //                             sent = true;
                                //                         // console.log('this.props',this.props);
                                //                         } else {
                                //                             snack(res['data']['message'])
                                //                         }
                                //                 }), err => snack(err['message'])
                                                    
                                //                 })
                                //                 .catch(function (error) {
                                //                     //API error
                                //                     console.log('e',error);
                                //                 });
                                                   
                                //                 })
                                //                 .catch(function (error) {
                                //                     //API error
                                //                     console.log('e',error);
                                //                 });
                            })
                            .catch(function (error) {
                                //API error
                                console.log('e>>>>>>>>>>>>',JSON.stringify(error));
                            });
                    // if (sent = true)
                    // if (isLoggedin == 0) {
                    //     this.props.navigation.navigate('TalentCom');
                    //   } else {
                    //     this.props.navigation.navigate('ComEdit');
                    //   }
                            

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